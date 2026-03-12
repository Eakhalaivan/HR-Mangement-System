import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Users
} from 'lucide-react';
import { getEmployees, deleteEmployee } from '../services/api';
import EmployeeForm from './EmployeeForm';
import { useAuth } from '../context/AuthContext';
import DotGrid from './DotGrid';

const EmployeeList = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('All Departments');

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [employees, searchTerm, deptFilter]);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = employees;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(emp =>
                emp.firstName.toLowerCase().includes(term) ||
                emp.lastName.toLowerCase().includes(term) ||
                emp.email.toLowerCase().includes(term)
            );
        }

        if (deptFilter !== 'All Departments') {
            filtered = filtered.filter(emp => emp.department === deptFilter);
        }

        setFilteredEmployees(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter((emp) => emp.id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const openAddModal = () => {
        setCurrentEmployee(null);
        setIsModalOpen(true);
    };

    const openEditModal = (employee) => {
        setCurrentEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentEmployee(null);
    };

    const handleSave = () => {
        fetchEmployees(); // Refresh list after save
        closeModal();
    };

    const departments = [
        'All Departments',
        'Engineering',
        'Human Resources',
        'Marketing',
        'Sales',
        'Finance',
        'Operations'
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-medium text-gray-500">Retrieving directory records...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg mb-8 bg-slate-900 flex items-center justify-between px-10">
                <div className="absolute inset-0">
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
                        className="opacity-40"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
                
                <div className="relative z-10">
                    <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Directory</span>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Workforce Hub</h1>
                    <p className="text-slate-400 mt-2 max-w-md font-medium">Manage your global team and organizational structure with ease.</p>
                </div>
                {isAdmin && (
                    <div className="relative z-10">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 transition-all duration-300"
                            onClick={openAddModal}
                        >
                            <Plus size={20} />
                            Add Talent
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-slate-950/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col md:flex-row gap-5 items-center group">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input
                        type="text"
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none transition-all placeholder-slate-500 text-white font-medium"
                        placeholder="Search workforce inventory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative w-full md:w-72">
                    <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <select
                        className="w-full pl-14 pr-10 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none transition-all appearance-none text-slate-300 font-bold text-sm"
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                    >
                        {departments.map(dept => (
                            <option key={dept} value={dept} className="bg-slate-900 text-white">{dept}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-950/40">
                            <tr>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Employee Profile</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contact Address</th>
                                <th className="px-10 py-5 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Departmental Unit</th>
                                {isAdmin && <th className="px-10 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Management</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan={isAdmin ? 4 : 3} className="px-8 py-20 text-center text-gray-400 italic">
                                        <Users size={48} className="mx-auto mb-4 opacity-20" />
                                        {searchTerm || deptFilter !== 'All Departments' ? 'No talent matches your current search criteria.' : 'The directory is currently empty.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 text-indigo-400 flex items-center justify-center font-black text-lg shadow-inner ring-1 ring-white/10">
                                                    {employee.firstName.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight"> {employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1)} {employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1)} </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-slate-500 font-bold text-sm tracking-tight group-hover:text-slate-300 transition-colors">{employee.email}</td>
                                        <td className="px-10 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ring-1 ring-inset ${employee.department === 'Engineering' ? 'bg-blue-500/10 text-blue-400 ring-blue-500/20' :
                                                employee.department === 'Marketing' ? 'bg-amber-500/10 text-amber-400 ring-amber-500/20' :
                                                    employee.department === 'Human Resources' ? 'bg-pink-500/10 text-pink-400 ring-pink-500/20' :
                                                    employee.department === 'Sales' ? 'bg-violet-500/10 text-violet-400 ring-violet-500/20' :
                                                    employee.department === 'Finance' ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' :
                                                    employee.department === 'Operations' ? 'bg-orange-500/10 text-orange-400 ring-orange-500/20' :
                                                        'bg-slate-500/10 text-slate-400 ring-slate-500/20'
                                                }`}>
                                                {employee.department}
                                            </span>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                    <button
                                                        className="p-2.5 text-slate-500 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5"
                                                        onClick={() => openEditModal(employee)}
                                                        title="Refactor Details"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5"
                                                        onClick={() => handleDelete(employee.id)}
                                                        title="Revoke Profile"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <EmployeeForm
                    employee={currentEmployee}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default EmployeeList;
