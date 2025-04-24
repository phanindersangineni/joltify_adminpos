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

const SalesBarChart = ({ data }) => {
  const labels = data.map(item => `${item.month}`);
  const amounts = data.map(item => item.payableamount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Payable Amount',
        data: amounts,
        backgroundColor: '#374151',
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

export default SalesBarChart;
