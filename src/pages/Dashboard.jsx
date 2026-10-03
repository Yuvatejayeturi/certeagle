import { ShieldAlert, Activity, Globe, FileKey2 } from 'lucide-react';
import Card from '../components/Card';
import LineChart from '../components/LineChart';
import Table from '../components/Table';

export default function Dashboard() {
  const stats = [
    { title: 'Total Threats Blocked', value: '14,239', icon: ShieldAlert, trend: 'up', trendValue: '12%', colorClass: 'from-danger to-red-900' },
    { title: 'Active Scans', value: '42', icon: Activity, trend: 'up', trendValue: '5%', colorClass: 'from-primary to-blue-900' },
    { title: 'Phishing URLs Detected', value: '1,893', icon: Globe, trend: 'down', trendValue: '2%', colorClass: 'from-warning to-amber-900' },
    { title: 'New Certificates (CT)', value: '89,431', icon: FileKey2, trend: 'up', trendValue: '24%', colorClass: 'from-accent to-emerald-900' }
  ];

  const trafficData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Threat Intensity',
        data: [120, 190, 80, 250, 320, 210, 150],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
      {
        label: 'Certificates Logged',
        data: [400, 300, 500, 450, 600, 350, 420],
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
      }
    ],
  };

  const recentAlertsData = [
    { time: '10 mins ago', domain: 'secure-login-paypal.com', type: 'Phishing', severity: 'High', actions: '' },
    { time: '25 mins ago', domain: 'api.apple-verify.net', type: 'Suspicious Cert', severity: 'Medium', actions: '' },
    { time: '1 hour ago', domain: 'netflix-billing-update.com', type: 'Phishing', severity: 'High', actions: '' },
    { time: '3 hours ago', domain: 'amazon-support-help.co', type: 'Malware', severity: 'High', actions: '' },
    { time: '5 hours ago', domain: 'internal-corp-portal.local', type: 'Policy Violation', severity: 'Low', actions: '' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Security Overview</h1>
          <p className="text-slate-400 mt-1">Real-time threat metrics and system status.</p>
        </div>
        <div className="flex space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/20">
            <Activity className="w-3 h-3 mr-1.5 animate-pulse" /> System Optimal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChart data={trafficData} title="Threat vs Certificate Activity (24h)" />
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Threat Map Data</h3>
            <p className="text-sm text-slate-400 mb-6">Top origin countries for suspicious activity in the last 7 days.</p>
            
            <div className="space-y-4">
              {[
                { country: 'Russia', value: 45, color: 'bg-red-500' },
                { country: 'China', value: 32, color: 'bg-orange-500' },
                { country: 'Brazil', value: 15, color: 'bg-amber-500' },
                { country: 'United States', value: 8, color: 'bg-yellow-500' }
              ].map(item => (
                <div key={item.country}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{item.country}</span>
                    <span className="text-slate-400">{item.value}%</span>
                  </div>
                  <div className="w-full bg-dark-700/50 rounded-full h-1.5 backdrop-blur-sm overflow-hidden flex">
                    <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 py-2 border border-dark-600 hover:border-dark-500 hover:bg-dark-700/50 text-slate-300 text-sm rounded-lg transition-all">
            View Geographic Map
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent High-Priority Events</h3>
        <Table 
          headers={['Time', 'Domain / Indicator', 'Event Type', 'Severity', '']} 
          data={recentAlertsData} 
        />
      </div>
    </div>
  );
}
