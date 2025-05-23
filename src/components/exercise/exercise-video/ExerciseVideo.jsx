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

    const partList = ["어깨", "가슴", "팔", "복근", "허벅지", "종아리", "엉덩이"];

    // 전체 운동 영상 (선택된 부위 기준)
    const partVideos = searchedVideos[selectedPart] || [];

    return (
        <div className="exercise-video">
            <div className="exercise-guide">|EXERCISE GUIDE|</div>

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
                        listTitle="추천 운동"
                        videoList={recommendedVideos.map((video) => ({
                            img: `https://img.youtube.com/vi/${video.videoId}/0.jpg`,
                            title: video.title,
                            url: video.url,
                        }))}
                    />

                    <ExerciseVideoList
                        listTitle={`${selectedPart} 운동`}
                        videoList={partVideos.map((video) => ({
                            img: `https://img.youtube.com/vi/${video.videoId}/0.jpg`,
                            title: video.title,
                            url: video.url,
                        }))}
                    />
                </>
            )}
        </div>
    );
};

export default ExerciseVideo;