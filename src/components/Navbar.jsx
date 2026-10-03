import { Bell, Search, Settings, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 bg-dark-800/80 backdrop-blur-md border-b border-dark-700 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center lg:hidden">
        <button className="text-slate-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden lg:flex flex-1 items-center max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          <input 
            type="text" 
            className="w-full bg-dark-900 border border-dark-700 text-slate-200 text-sm rounded-lg focus:ring-primary focus:border-primary block pl-10 p-2 transition-all placeholder-slate-500" 
            placeholder="Search endpoints, logs, or IPs..." 
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-dark-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-danger"></span>
          </span>
        </button>
        <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-dark-700">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
