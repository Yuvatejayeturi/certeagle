import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ data, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', padding: 20, usePointStyle: true, pointStyle: 'circle' }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
      }
    },
    borderWidth: 0,
  };

  return (
    <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col relative">
      <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">{title}</h3>
      <div className="flex-1 relative pb-4">
        <Doughnut options={options} data={data} style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 flex items-center justify-center flex-col -mt-8 pointer-events-none">
          <span className="text-3xl font-bold text-white leading-none">
            {data.datasets[0].data.reduce((a, b) => a + b, 0)}
          </span>
          <span className="text-sm text-slate-400 mt-1">Total Logs</span>
        </div>
      </div>
    </div>
  );
}
