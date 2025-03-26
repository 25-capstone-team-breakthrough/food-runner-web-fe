import "./VideoLink.css";

const VideoLink = ({ videoThumbnailImg, videoTitle, videoDescription }) => {
    return (
        <a className="video-link">
            <div className="video-thumbnail">
                <img src={videoThumbnailImg} />
            </div>
            <div className="video-info">
                <div className="video-title">
                    {videoTitle}
                </div>
                <div className="video-description">
                    {videoDescription}
                </div>
            </div>
        </a>
    );
};

export default VideoLink;