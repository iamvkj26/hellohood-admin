import moment from "moment";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const CommonLineChart = ({ data = [], filters, label, color, title, text }) => {

    const graph = {
        labels: data?.map(item => moment(item._id).format("DD MMM")),
        datasets: [{
            label,
            data: data.map(item => item.count),
            backgroundColor: color,
            borderColor: color,
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
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

    const options = { responsive: true, plugins: { title: { display: true, text: getTitleText() }, legend: { display: true } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } };

    if (!data.length) return <p className="text-center">{text}</p>;

    return <Line data={graph} options={options} />;
};

export default CommonLineChart;