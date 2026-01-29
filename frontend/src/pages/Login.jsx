import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { authAPI } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDemoLogin = () => {
    // Demo account credentials
    setFormData({
      email: 'demo@smartcareer.com',
      password: 'demo123'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // For demo purposes, bypass API and login directly with demo account
      if (formData.email === 'demo@smartcareer.com' && formData.password === 'demo123') {
        const demoUser = {
          name: 'Demo User',
          email: 'demo@smartcareer.com',
          id: 'demo-001'
        };
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(demoUser));
        navigate('/dashboard');
        return;
      }

      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setApiError(message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-800 border-r border-slate-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-3xl font-bold text-white ml-3">Smart Career Assistant</h1>
          </div>
          <div className="space-y-6 text-slate-300">
            <h2 className="text-4xl font-bold leading-tight text-white">Welcome Back!</h2>
            <p className="text-xl text-slate-400">Manage your career journey with AI-powered insights</p>
            <div className="space-y-4 pt-8">
              <div className="flex items-start bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI-Powered Resume Analysis</h3>
                  <p className="text-sm text-slate-400">Get instant feedback and optimization suggestions</p>
                </div>
              </div>
              <div className="flex items-start bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Smart Job Matching</h3>
                  <p className="text-sm text-slate-400">Find opportunities that match your skills</p>
                </div>
              </div>
              <div className="flex items-start bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Career Progress Tracking</h3>
                  <p className="text-sm text-slate-400">Monitor applications and interview progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-slate-500 text-sm">
          © 2026 Smart Career Assistant. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-slate-400">Enter your credentials to access your account</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl">
            {/* Demo Account Banner */}
            <div className="mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-indigo-300 font-medium text-sm mb-1">Try Demo Account</p>
                  <p className="text-slate-400 text-xs">Email: demo@smartcareer.com | Password: demo123</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {apiError && (
                <div className="bg-red-900/20 text-red-400 px-4 py-3 rounded-lg border border-red-800">
                  {apiError}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
              />

              <Input
                label="Password"
                type="password"
                name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
              />

              <div className="space-y-3">
                <Button 
                  type="submit" 
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-300 border border-indigo-500/30 rounded-lg font-medium transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Use Demo Account
                </button>
              </div>

              <div className="text-center text-sm text-slate-400 mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
