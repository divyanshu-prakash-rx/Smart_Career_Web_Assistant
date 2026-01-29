import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    activeApplications: 0,
    interviewsScheduled: 0,
    skillsIdentified: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get user info from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Fetch dashboard stats
      const statsData = await dashboardAPI.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-1">Career Assistant</h2>
          <p className="text-sm text-slate-400">Professional Dashboard</p>
        </div>
        
        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium">
            Overview
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition">
            Applications
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition">
            Resume
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition">
            Skills
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition">
            Analytics
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-700 rounded-lg p-4 mb-4">
            <p className="text-xs text-slate-400 mb-1">Signed in as</p>
            <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email || ''}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-400">Track your career progress and job applications</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">+12%</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.totalApplications}</h3>
            <p className="text-sm text-slate-400">Total Applications</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.activeApplications}</h3>
            <p className="text-sm text-slate-400">Active Applications</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2 py-1 rounded">Upcoming</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.interviewsScheduled}</h3>
            <p className="text-sm text-slate-400">Interviews Scheduled</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-500 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Tracked</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stats.skillsIdentified}</h3>
            <p className="text-sm text-slate-400">Skills Identified</p>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/resume')}
                className="flex items-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-600/30">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Upload Resume</p>
                  <p className="text-xs text-slate-400">Analyze your skills</p>
                </div>
              </button>

              <button 
                onClick={() => navigate('/jobs')}
                className="flex items-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Add Application</p>
                  <p className="text-xs text-slate-400">Track new job</p>
                </div>
              </button>

              <button 
                onClick={() => navigate('/applications')}
                className="flex items-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">View Applications</p>
                  <p className="text-xs text-slate-400">Manage pipeline</p>
                </div>
              </button>

              <button 
                onClick={() => navigate('/skills')}
                className="flex items-center gap-3 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">Manage Skills</p>
                  <p className="text-xs text-slate-400">Update profile</p>
                </div>
              </button>
            </div>
          </div>

          {/* Application Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Application Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Applied</span>
                </div>
                <span className="text-sm font-semibold text-white">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">In Review</span>
                </div>
                <span className="text-sm font-semibold text-white">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Interview</span>
                </div>
                <span className="text-sm font-semibold text-white">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Offer</span>
                </div>
                <span className="text-sm font-semibold text-white">1</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-slate-300">Rejected</span>
                </div>
                <span className="text-sm font-semibold text-white">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Application submitted to <span className="font-semibold">Google Inc.</span></p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Interview scheduled with <span className="font-semibold">Microsoft</span></p>
                <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Resume analyzed - <span className="font-semibold">15 skills</span> identified</p>
                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
