import * as THREE from "three";

/**
 * Customizes the avatar appearance to match Madhav's look:
 * - Medium-brown skin tone on face/hands
 * - Black t-shirt on body
 * - Black hair
 * - Silver rectangular glasses
 */
export function customizeAvatar(character: THREE.Object3D) {
  const skinColor = new THREE.Color(0xc49a6c);    // Medium-warm brown skin tone
  const hairColor = new THREE.Color(0x0a0a0a);    // Dark black hair
  const shirtColor = new THREE.Color(0x5a5a5a);   // Darker grey clothing
  const pantsColor = new THREE.Color(0x5a5a5a);   // Darker grey clothing
  const shoeColor = new THREE.Color(0xe8e0d8);    // White/off-white sneakers

  // Traverse and customize each mesh
  character.traverse((child: any) => {
    if (!child.isMesh) return;

    // Clone material first — critical step so shared materials don't conflict!
    if (Array.isArray(child.material)) {
      child.material = child.material.map((m: THREE.Material) => m.clone());
    } else {
      child.material = child.material.clone();
    }

    const name = (child.name || "").toLowerCase();
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((mat: THREE.MeshStandardMaterial) => {
      if (!mat.color) return;
      const matName = (mat.name || "").toLowerCase();
      const combined = name + " " + matName;

      // Log for debugging
      console.log(`[Avatar] Mesh: "${child.name}" | Mat: "${mat.name}" | Color: #${mat.color.getHexString()}`);

      // Hair — always black
      if (combined.includes("hair") || combined.includes("scalp") || combined.includes("brow")) {
        mat.color.copy(hairColor);
        return;
      }

      // Eyes — don't change
      if (combined.includes("lash") || combined.includes("eye") || combined.includes("pupil") || combined.includes("iris")) {
        return;
      }

      // Shirt/body/torso/clothing — black t-shirt
      if (combined.includes("bodyshirt") || combined.includes("shirt") || combined.includes("torso") || combined.includes("cloth") ||
          combined.includes("top") || combined.includes("jacket") || combined.includes("hoodie") ||
          combined.includes("tshirt") || combined.includes("sleeve")) {
        mat.color.copy(shirtColor);
        return;
      }

      // Pants/legs
      if (combined.includes("pant") || combined.includes("leg") || combined.includes("jean") || combined.includes("trouser")) {
        mat.color.copy(pantsColor);
        return;
      }

      // Shoes — white/off-white sneakers
      if (combined.includes("shoe") || combined.includes("sneaker") || combined.includes("boot") || combined.includes("foot")) {
        mat.color.copy(shoeColor);
        return;
      }

      // EVERYTHING ELSE gets skin color (face, hands, ears, body, neck, etc.)
      mat.color.copy(skinColor);
    });
  });
}

export function addGlasses(character: THREE.Object3D) {
  const existing = character.getObjectByName("glasses");
  if (existing) existing.parent?.remove(existing);

  const glassesGroup = new THREE.Group();
  glassesGroup.name = "glasses";

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.6,
    roughness: 0.3,
  });

  // Left lens
  const leftLens = new THREE.Mesh(
    new THREE.TorusGeometry(0.05, 0.007, 8, 24),
    frameMat
  );
  leftLens.position.set(-0.06, 0, 0);

  // Right lens
  const rightLens = new THREE.Mesh(
    new THREE.TorusGeometry(0.05, 0.007, 8, 24),
    frameMat
  );
  rightLens.position.set(0.06, 0, 0);

  // Bridge
  const bridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.04, 8),
    frameMat
  );
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0, 0);

  // Left arm going back toward ear
  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.003, 0.003, 0.1, 8),
    frameMat
  );
  leftArm.rotation.x = Math.PI / 2;
  leftArm.position.set(-0.11, 0, -0.05);

  // Right arm
  const rightArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.003, 0.003, 0.1, 8),
    frameMat
  );
  rightArm.rotation.x = Math.PI / 2;
  rightArm.position.set(0.11, 0, -0.05);

  glassesGroup.add(leftLens, rightLens, bridge, leftArm, rightArm);

  // ✅ HARDCODED from your exact eye world position
  // Eyes: y=1.650, z=0.120 → push glasses slightly forward
  glassesGroup.position.set(0, 1.650, 0.19);

  character.add(glassesGroup);
  console.log("[Glasses] ✅ Placed at hardcoded eye position");
}

export function addHeadset(character: THREE.Object3D) {
  const existing = character.getObjectByName("headset");
  if (existing) existing.parent?.remove(existing);

  const headsetGroup = new THREE.Group();
  headsetGroup.name = "headset";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.4,
    roughness: 0.6,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x6c3fc5,
    metalness: 0.5,
    roughness: 0.4,
  });

  // Band sitting around back of neck
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(0.11, 0.012, 8, 30, Math.PI),
    bodyMat
  );
  band.rotation.x = Math.PI / 2;
  band.rotation.z = Math.PI;
  headsetGroup.add(band);

  // Left ear cup
  const leftCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.022, 16),
    bodyMat
  );
  leftCup.rotation.z = Math.PI / 2;
  leftCup.position.set(-0.11, 0, 0);

  const leftAccent = new THREE.Mesh(
    new THREE.TorusGeometry(0.028, 0.005, 8, 16),
    accentMat
  );
  leftAccent.rotation.y = Math.PI / 2;
  leftAccent.position.set(-0.123, 0, 0);
  headsetGroup.add(leftCup, leftAccent);

  // Right ear cup
  const rightCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.022, 16),
    bodyMat
  );
  rightCup.rotation.z = Math.PI / 2;
  rightCup.position.set(0.11, 0, 0);

  const rightAccent = new THREE.Mesh(
    new THREE.TorusGeometry(0.028, 0.005, 8, 16),
    accentMat
  );
  rightAccent.rotation.y = Math.PI / 2;
  rightAccent.position.set(0.123, 0, 0);
  headsetGroup.add(rightCup, rightAccent);

  // Mic boom
  const mic = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.055, 8),
    bodyMat
  );
  mic.rotation.z = Math.PI / 4;
  mic.position.set(-0.14, -0.04, 0.02);

  const micTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.007, 8, 8),
    accentMat
  );
  micTip.position.set(-0.17, -0.07, 0.02);
  headsetGroup.add(mic, micTip);

  // ✅ HARDCODED from your exact neck world position
  // Neck: y=1.380, z=0.050
  headsetGroup.position.set(0, 1.380, 0.05);

  character.add(headsetGroup);
  console.log("[Headset] ✅ Placed at hardcoded neck position");
}
