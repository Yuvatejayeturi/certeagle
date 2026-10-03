import { ExternalLink, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const statusIcons = {
  high: <AlertTriangle className="w-4 h-4 text-danger mr-2" />,
  medium: <Info className="w-4 h-4 text-warning mr-2" />,
  low: <CheckCircle2 className="w-4 h-4 text-accent mr-2" />
};

export default function Table({ headers, data }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-dark-700">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs uppercase bg-dark-800/50 text-slate-400 border-b border-dark-700">
            <tr>
              {headers.map((header, i) => (
                <th key={i} scope="col" className="px-6 py-4 font-semibold tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr 
                key={i} 
                className="border-b border-dark-700/50 hover:bg-dark-800/30 transition-colors group"
              >
                {Object.entries(row).map(([key, value], j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap">
                    {key === 'severity' ? (
                      <div className="flex items-center">
                        {statusIcons[value.toLowerCase()]}
                        <span className={`capitalize font-medium ${
                          value === 'High' ? 'text-danger' : 
                          value === 'Medium' ? 'text-warning' : 'text-accent'
                        }`}>
                          {value}
                        </span>
                      </div>
                    ) : key === 'actions' ? (
                      <button className="text-slate-500 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    ) : (key === 'url' || key === 'domain') ? (
                      <span className="font-mono text-xs text-slate-200">{value}</span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
