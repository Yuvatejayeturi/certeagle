import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PhishingDetection from './pages/PhishingDetection';
import CTMonitor from './pages/CTMonitor';
import AlertsPanel from './pages/AlertsPanel';

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-dark-900 text-slate-200">
        <Sidebar />
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/phishing" element={<PhishingDetection />} />
              <Route path="/ct-monitor" element={<CTMonitor />} />
              <Route path="/alerts" element={<AlertsPanel />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
