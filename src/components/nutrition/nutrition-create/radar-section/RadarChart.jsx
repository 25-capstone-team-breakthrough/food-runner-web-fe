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
    Title,
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

const RadarChart = ({ data, minValues, maxValues }) => {
    const nutrientKeys = ["carbs", "protein", "fat", "fiber", "vitamin"];
    const labels = ["탄수화물", "단백질", "지방", "식이섬유", "비타민"];

    // 비율 계산
    const valueDataset = nutrientKeys.map((key) => {
        const value = data[key] ?? 0;
        const min = minValues[key] ?? 1;
        const max = maxValues[key] ?? 1;

        if (value === 0) {
            return 0;
        }
        if (value <= min) {
            return 0.5 * (value / min);
        }
        if (value >= max) {
            return 1.0;
        }

        return 0.5 + 0.5 * ((value - min) / (max - min));
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: "섭취량",
                data: valueDataset,
                backgroundColor: "rgba(225, 255, 1, 0.2)",
                borderColor: "rgba(198, 224, 36, 1)",
                borderWidth: 1.5,
                pointRadius: 1.5,
                pointBackgroundColor: "rgba(198, 224, 36, 1)",
                fill: true,
            },
            {
                label: "최소 권장량",
                data: Array(5).fill(0.5),
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "#ccc",
                borderWidth: 1,
                pointRadius: 0,
                fill: true,
            },
            {
                label: "최대 권장량",
                data: Array(5).fill(1),
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "#ccc",
                borderWidth: 1,
                pointRadius: 0,
                fill: true,
            },
        ]      
    };

    const chartOptions = {
        responsive: true,
        plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
            label: (context) => {
                const idx = context.dataIndex;
                const key = nutrientKeys[idx];
                const value = data[key] ?? 0;
                const min = minValues[key] ?? 0;
                const max = maxValues[key] ?? 0;
                return `섭취량: ${value.toFixed(1)} / 적정: ${min.toFixed(1)} ~ ${max.toFixed(1)}`;
            },
            },
        },
        },
        scales: {
        r: {
            min: 0,
            max: 1,
            ticks: {
                display: false,
                stepSize: 0.5,
            },
            pointLabels: {
                display: true,
                font: { size: 16, weight: 800 },
                color: "#000"
            },
            grid: {
                circular: false,
                color: "#d9d9d9",
                z: 2,
            },
            angleLines: {
                color: "#d9d9d9",
                z: 2,
            },
        },
        },
    };

    return (
        <div className="radar-chart-container">
            <Radar data={chartData} options={chartOptions} />
        </div>
    );
};

export default RadarChart;
