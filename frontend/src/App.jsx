import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import {
  Users,
  LayoutDashboard,
  Settings as SettingsIcon,
  LogOut,
  Bell
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import logo from './assets/logo.png';
import Background from './components/Background';
const AppContent = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Background />
      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <aside className="w-72 bg-slate-950/90 backdrop-blur-2xl border-r border-white/5 p-8 flex flex-col sticky top-0 h-screen shadow-2xl z-20">
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <img src={logo} alt="HR System" className="w-6 h-6 object-contain brightness-0 invert" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              HR<span className="text-indigo-500">PRO</span>
            </span>
          </div>

          <nav className="flex-1 flex flex-col gap-2.5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${isActive
                  ? 'bg-indigo-500/10 text-indigo-400 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1'
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${isActive
                  ? 'bg-indigo-500/10 text-indigo-400 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1'
                }`
              }
            >
              <Users size={20} />
              <span>Employees</span>
            </NavLink>
            {user?.roles?.includes('ROLE_ADMIN') && (
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${isActive
                    ? 'bg-indigo-500/10 text-indigo-400 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1'
                  }`
                }
              >
                <SettingsIcon size={20} />
                <span>Settings</span>
              </NavLink>
            )}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button
              className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group"
              onClick={logout}
            >
              <div className="p-2 rounded-lg group-hover:bg-red-500/10 transition-colors">
                <LogOut size={20} />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="h-20 bg-slate-900/40 backdrop-blur-md border-b border-white/5 px-10 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <div className="header-search">
              {/* Search moved to components */}
            </div>
            <div className="flex items-center gap-6">
              <button className="p-2.5 text-slate-500 rounded-xl hover:bg-white/5 hover:text-indigo-400 transition-all duration-300 relative group border border-transparent hover:border-white/5">
                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
              </button>
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/10 ring-4 ring-white/5">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-white tracking-tight">{user.username}</div>
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mt-1">{user.roles[0].replace('ROLE_', '')}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-10 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/settings" element={
                user?.roles?.includes('ROLE_ADMIN') ? <Settings /> : <Navigate to="/" />
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
