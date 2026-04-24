import moment from "moment";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CommonDoughnutChart = ({ title, data = [], filters, colorMap = {} }) => {

    if (!data.length) {
        return <p className="text-center">No data available</p>;
    };

    const labels = data.map(item => item._id);
    const values = data.map(item => item.count);
    const backgroundColor = data.map(item => colorMap[item._id] || "#999");

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor,
                borderWidth: 1
            }
        ]
    };

    const getTitleText = () => {
        if (filters?.startDate && filters?.endDate) {
            return `${title} (${moment(filters?.startDate).format("DD MMM YYYY")} - ${moment(filters?.endDate).format("DD MMM YYYY")})`;
        };
        if (filters?.range) {
            return `${title} (Last ${filters?.range.replace("d", "")} Days)`;
        };
        return title;
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: getTitleText()
            },
            legend: {
                position: "bottom"
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.raw;
                        const percent = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percent}%)`;
                    }
                }
            }
        },
        cutout: "50%"
    };

    return <Doughnut data={chartData} options={options} />
};

export default CommonDoughnutChart;