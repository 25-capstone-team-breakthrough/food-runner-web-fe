import { useState } from "react";
import "./VideoLink.css";

const VideoLink = ({ videoThumbnailImg, videoTitle, videoUrl }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <a className="video-link" href={videoUrl} target="_blank" rel="noopener noreferrer">
            <div className="video-thumbnail">
                {!isLoaded && <div className="thumbnail-skeleton" />}
                <img
                    src={videoThumbnailImg}
                    alt={videoTitle}
                    onLoad={() => setIsLoaded(true)}
                    style={{ display: isLoaded ? "block" : "none" }}
                />
            </div>
            <div className="video-info">
                <div className="video-title">{videoTitle}</div>
            </div>
        </a>
    );
};

export default VideoLink;