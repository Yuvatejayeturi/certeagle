import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, FileText, Bell } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Phishing Detection', path: '/phishing', icon: Search },
    { name: 'CT Monitor', path: '/ct-monitor', icon: FileText },
    { name: 'Alerts Panel', path: '/alerts', icon: Bell },
  ];

  return (
    <aside className="w-64 flex flex-col bg-dark-800 border-r border-dark-700 h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-dark-700">
        <Shield className="text-primary w-8 h-8 mr-3" />
        <span className="text-xl font-bold tracking-tight text-white">CertEagle</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-400 hover:bg-dark-700 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full -ml-4" />}
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium">{link.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-dark-700">
        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center p-0.5 shadow-lg shadow-primary/20">
            <div className="w-full h-full bg-dark-800 rounded-full flex items-center justify-center border-2 border-transparent">
               <span className="text-sm font-bold text-white">AD</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-400">Security Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
