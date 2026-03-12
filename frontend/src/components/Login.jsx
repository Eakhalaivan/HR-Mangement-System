import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/api'
import DotGrid from './DotGrid'

const Login = () => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const { login:authLogin } = useAuth()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError('')
    setLoading(true)

    try{
      const data = await login(username,password)
      authLogin(data)
    }catch(err){
      setError("Invalid username or password")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-radial-[at_50%_50%,#111_0%,#050505_100%]">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#333"
          activeColor="#6366F1"
          proximity={150}
          shockRadius={300}
          shockStrength={8}
          resistance={800}
          returnDuration={2}
        />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/20 blur-[120px] rounded-full"></div>

      {/* Login Card */}
      <div className="w-full max-w-md px-6 z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-10 md:p-12">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-400 font-medium">
              Enter your credentials to access your portal
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl mb-8 text-sm font-medium border border-red-500/20 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Username
              </label>

              <input
                type="text"
                placeholder="john_doe"
                className="w-full px-5 py-4 bg-white/[0.05] rounded-2xl border border-white/10 text-white placeholder-gray-600 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-white/[0.05] rounded-2xl border border-white/10 text-white placeholder-gray-600 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-2xl shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.5)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </span>
            </button>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Powered by <span className="text-gray-400 font-semibold italic">HR Management System</span>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login;