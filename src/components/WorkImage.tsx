import { useState, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image?: string;
  images?: string[];
  alt?: string;
  video?: string;
  directVideo?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && props.images && props.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % props.images!.length);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setCurrentIndex(0);
    }
  }, [props.images, isHovered]);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={() => {
          setIsHovered(true);
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsVideo(false);
        }}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {props.directVideo ? (
          <video
            className="direct-video"
            src={props.directVideo}
            autoPlay
            muted
            playsInline
            loop
          />
        ) : props.images ? (
          props.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={props.alt}
              style={{
                position: idx === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: currentIndex === idx ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                objectFit: "cover",
              }}
            />
          ))
        ) : (
          <img src={props.image} alt={props.alt} />
        )}
        {isVideo && <video className="overlay-video" src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
