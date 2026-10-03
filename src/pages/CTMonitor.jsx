import { useState, useEffect } from 'react';
import { Eye, Database, ListFilter, Play, Square, Download } from 'lucide-react';
import Button from '../components/Button';
import DoughnutChart from '../components/DoughnutChart';

export default function CTMonitor() {
  const [logs, setLogs] = useState([]);
  const [isStreaming, setIsStreaming] = useState(true);

  // Simulate incoming CT logs
  useEffect(() => {
    if (!isStreaming) return;

    const generateLog = () => {
      const domains = ['auth.', 'www.', 'api.', 'mail.', 'app.', 'dev.', 'test.', 'secure.'];
      const baseDomains = ['example.com', 'google.com', 'microsoft.com', 'internal.network', 'suspicious-login.net'];
      const orgs = ['Let\'s Encrypt', 'DigiCert', 'Sectigo', 'Cloudflare', 'ZeroSSL'];
      
      const domain = `${domains[Math.floor(Math.random() * domains.length)]}${baseDomains[Math.floor(Math.random() * baseDomains.length)]}`;
      const isSus = domain.includes('suspicious') || domain.includes('auth.internal');
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        domain,
        issuer: orgs[Math.floor(Math.random() * orgs.length)],
        timestamp: new Date().toLocaleTimeString(),
        type: isSus ? 'Pre-cert (Suspicious)' : 'Pre-cert',
        risk: isSus ? 'High' : 'Low'
      };
    };

    const interval = setInterval(() => {
      setLogs((prevLogs) => {
        const newLogs = [generateLog(), ...prevLogs];
        return newLogs.slice(0, 50); // Keep last 50 logs
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const issuerData = {
    labels: ['Let\'s Encrypt', 'Cloudflare', 'DigiCert', 'Sectigo', 'Other'],
    datasets: [{
      data: [65, 15, 10, 5, 5],
      backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#64748b'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="span-y-6 h-full flex flex-col pb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Certificate Transparency Logs</h1>
          <p className="text-slate-400 mt-1">Live firehose of global SSL/TLS certificate issuances via certstream.</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            icon={isStreaming ? Square : Play}
            onClick={() => setIsStreaming(!isStreaming)}
          >
            {isStreaming ? 'Stop Stream' : 'Start Stream'}
          </Button>
          <Button variant="primary" icon={Download}>Export CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 glass-panel border border-dark-700 flex flex-col rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-dark-700 bg-dark-800/80 flex items-center justify-between">
            <div className="flex items-center">
              <Database className="w-5 h-5 text-primary mr-2" />
              <h2 className="font-semibold text-white">Live Stream</h2>
              {isStreaming && (
                <span className="ml-3 flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
              )}
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Filter domains..." 
                className="bg-dark-900 border border-dark-600 text-sm rounded-md px-3 py-1.5 focus:ring-1 focus:ring-primary focus:border-primary text-slate-200 w-48 transition-all"
              />
              <ListFilter className="w-4 h-4 text-slate-500 absolute right-2.5 top-2" />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-dark-900/50 p-4 font-mono text-sm">
            {logs.length === 0 ? (
               <div className="h-full flex items-center justify-center text-slate-500 flex-col">
                  <Database className="w-8 h-8 mb-3 opacity-20" />
                  <p>Waiting for certificate stream...</p>
               </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-300 ${
                    log.risk === 'High' 
                      ? 'bg-danger/10 border-danger/30 text-danger-50 shadow-sm shadow-danger/5' 
                      : 'bg-dark-800/80 border-dark-700 text-slate-300 hover:bg-dark-700/80'
                  }`}>
                    <div className="flex-1 truncate">
                      <span className="text-xs opacity-50 mr-3 hidden sm:inline-block w-20">{log.timestamp}</span>
                      <span className={`font-semibold ${log.risk === 'High' ? 'text-red-400' : 'text-slate-200'}`}>
                        {log.domain}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="bg-dark-900 px-2 py-1 rounded truncate max-w-[120px]" title={log.issuer}>{log.issuer}</span>
                      <span className={`px-2 py-1 rounded-full border ${
                        log.risk === 'High' ? 'border-danger text-danger bg-danger/10' : 'border-dark-600 bg-dark-800 text-slate-400'
                      }`}>
                        {log.risk} Risk
                      </span>
                      <button className="p-1 hover:text-primary transition-colors hover:bg-dark-700 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <DoughnutChart data={issuerData} title="Issuers Distribution" />
          
          <div className="glass-panel p-6 rounded-2xl border border-dark-700 flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Keyword Alerts</h3>
            <p className="text-sm text-slate-400 mb-4">Auto-flag certificates containing these patterns:</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {['paypal', 'apple', 'login', 'verify', 'update', 'secure', 'wallet'].map((keyword) => (
                <span key={keyword} className="bg-dark-800 border border-dark-600 px-3 py-1 rounded-full text-xs font-mono text-slate-300 flex items-center">
                  {keyword}
                  <button className="ml-2 text-slate-500 hover:text-danger">&times;</button>
                </span>
              ))}
              <span className="bg-primary/20 border border-primary/30 px-3 py-1 rounded-full text-xs font-mono text-primary cursor-pointer hover:bg-primary/30 transition-colors">
                + Add New
              </span>
            </div>

            <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
              <h4 className="text-sm font-medium text-white mb-2">Regex Pattern</h4>
              <code className="block bg-dark-900 p-2 rounded text-xs text-primary font-mono overflow-x-auto border border-dark-800">
                /(.*)(login|verify|auth)(.*)\.(com|net|org)$/i
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
