import { Line } from 'react-chartjs-2';

export default function LineChart({ data, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          boxWidth: 6,
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 4,
      }
    },
    scales: {
      y: {
        grid: { color: '#334155', borderDash: [4, 4], drawBorder: false },
        ticks: { color: '#64748b', font: { family: "'Inter', sans-serif" } },
        beginAtZero: true
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#64748b', font: { family: "'Inter', sans-serif" } }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 0, hitRadius: 10, hoverRadius: 6 }
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col relative w-full">
      <h3 className="text-lg font-semibold text-white mb-6 tracking-tight">{title}</h3>
      <div className="flex-1 min-h-0 relative w-full">
        <Line options={options} data={data} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
