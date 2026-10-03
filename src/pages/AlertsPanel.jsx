import { useState } from 'react';
import { AlertCircle, CheckCircle, Shield, SlidersHorizontal, Trash2 } from 'lucide-react';
import Table from '../components/Table';
import Button from '../components/Button';

export default function AlertsPanel() {
  const [activeTab, setActiveTab] = useState('all');

  const alertsData = [
    { id: 'ALT-8092', domain: 'secure-login-paypal.com', source: 'CT Log Monitor', type: 'High Risk Keyword', severity: 'High', status: 'New', time: '10 mins ago', actions: '' },
    { id: 'ALT-8091', domain: 'api.apple-verify.net', source: 'Phishing Engine', type: 'Heuristics Match', severity: 'Medium', status: 'Investigating', time: '25 mins ago', actions: '' },
    { id: 'ALT-8090', domain: 'netflix-billing.com', source: 'USER Report', type: 'Confirmed Phishing', severity: 'High', status: 'Blocked', time: '1 hr ago', actions: '' },
    { id: 'ALT-8089', domain: 'update-windows-essential.com', source: 'CT Log Monitor', type: 'Suspicious TLD', severity: 'Low', status: 'Closed', time: '4 hrs ago', actions: '' },
    { id: 'ALT-8088', domain: 'amazon-support-help.co', source: 'Phishing Engine', type: 'Malware Distribution', severity: 'High', status: 'Blocked', time: '5 hrs ago', actions: '' },
    { id: 'ALT-8087', domain: 'internal-corp.local', source: 'Internal Scan', type: 'Policy Violation', severity: 'Medium', status: 'New', time: '12 hrs ago', actions: '' },
    { id: 'ALT-8086', domain: 'chase-verify-identity.com', source: 'Threat Intel', type: 'Known Malicious IP', severity: 'High', status: 'New', time: '1 day ago', actions: '' },
  ];

  const filteredData = alertsData.filter(alert => {
    if (activeTab === 'high') return alert.severity === 'High';
    if (activeTab === 'new') return alert.status === 'New';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Security Alerts</h1>
          <p className="text-slate-400 mt-1">Manage, investigate, and triage detected threats.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={SlidersHorizontal}>Filters</Button>
          <Button variant="danger" icon={Trash2}>Clear Resolved</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 p-5 rounded-2xl shadow-lg flex items-center justify-between opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
          <div>
            <p className="text-slate-400 text-sm font-medium">Critical Unresolved</p>
            <p className="text-3xl font-bold text-danger mt-1">12</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-danger" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 p-5 rounded-2xl shadow-lg flex items-center justify-between opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
          <div>
            <p className="text-slate-400 text-sm font-medium">Investigating</p>
            <p className="text-3xl font-bold text-warning mt-1">8</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-warning" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 p-5 rounded-2xl shadow-lg flex items-center justify-between opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
          <div>
            <p className="text-slate-400 text-sm font-medium">Resolved (24h)</p>
            <p className="text-3xl font-bold text-accent mt-1">45</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-accent" />
          </div>
        </div>
      </div>

      <div className="glass-panel border border-dark-700 rounded-2xl overflow-hidden">
        <div className="border-b border-dark-700 bg-dark-800/50 p-4">
          <div className="flex space-x-1">
            {['all', 'high', 'new'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-slate-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                {tab === 'high' ? 'High Severity' : tab === 'new' ? 'New Only' : 'All Alerts'}
              </button>
            ))}
          </div>
        </div>
        
        <Table 
          headers={['ID', 'Domain / Asset', 'Source', 'Detection Type', 'Severity', 'Status', 'Time', '']} 
          data={filteredData.map(({ id, domain, source, type, severity, status, time, actions }) => {
            const statusColors = {
              'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              'Investigating': 'bg-warning/10 text-warning border-warning/20',
              'Blocked': 'bg-danger/10 text-danger border-danger/20',
              'Closed': 'bg-dark-700 text-slate-400 border-dark-600',
            };

            return {
              id: <span className="font-mono text-xs font-bold text-slate-500">{id}</span>,
              domain: domain,
              source: <span className="text-xs text-slate-400">{source}</span>,
              type: type,
              severity: severity,
              status: (
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${statusColors[status]}`}>
                  {status}
                </span>
              ),
              time: <span className="text-slate-500 text-xs whitespace-nowrap">{time}</span>,
              actions: actions
            };
          })} 
        />
      </div>
    </div>
  );
}
