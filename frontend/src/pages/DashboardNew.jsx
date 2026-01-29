import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplications: 41,
    activeApplications: 24,
    interviewsScheduled: 3,
    skillsIdentified: 15,
  });

  // Mock data for charts
  const applicationTrendData = [
    { month: 'Jan', applications: 8, interviews: 2, offers: 0 },
    { month: 'Feb', applications: 12, interviews: 3, offers: 1 },
    { month: 'Mar', applications: 15, interviews: 4, offers: 1 },
    { month: 'Apr', applications: 18, interviews: 5, offers: 2 },
    { month: 'May', applications: 22, interviews: 6, offers: 3 },
    { month: 'Jun', applications: 41, interviews: 8, offers: 4 },
  ];

  const skillsData = [
    { name: 'React', value: 95 },
    { name: 'Node.js', value: 85 },
    { name: 'Python', value: 80 },
    { name: 'MongoDB', value: 75 },
    { name: 'AWS', value: 70 },
  ];

  const statusData = [
    { name: 'Applied', value: 24, color: '#3b82f6' },
    { name: 'In Review', value: 8, color: '#8b5cf6' },
    { name: 'Interview', value: 3, color: '#10b981' },
    { name: 'Offer', value: 1, color: '#f59e0b' },
    { name: 'Rejected', value: 5, color: '#ef4444' },
  ];

  const responseRateData = [
    { week: 'Week 1', rate: 45 },
    { week: 'Week 2', rate: 52 },
    { week: 'Week 3', rate: 38 },
    { week: 'Week 4', rate: 65 },
    { week: 'Week 5', rate: 58 },
    { week: 'Week 6', rate: 72 },
  ];

  return (
    <Layout>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalApplications}</p>
              <p className="text-green-400 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +12% this month
              </p>
            </div>
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Applications</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.activeApplications}</p>
              <p className="text-blue-400 text-sm mt-2">In progress</p>
            </div>
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Interviews Scheduled</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.interviewsScheduled}</p>
              <p className="text-purple-400 text-sm mt-2">Upcoming</p>
            </div>
            <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Skills Tracked</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.skillsIdentified}</p>
              <p className="text-amber-400 text-sm mt-2">Identified</p>
            </div>
            <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Application Trend Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Application Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} name="Applications" />
              <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} name="Interviews" />
              <Line type="monotone" dataKey="offers" stroke="#f59e0b" strokeWidth={2} name="Offers" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Application Status Pie Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Application Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Skills Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Top Skills Match</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Rate Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Response Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="rate" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Button 
          onClick={() => navigate('/resume')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all"
          fullWidth
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Upload Resume</span>
        </Button>

        <Button 
          onClick={() => navigate('/jobs')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all"
          fullWidth
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Application</span>
        </Button>

        <Button 
          onClick={() => navigate('/jobs')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all"
          fullWidth
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>View Applications</span>
        </Button>

        <Button 
          onClick={() => navigate('/skills')}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all"
          fullWidth
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Manage Skills</span>
        </Button>
      </div>
    </Layout>
  );
};

export default Dashboard;
