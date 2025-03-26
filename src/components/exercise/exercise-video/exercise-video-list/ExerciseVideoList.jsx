import "./ExerciseVideoList.css";
import VideoLink from "./video-link/VideoLink";

const ExerciseVideoList = ({ listTitle, videoList }) => {
    return (
        <div className="exercise-video-list">
            <div className="list-title">
                {listTitle}
            </div>
            <div className="video-list">
                {videoList.map((it, idx) => 
                    <VideoLink
                        key={idx}
                        videoThumbnailImg={it.img}
                        videoTitle={it.title}
                        videoDescription={it.description}
                    />
                )}
            </div>
        </div>
    );
};

export default ExerciseVideoList;