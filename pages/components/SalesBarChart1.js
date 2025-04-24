import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesBarChart1 = ({ data }) => {
  const labels = data.map(item => `${item.month}`);
  const count = data.map(item => item.ordercount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: count,
        backgroundColor: '#60A5FA',
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesBarChart1;
