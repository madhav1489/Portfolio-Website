import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    // Disable horizontal scroll on mobile
    if (window.innerWidth <= 900) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "Slide Forge — AI Presentation Generator",
              category: "RAG Powered",
              tools: "ChromaDB, Hugging Face LLM, Python",
              directVideo: "/images/slideforge_demo.mp4",
              github: "https://github.com/madhav1489/SlideForge"
            },
            {
              title: "Vision-Based ASL Recognition",
              category: "Computer Vision",
              tools: "OpenCV, Machine Learning, Python",
              images: [
                "/images/ASL1.png",
                "/images/ASL2.png",
                "/images/ASL3.png",
                "/images/ASL4.png"
              ],
              github: "https://github.com/madhav1489/Vision-Based-ASL-Recognition"
            },
            {
              title: "Movie Recommendation System",
              category: "Machine Learning",
              tools: "Vectorization, Content-Based Filtering",
              images: [
                "/images/movie1.png",
                "/images/movie2.png",
                "/images/movie3.png"
              ],
              github: "https://github.com/madhav1489/movie-recommendation"
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>
                      {project.github ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="project-title-link" data-cursor="resume">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={(project as any).image} images={(project as any).images} directVideo={(project as any).directVideo} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
