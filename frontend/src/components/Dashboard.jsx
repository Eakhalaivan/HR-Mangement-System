import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import { Users, Briefcase, TrendingUp, PieChart } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalEmployees: 0, departmentStats: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading dashboard stats...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-xl p-6 mb-10 text-white">
  <h1 className="text-3xl font-bold">Dashboard</h1>
  <p className="text-indigo-100">Overview of your organization.</p>

                </div>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                        <Users size={24} />
                    </div>
                     <div>
            <div className="text-sm text-gray-500">Total Employees</div>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
          </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
                        <Briefcase size={24} />
                    </div>
                    <div>
            <div className="text-sm text-gray-500">Departments</div>
            <div className="text-2xl font-bold">{stats.departmentStats.length}</div>
          </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-lg text-yellow-500">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Active Status</div>
                        <div className="text-2xl font-bold">100%</div>
                    </div>
                </div>
            </div>

            <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart size={20}  className="text-indigo-600"/>
                        <h2 className="text-lg font-semibold">Department Distribution</h2>
                    </div>

                    <div className="space-y-4">
                        {stats.departmentStats.map((dept, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{dept.department}</span>
                                    <span className="font-semibold">{dept.count}</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-indigo-600 rounded"
                    style={{
                      width: `${(dept.count / stats.totalEmployees) * 100}%`,
                    }}
                  ></div>
                </div>

              </div>
            ))}
                        {stats.departmentStats.length === 0 && (
                            <div className="text-center text-gray-400 py-6">
                                No data available.
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-6">Recent Activities</h2>
                    <div className="space-y-4 text-sm">
                        <div className="flex gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <div className="font-medium">New employee onboarded</div>
                                <div className="text-gray-500">Stats updated automatically</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <div className="font-medium">System sync completed</div>
                                <div className="text-gray-500">All records are up to date</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
