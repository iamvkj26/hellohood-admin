import moment from "moment";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const CommonLineChart = ({ data = [], range = "60d", label, color, title, text }) => {

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

    const options = { responsive: true, plugins: { title: { display: true, text: `${title} (Last ${range.replace("d", "")} Days)` }, legend: { display: true } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } };

    if (!data.length) return <p className="text-center">{text}</p>;

    return <Line data={graph} options={options} />;
};

export default CommonLineChart;