import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Mail,
    Briefcase,
    MapPin,
    Calendar
} from 'lucide-react';
import { getEmployees, deleteEmployee } from '../services/api';
import EmployeeForm from './EmployeeForm';
import { useAuth } from '../context/AuthContext';

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

    const getDepartmentBadge = (dept) => {
        const d = dept?.toLowerCase() || '';
        if (d.includes('eng') || d.includes('dev')) return 'badge-engineering';
        if (d.includes('hr') || d.includes('human')) return 'badge-hr';
        if (d.includes('market')) return 'badge-marketing';
        if (d.includes('sale')) return 'badge-sales';
        return 'badge-default';
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

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner">↻</div>
                Loading employees...
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Employees Directory</h1>
                    <p className="page-description">Manage your team members and their information.</p>
                </div>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <Plus size={18} />
                        Add Employee
                    </button>
                )}
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div className="form-input-with-icon" style={{ flex: 2, minWidth: '300px' }}>
                        <Search className="icon" size={18} />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search by name, email, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="form-input-with-icon" style={{ flex: 1, minWidth: '200px' }}>
                        <Filter className="icon" size={18} />
                        <select
                            className="form-input"
                            value={deptFilter}
                            onChange={(e) => setDeptFilter(e.target.value)}
                        >
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Email</th>
                                <th>Department</th>
                                {isAdmin && <th style={{ textAlign: 'right' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan={isAdmin ? "4" : "3"} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        {searchTerm || deptFilter !== 'All Departments' ? 'No matching employees found.' : 'No employees found.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>
                                            <div className="employee-name">{employee.firstName} {employee.lastName}</div>
                                        </td>
                                        <td style={{ color: 'var(--text-muted)' }}>{employee.email}</td>
                                        <td>
                                            <span className={`badge ${getDepartmentBadge(employee.department)}`}>
                                                {employee.department}
                                            </span>
                                        </td>
                                        {isAdmin && (
                                            <td style={{ textAlign: 'right' }}>
                                                <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                                                    <button className="btn-icon" onClick={() => openEditModal(employee)} title="Edit">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button className="btn-icon btn-danger" onClick={() => handleDelete(employee.id)} title="Delete">
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
