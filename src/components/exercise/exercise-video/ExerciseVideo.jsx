import React, { useEffect, useState } from "react";
import { useAuthState } from "../../../contexts/AuthContext";
import { useExerciseState, useExerciseDispatch } from "../../../contexts/ExerciseContext";
import ExercisePartButton from "./exercise-part-button/ExercisePartButton";
import ExerciseVideoList from "./exercise-video-list/ExerciseVideoList";
import "./ExerciseVideo.css";
import Loading from "../../common/loading/Loading";

const ExerciseVideo = () => {
    const { user } = useAuthState();
    const { recommendedVideos, searchedVideos, loading } = useExerciseState();
    const { fetchExerciseVideos } = useExerciseDispatch();

    const [selectedPart, setSelectedPart] = useState("어깨");

    useEffect(() => {
        if (user?.token) {
            fetchExerciseVideos(user.token);
        }
    }, [user?.token]);

    const partList = ["어깨", "가슴", "팔", "등", "배", "허벅지", "종아리", "엉덩이"];

    // 선택된 부위의 일반 영상
    const partVideos = searchedVideos[selectedPart] || [];

    // 추천 영상
    const filteredRecommendedVideos = recommendedVideos
        .filter((video) => video.category === selectedPart)
        .map((video) => ({
            img: `https://img.youtube.com/vi/${video.videoId}/0.jpg`,
            title: video.title,
            url: video.url,
        }));

    // 일반 영상
    const mappedPartVideos = partVideos.map((video) => ({
        img: `https://img.youtube.com/vi/${video.videoId}/0.jpg`,
        title: video.title,
        url: video.url,
    }));

    // 전체 영상
    const combinedVideos = [...filteredRecommendedVideos, ...mappedPartVideos];

    return (
        <div className="exercise-video">
            <div className="exercise-guide">|EXERCISE VIDEO|</div>
            <div className="part-select">
                {partList.map((part) => (
                    <ExercisePartButton
                        key={part}
                        text={part}
                        type={part === selectedPart ? "selected" : "default"}
                        onClick={() => setSelectedPart(part)}
                    />
                ))}
            </div>

            {loading.exerciseVideos ? (
                <Loading size="fit" />
            ) : (
                <>
                    <ExerciseVideoList
                        listTitle={"추천 운동"}
                        videoList={filteredRecommendedVideos}
                    />

                    <ExerciseVideoList
                        listTitle={"전체 운동"}
                        videoList={combinedVideos}
                    />
                </>
            )}
        </div>
    );
};

export default ExerciseVideo;