import moment from "moment";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

const CommonBarChart = ({ title, filters, labels = [], datasets = [], stacked = false }) => {

    if (!labels.length || !datasets.length) return <p className="text-center">No data available</p>;

    const getTitleText = () => {
        if (filters?.startDate && filters?.endDate) {
            return `${title} (${moment(filters?.startDate).format("DD MMM YYYY")} - ${moment(filters?.endDate).format("DD MMM YYYY")})`;
        };
        if (filters?.range) {
            return `${title} (Last ${filters?.range.replace("d", "")} Days)`;
        };
        return title;
    };

    const chartData = { labels, datasets };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: getTitleText()
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