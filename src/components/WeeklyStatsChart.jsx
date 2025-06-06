// src/components/WeeklyStatsChart.jsx

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { postureRecords } from "../data/postureData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

function WeeklyStatsChart() {
  const weekData = [12, 14, 18, 41, 14, 51, 12, 12];

  const data = {
    labels: daysOfWeek,
    datasets: [
      {
        label: "거북목 경고 횟수",
        data: weekData,
        backgroundColor: [
          "#EF9A9A",
          "#FFCDD2",
          "#F8BBD0",
          "#E1BEE7",
          "#D1C4E9",
          "#C5CAE9",
          "#B3E5FC",
        ], // 부드러운 파스텔 계열
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 0, // 전체 애니메이션 제거
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "🗓️ 주간 자세 경고 통계",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: "600px", margin: "30px auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default WeeklyStatsChart;
