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

const AppContent = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo-container">
            <img src={logo} alt="HR System" className="logo-icon" />
            <span className="logo-text">HR Pro</span>
          </div>

          <nav className="nav-menu">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/employees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>Employees</span>
            </NavLink>
            {user?.roles?.includes('ROLE_ADMIN') && (
              <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <SettingsIcon size={20} />
                <span>Settings</span>
              </NavLink>
            )}
          </nav>

          <div className="sidebar-footer">
            <button className="nav-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }} onClick={logout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="top-header">
            <div className="header-search">
              {/* Search moved to components */}
            </div>
            <div className="header-actions">
              <button className="btn-icon">
                <Bell size={20} />
                <span className="notification-badge"></span>
              </button>
              <div className="user-profile">
                <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                  <div className="user-name">{user.username}</div>
                  <div className="user-role">{user.roles[0]}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="content-wrapper">
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
