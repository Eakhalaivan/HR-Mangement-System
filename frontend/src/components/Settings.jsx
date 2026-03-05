import React, { useState, useEffect } from 'react';
import { Save, Database, Shield, Monitor } from 'lucide-react';
import { getSettings, updateSettings } from '../services/api';

const Settings = () => {
    const [appSettings, setAppSettings] = useState({
        systemName: '',
        adminEmail: '',
        persistenceMode: 'H2 (Development)',
        theme: 'Modern Light',
        notifications: true
    });

    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await getSettings();
            setAppSettings(data);
        } catch (err) {
            console.error('Error fetching settings:', err);
            setError('Failed to load settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaved(false);
        setError('');

        try {
            await updateSettings(appSettings);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Error saving settings:', err);
            setError('Failed to save settings.');
        }
    };

    if (loading) {
        return <div className="loading">Loading system settings...</div>;
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">System Settings</h1>
                    <p className="page-description">Configure your HR Management System.</p>
                </div>
            </div>

            <div className="card" style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                    {error && (
                        <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                                <Monitor size={18} color="var(--primary)" />
                                General Configuration
                            </h3>

                            <div className="form-group">
                                <label className="form-label">System Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={appSettings.systemName}
                                    onChange={(e) => setAppSettings({ ...appSettings, systemName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Admin Email</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    value={appSettings.adminEmail}
                                    onChange={(e) => setAppSettings({ ...appSettings, adminEmail: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                                <Database size={18} color="var(--primary)" />
                                Data Persistence
                            </h3>

                            <div className="form-group">
                                <label className="form-label">Database Type</label>
                                <select
                                    className="form-input"
                                    value={appSettings.persistenceMode}
                                    onChange={(e) => setAppSettings({ ...appSettings, persistenceMode: e.target.value })}
                                >
                                    <option>H2 (Development)</option>
                                    <option>MySQL (Production)</option>
                                    <option>PostgreSQL</option>
                                </select>
                            </div>

                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    checked={appSettings.notifications}
                                    onChange={(e) => setAppSettings({ ...appSettings, notifications: e.target.checked })}
                                />
                                <label htmlFor="notifications" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>Enable email notifications</label>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontSize: '0.875rem' }}>
                            {saved && (
                                <>
                                    <Shield size={16} />
                                    Changes saved successfully!
                                </>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Save size={18} />
                            Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
