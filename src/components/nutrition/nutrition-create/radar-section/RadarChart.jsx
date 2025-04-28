import "./RadarChart.css";
import React from "react";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
} from "chart.js";
import "./RadarChart.css";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
);

const RadarChart = ({ data }) => {
    const recommended = {
        carbs: 150,
        protein: 60,
        fat: 20,
        fiber: 25,
        vitamin: 2000,
    };

    const ratioData = [
        data.carbs / recommended.carbs,
        data.protein / recommended.protein,
        data.fat / recommended.fat,
        data.fiber / recommended.fiber,
        data.vitamin / recommended.vitamin,
    ];

    const chartData = {
        labels: [
            `탄수화물\n${data.carbs}g`,
            `단백질\n${data.protein}g`,
            `지방\n${data.fat}g`,
            `식이섬유\n${data.fiber}g`,
            `비타민\n${data.vitamin}mg`,
        ],
        datasets: [
            {
                label: "기준 오각형",
                data: [1, 1, 1, 1, 1], // 기준 오각형
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1,
                pointRadius: 0,
                fill: true,
                z: 1
            },
            {
                label: "섭취 오각형",
                data: ratioData,
                backgroundColor: "rgba(225, 255, 1, 0.2)",
                borderColor: "rgba(198, 224, 36, 1)",
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                z: 2
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            r: {
                min: 0,
                max: 2,
                ticks: {
                    stepSize: 1,
                    callback: (val) => (val === 1 ? "권장량" : ""),
                    color: "#aaa",
                    font: {
                        size: 12
                    }
                },
                pointLabels: {
                    callback: (label) => label.split("\n"),
                    font: {
                        size: 14
                    },
                    color: "#333"
                },
                grid: {
                    circular: false,
                    color: "#ccc"
                },
                angleLines: {
                    color: "#ccc"
                }
            }
        }
    };

    return (
        <div className="radar-chart-container">
            <Radar data={chartData} options={chartOptions} />
        </div>
    );
};

export default RadarChart;
