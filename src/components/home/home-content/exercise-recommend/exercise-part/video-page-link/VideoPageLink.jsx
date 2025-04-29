import "./VideoPageLink.css";

const VideoPageLink = ({ linkImg, linkLabel, onClick }) => {
    return (
        <a className="video-page-link" onClick={onClick} >
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