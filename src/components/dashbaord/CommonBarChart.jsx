import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

const CommonBarChart = ({ title, range = "60d", labels = [], datasets = [], stacked = false }) => {

    if (!labels.length || !datasets.length) {
        return <p className="text-center">No data available</p>;
    };

    const chartData = { labels, datasets };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${title} (Last ${range.replace("d", "")} Days)`
            },
            legend: {
                display: datasets.length > 1,
                position: "bottom"
            }
        },
        scales: {
            x: {
                stacked,
                ticks: {
                    autoSkip: false,
                    maxRotation: 60,
                    minRotation: 45
                }
            },
            y: {
                stacked,
                beginAtZero: true
            }
        }
    };

    return <Bar data={chartData} options={options} />
};

export default CommonBarChart;