import "./ExerciseVideoList.css";
import VideoLink from "./video-link/VideoLink";
import EmptyState from "../../../common/empty-state/EmptyState";
import { icons } from "../../../../utils";

const ExerciseVideoList = ({ listTitle, videoList }) => {
    return (
        <div className="exercise-video-list">
            <div className="list-title">{listTitle}</div>

            {videoList.length === 0 ? (
                <EmptyState icon={icons.faDumbbell} message={"운동 영상이 없어요"} />
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