import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExerciseState, useExerciseDispatch } from "../../../../contexts/ExerciseContext";
import { useAuthState } from "../../../../contexts/AuthContext";
import "./ExerciseRecommend.css";
import exerciseVideoBanner from "../../../../assets/images/exercise-video-banner.png";

const ExerciseRecommend = () => {
    const navigate = useNavigate();
    const { user } = useAuthState();
    const { searchedVideos } = useExerciseState();
    const { fetchExerciseVideos } = useExerciseDispatch();

    const partsToShow = ["어깨", "등"];

    useEffect(() => {
        if (user?.token) {
            fetchExerciseVideos(user.token);
        }
    }, [user?.token]);

    const getVideoPreviews = (partName) => {
        const videos = searchedVideos[partName] || [];
        return videos.slice(0, 3).map((video) => ({
            img: `https://img.youtube.com/vi/${video.videoId}/0.jpg`,
            title: video.title,
        }));
    };

    return (
        <div className="exercise-recommend">
            <div className="exercise-recommend__title">
                <div className="exercise-recommend__text-wrapper">
                    클릭 하나로 부위별 <span>맞춤 운동!</span>
                </div>
            </div>

            <div
                className="exercise-recommend__banner"
                onClick={() => navigate("/exercise/video")}
            >
                <img src={exerciseVideoBanner} alt="exerciseVideoBanner" />
            </div>

            <div className="exercise-recommend__content">
                {partsToShow.map((part) => {
                    const videos = getVideoPreviews(part);
                    return (
                        <div key={part} className="exercise-recommend__part">
                            <div className="exercise-recommend__part__label">
                                <div className="exercise-recommend__part-name">{part}</div>
                            </div>
                            <div className="exercise-recommend__video-list">
                                {videos.length === 0 ? (
                                    <div className="exercise-recommend__empty">운동 영상이 없어요</div>
                                ) : (
                                    videos.map((video, idx) => (
                                        <a
                                            key={idx}
                                            className="exercise-recommend__video-card"
                                            onClick={() => navigate("/exercise/video")}
                                        >
                                            <div className="exercise-recommend__thumbnail">
                                                <img src={video.img} alt={video.title} />
                                            </div>
                                            <div className="exercise-recommend__label">{video.title}</div>
                                        </a>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExerciseRecommend;