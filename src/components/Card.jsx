export default function Card({ title, value, icon, trend, trendValue, colorClass }) {
  const Icon = icon;
  
  return (
    <div className="glass-panel p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-slate-600/50 group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-3 text-sm">
              <span className={`font-medium ${trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-danger' : 'text-slate-400'}`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '-'} {trendValue}
              </span>
              <span className="text-slate-500 ml-2">vs last week</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClass} bg-opacity-10 backdrop-blur-sm shadow-inner`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
