import React, { useState, useEffect } from 'react';
import { Save, Database, Shield, Monitor, CheckCircle, AlertCircle } from 'lucide-react';
import { getSettings, updateSettings } from '../services/api';
import DotGrid from './DotGrid';

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
            setError('Failed to load settings. Please try again.');
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
            setError('Failed to record system updates.');
        }
    };

    const ConfigSection = ({ title, icon: Icon, children, description }) => (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-[2rem] p-10 space-y-8 hover:bg-white/[0.07] transition-all duration-300 group/section">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                    <Icon size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                    <p className="text-sm font-medium text-slate-500">{description}</p>
                </div>
            </div>
            <div className="space-y-5">
                {children}
            </div>
        </div>
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-400">
            <Monitor size={48} className="animate-pulse text-indigo-300 mb-4" />
            <p className="font-medium">Synching system parameters...</p>
        </div>
    );

    return (
         
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
            
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg bg-slate-900 flex items-center px-10">
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
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                
                <div className="relative z-10">
                    <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Configuration</span>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">System Controls</h1>
                    <p className="text-slate-400 mt-2 max-w-md font-medium">Fine-tune your organizational parameters and system infrastructure.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 max-w-6xl">
                {error && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ConfigSection
                        title="Branding & Access"
                        icon={Monitor}
                        description="Identify your workspace and maintain administrator contact."
                    >
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">System Label</label>
                            <input
                               className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-slate-950/40 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none transition-all placeholder-slate-600 text-white font-bold"
                                value={appSettings.systemName}
                                onChange={(e) => setAppSettings({ ...appSettings, systemName: e.target.value })}
                                required
                                placeholder="HR Pro Enterprise"
                                />
                        </div>

                        <div className="space-y-3">
                           <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">
                Administrator Email</label>
                            <input
                                className="w-full px-5 py-4 rounded-2xl border border-white/5 bg-slate-950/40 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none transition-all placeholder-slate-600 text-white font-bold"
                                value={appSettings.adminEmail}
                                onChange={(e) => setAppSettings({ ...appSettings, adminEmail: e.target.value })}
                                required
                                placeholder="admin@hrpro.com"
                            />
                        </div>
                    </ConfigSection>

                    <ConfigSection
                        title="Architecture"
                        icon={Database}
                        description="Manage data persistence and communication protocols."
                    >
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Persistence Engine</label>
                            <div className="relative">
                                <select
                                    className="w-full pl-5 pr-12 py-4 bg-slate-950/40 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none transition-all appearance-none text-slate-200 font-bold text-sm"
                                    value={appSettings.persistenceMode}
                                    onChange={(e) => setAppSettings({ ...appSettings, persistenceMode: e.target.value })}
                                >
                                    <option className="bg-slate-900">H2 (Development)</option>
                                    <option className="bg-slate-900">MySQL (Production)</option>
                                    <option className="bg-slate-900">PostgreSQL</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 px-2">
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    className="sr-only peer"
                                    checked={appSettings.notifications}
                                    onChange={(e) => setAppSettings({ ...appSettings, notifications: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                <label htmlFor="notifications" className="ml-3 text-sm font-bold text-gray-700 cursor-pointer">Broadcast Alerts</label>
                            </div>
                        </div>
                    </ConfigSection>
                </div>

                <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-xl px-10 py-8 rounded-[2rem] border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-3">
                        {saved && (
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full animate-bounce">
                                <CheckCircle size={18} />
                                Configuration Hardened
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-indigo-200 transform hover:-translate-y-1 transition-all"
                    >
                        <Save size={20} />
                        Deploy Updates
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
