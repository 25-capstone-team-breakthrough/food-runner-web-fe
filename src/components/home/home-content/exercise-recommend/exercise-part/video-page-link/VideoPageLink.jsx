import "./VideoPageLink.css";

const VideoPageLink = ({ linkImg, linkLabel }) => {
    return (
        <a className="video-page-link">
            <div className="link-img">
                <img src={linkImg} />
            </div>
            <div className="link-label">
                {linkLabel}
            </div>
        </a>
    );
};

export default VideoPageLink;