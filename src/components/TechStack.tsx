import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";


const imageUrls = [
  // Core
  "/images/tech/python.svg",
  "/images/tech/numpy.svg",
  "/images/tech/pandas.svg",
  "/images/tech/scikitlearn.svg",
  "/images/tech/xgboost.png",
  // Deep Learning
  "/images/tech/tensorflow.svg",
  "/images/tech/keras.svg",
  "/images/tech/opencv.svg",
  "/images/tech/mediapipe.png",
  "/images/tech/nltk.png",
  // Gen AI
  "/images/tech/huggingface.svg",
  "/images/tech/langchain.png",
  "/images/tech/chromadb.png",
  // Cloud/Tools
  "/images/tech/azure.svg",
  "/images/tech/postgresql.svg",
  "/images/tech/powerbi.svg",
  "/images/tech/streamlit.svg",
  // Text only
  "text:RAG",
  "text:LLM"
];

const createPaddedWhiteTexture = (url: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (url.startsWith("text:")) {
    const textName = url.split(":")[1];
    if (ctx) {
      // Dark background
      ctx.fillStyle = "#110b1a";
      ctx.fillRect(0, 0, 512, 512);

      // Glowing text
      ctx.font = "bold 130px Arial";
      ctx.fillStyle = "#d8b4fe";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 40;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(textName, 256, 256);
      
      texture.needsUpdate = true;
    }
    return texture;
  }

  if (ctx) {
    // Fill white background for images
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 512, 512);
  }

  const img = new Image();
  img.src = url;
  img.onload = () => {
    if (ctx) {
      // Clear and redraw white background just in case
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      
      // Draw image centered but shifted up slightly
      const size = 220;
      const xOffset = (512 - size) / 2;
      const yOffset = (512 - size) / 2 - 30;
      ctx.drawImage(img, xOffset, yOffset, size, size);

      // Format the name
      const filename = url.split('/').pop()?.split('.')[0] || "";
      let displayName = filename.charAt(0).toUpperCase() + filename.slice(1);
      
      // Custom formatting for specific tech names
      const nameOverrides: Record<string, string> = {
        'scikitlearn': 'Scikit-Learn',
        'powerbi': 'Power BI',
        'opencv': 'OpenCV',
        'postgresql': 'PostgreSQL',
        'xgboost': 'XGBoost',
        'tensorflow': 'TensorFlow',
        'streamlit': 'Streamlit',
        'huggingface': 'HuggingFace',
        'langchain': 'LangChain',
        'chromadb': 'ChromaDB',
        'mediapipe': 'MediaPipe',
        'nltk': 'NLTK',
        'numpy': 'NumPy',
        'pandas': 'Pandas',
        'azure': 'Azure',
        'python': 'Python',
        'keras': 'Keras'
      };
      if (nameOverrides[filename]) displayName = nameOverrides[filename];

      // Draw text
      ctx.font = "bold 44px Arial";
      ctx.fillStyle = "#222222";
      ctx.textAlign = "center";
      ctx.fillText(displayName, 256, yOffset + size + 60);

      texture.needsUpdate = true;
    }
  };
  return texture;
};

const textures = imageUrls.map((url) => createPaddedWhiteTexture(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const techSection = document.querySelector(".techstack");
      if (techSection) {
        const rect = techSection.getBoundingClientRect();
        setIsActive(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
