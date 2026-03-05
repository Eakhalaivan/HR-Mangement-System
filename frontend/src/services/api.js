import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = 'Bearer ' + user.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth operations
export const login = async (username, password) => {
    const response = await api.post('/auth/signin', { username, password });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
};

// Employee operations
export const getEmployees = async () => {
    const response = await api.get('/employees');
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};

export const createEmployee = async (employee) => {
    const response = await api.post('/employees', employee);
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
};

// Dashboard operations
export const getDashboardStats = async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
};

// Settings operations
export const getSettings = async () => {
    const response = await api.get('/settings');
    return response.data;
};

export const updateSettings = async (settings) => {
    const response = await api.put('/settings', settings);
    return response.data;
};

export default api;
