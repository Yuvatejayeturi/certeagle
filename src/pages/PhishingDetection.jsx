import { useState } from 'react';
import { Search, ShieldX, ShieldCheck, Loader2, Link2, AlertOctagon } from 'lucide-react';
import Button from '../components/Button';

export default function PhishingDetection() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    if (!url) return;

    setIsScanning(true);
    setResult(null);

    // Mock scanning logic
    setTimeout(() => {
      const isPhishing = url.includes('paypal') || url.includes('login') || url.includes('update') || url.includes('-');
      setIsScanning(false);
      setResult({
        url,
        isPhishing,
        score: isPhishing ? 92 : 12,
        checks: [
          { name: 'Domain Age', passed: !isPhishing, detail: isPhishing ? '3 days old' : '5 years old' },
          { name: 'SSL Certificate', passed: true, detail: 'Valid Let\'s Encrypt' },
          { name: 'Redirects', passed: !isPhishing, detail: isPhishing ? 'Multiple obfuscated redirects' : 'Clean direct link' },
          { name: 'Homoglyphs', passed: true, detail: 'No character substitution detected' }
        ]
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Phishing URL Analyzer</h1>
        <p className="text-slate-400 mt-1">Deep scan URLs with heuristic and ML-based detection engines.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
        
        <form onSubmit={handleScan} className="relative z-10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Link2 className="w-5 h-5 text-slate-500" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/login"
              className="w-full bg-dark-900 border border-dark-600 focus:border-primary focus:ring-1 focus:ring-primary text-slate-200 rounded-xl block pl-12 p-4 transition-all shadow-inner placeholder-slate-600"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isScanning || !url} 
            className="md:w-32 py-4 h-[58px]"
          >
            {isScanning ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Analyze URL'}
          </Button>
        </form>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1 border border-dark-700 glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg relative ${
              result.isPhishing ? 'bg-danger/20 text-danger shadow-danger/20' : 'bg-accent/20 text-accent shadow-accent/20'
            }`}>
              {result.isPhishing ? (
                <>
                  <div className="absolute inset-0 border-2 border-danger rounded-full animate-ping opacity-20"></div>
                  <ShieldX className="w-10 h-10 relative z-10" />
                </>
              ) : (
                <ShieldCheck className="w-10 h-10" />
              )}
            </div>
            
            <h2 className={`text-2xl font-bold mb-2 ${result.isPhishing ? 'text-danger' : 'text-accent'}`}>
              {result.isPhishing ? 'Phishing Detected' : 'URL is Safe'}
            </h2>
            <div className="text-slate-400 text-sm mb-4 break-all bg-dark-900 px-3 py-2 rounded-lg border border-dark-700 w-full font-mono line-clamp-2">
              {result.url}
            </div>
            
            <div className="w-full mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Threat Score</span>
                <span className="text-xs text-white font-bold">{result.score}/100</span>
              </div>
              <div className="w-full bg-dark-900 rounded-full h-2 overflow-hidden border border-dark-700">
                <div 
                  className={`h-2 rounded-full ${result.score > 80 ? 'bg-danger' : result.score > 40 ? 'bg-warning' : 'bg-accent'}`} 
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-dark-700 pb-4">Heuristics Analysis</h3>
            
            <div className="space-y-4">
              {result.checks.map((check, index) => (
                <div key={index} className="flex items-start p-4 rounded-xl bg-dark-800/50 border border-dark-700/50 transition-colors hover:bg-dark-800">
                  <div className={`mt-0.5 mr-4 p-2 rounded-lg ${check.passed ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger'}`}>
                    {check.passed ? <ShieldCheck className="w-5 h-5" /> : <AlertOctagon className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{check.name}</h4>
                    <p className="text-slate-400 text-sm">{check.detail}</p>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider">
                    {check.passed ? (
                      <span className="text-accent">Pass</span>
                    ) : (
                      <span className="text-danger">Fail</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-dark-700 flex justify-end gap-3">
               <Button variant="outline">Download Report</Button>
               {result.isPhishing && <Button variant="danger" icon={ShieldX}>Block Domain</Button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
