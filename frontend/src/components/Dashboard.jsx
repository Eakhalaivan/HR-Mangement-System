import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  TrendingUp,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { getEmployees } from '../services/api';
import { useAuth } from '../context/AuthContext';
import DotGrid from '../components/DotGrid';

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalEmployees: 0,
    newEmployees: 0,
    growth: 0,
    departmentsCount: 0
  });

  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {

    if (!user) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {

        const employees = await getEmployees();
        setRecentEmployees(employees.slice(-5).reverse());

        const total = employees.length;

        setStats({
          totalEmployees: total,
          newEmployees: Math.ceil(total * 0.1),
          growth: 12.5,
          departmentsCount: new Set(employees.map(e => e.department)).size
        });

      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

  }, [user]);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (

    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 group">

      <div className="flex justify-between items-start mb-4">

        <div className={`p-3.5 rounded-2xl ${color} bg-opacity-20 ring-1 ring-inset ring-white/10 shadow-lg`}>
          <Icon className={color.replace('bg-', 'text-')} size={22} />
        </div>

        {trend && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-wider ring-1 ring-emerald-500/20">
            <ArrowUpRight size={12} />
            {trend}%
          </div>
        )}

      </div>

      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
      <div className="text-3xl font-black text-white tracking-tight">{value}</div>

    </div>

  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="relative h-56 rounded-3xl overflow-hidden shadow-lg mb-8">

        <div className="absolute inset-0 bg-slate-900">
          <DotGrid
            dotSize={4}
            gap={18}
            baseColor="#334155"
            activeColor="#818cf8"
            proximity={120}
            shockRadius={240}
            shockStrength={6}
            resistance={750}
            returnDuration={1.5}
            className="opacity-60"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-center h-full px-10 text-white">
          <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-2 px-1">Overview</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-slate-300 mt-2 max-w-md">
            Comprehensive overview of your workforce metrics and departmental insights
          </p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Workforce"
          value={stats.totalEmployees}
          icon={Users}
          color="bg-indigo-600"
          trend={stats.growth}
        />

        <StatCard
          title="Active Departments"
          value={stats.departmentsCount}
          icon={TrendingUp}
          color="bg-emerald-600"
        />

        <StatCard
          title="New Hires"
          value={stats.newEmployees}
          icon={UserPlus}
          color="bg-amber-500"
          trend={5}
        />

        <StatCard
          title="Upcoming Reviews"
          value="12"
          icon={Calendar}
          color="bg-purple-600"
        />

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Table */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden">

          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h2 className="font-bold text-lg text-white">Recent Additions</h2>
            <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">View All</button>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-950/40 border-b border-white/5">

                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-500">Employee</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500">Department</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500">Email</th>
                </tr>

              </thead>

              <tbody className="divide-y divide-white/5">

                {recentEmployees.map(employee => (

                  <tr key={employee.id}>

                    <td className="px-6 py-4">
                      {employee.firstName} {employee.lastName}
                    </td>

                    <td className="px-6 py-4">{employee.department}</td>

                    <td className="px-6 py-4 text-gray-500">
                      {employee.email}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Right Card */}
        <div className="bg-indigo-600 rounded-[2rem] p-10 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">

          <h2 className="text-2xl font-bold mb-4">
            Empower Your HR Workflow
          </h2>

          <p className="text-indigo-100 mb-6">
            Manage employees, track departments and generate reports.
          </p>

          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold">
            Get Advanced Reports
          </button>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;