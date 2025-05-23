import "./ExerciseVideoList.css";
import VideoLink from "./video-link/VideoLink";

const ExerciseVideoList = ({ listTitle, videoList }) => {
    return (
        <div className="exercise-video-list">
            <div className="list-title">{listTitle}</div>

            {videoList.length === 0 ? (
                <div className="video-empty">영상이 없습니다.</div>
            ) : (
                <div className="video-list">
                    {videoList.map((it, idx) => (
                        <VideoLink
                            key={idx}
                            videoThumbnailImg={it.img}
                            videoTitle={it.title}
                            videoUrl={it.url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExerciseVideoList;