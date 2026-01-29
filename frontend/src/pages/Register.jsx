import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { authAPI } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      await authAPI.register(userData);
      
      navigate('/login', { 
        state: { message: 'Registration successful! Please sign in.' } 
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(message);
      console.error('Registration error:', error);
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
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight text-white">Start Your Journey Today</h2>
            <p className="text-xl text-slate-400">Join thousands of professionals advancing their careers</p>
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-slate-400">Active Users</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-slate-400">Jobs Matched</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-sm text-slate-400">User Rating</div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-slate-500 text-sm">
          © 2026 Smart Career Assistant. All rights reserved.
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Fill in your details to get started</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {apiError && (
                <div className="bg-red-900/20 text-red-400 px-4 py-3 rounded-lg border border-red-800">
                  {apiError}
                </div>
              )}

              <Input
                label="Full Name"
                type="text"
                  name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />

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
                placeholder="Create a password"
                error={errors.password}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                  name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                error={errors.confirmPassword}
                required
              />

              <Button
                type="submit" 
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>

              <div className="text-center text-sm text-slate-400 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
