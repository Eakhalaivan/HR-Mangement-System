import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log('Attempting login for:', username);
        try {
            const data = await login(username, password);
            console.log('Login successful:', data);
            authLogin(data);
        } catch (err) {
            console.error('Login error details:', err);
            if (err.response) {
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                setError(err.response.data.message || 'Error: ' + err.response.status);
            } else if (err.request) {
                console.error('No response received from server. Is the backend running at http://localhost:8081?');
                setError('Cannot reach backend server. Please check if it is running.');
            } else {
                setError('Error setting up request: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--primary-color)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'white'
                    }}>
                        <LogIn size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Please enter your details to sign in</p>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem', height: '48px' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Don't have an account? Contact your administrator.
                </p>
            </div>
        </div>
    );
};

export default Login;
