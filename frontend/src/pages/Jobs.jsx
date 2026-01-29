import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';

const Jobs = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const jobs = [
    { id: 1, company: 'Google', position: 'Senior Frontend Developer', status: 'interview', appliedDate: '2026-01-10', salary: '$140k-$180k', location: 'Mountain View, CA', type: 'Remote' },
    { id: 2, company: 'Microsoft', position: 'Full Stack Engineer', status: 'in-review', appliedDate: '2026-01-15', salary: '$130k-$170k', location: 'Redmond, WA', type: 'Hybrid' },
    { id: 3, company: 'Amazon', position: 'Software Development Engineer', status: 'applied', appliedDate: '2026-01-18', salary: '$135k-$175k', location: 'Seattle, WA', type: 'On-site' },
    { id: 4, company: 'Meta', position: 'React Developer', status: 'offer', appliedDate: '2026-01-05', salary: '$145k-$185k', location: 'Menlo Park, CA', type: 'Remote' },
    { id: 5, company: 'Netflix', position: 'UI/UX Engineer', status: 'rejected', appliedDate: '2026-01-12', salary: '$140k-$180k', location: 'Los Gatos, CA', type: 'Remote' },
    { id: 6, company: 'Apple', position: 'Software Engineer', status: 'applied', appliedDate: '2026-01-20', salary: '$150k-$190k', location: 'Cupertino, CA', type: 'On-site' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-review': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'interview': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'offer': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.status === filter);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'All', count: jobs.length, filter: 'all', color: 'bg-slate-600' },
            { label: 'Applied', count: jobs.filter(j => j.status === 'applied').length, filter: 'applied', color: 'bg-blue-600' },
            { label: 'In Review', count: jobs.filter(j => j.status === 'in-review').length, filter: 'in-review', color: 'bg-purple-600' },
            { label: 'Interview', count: jobs.filter(j => j.status === 'interview').length, filter: 'interview', color: 'bg-green-600' },
            { label: 'Offers', count: jobs.filter(j => j.status === 'offer').length, filter: 'offer', color: 'bg-amber-600' },
          ].map((item) => (
            <button
              key={item.filter}
              onClick={() => setFilter(item.filter)}
              className={`p-4 rounded-xl border transition-all ${
                filter === item.filter
                  ? `${item.color} border-transparent text-white`
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="text-2xl font-bold">{item.count}</div>
              <div className="text-sm opacity-90">{item.label}</div>
            </button>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Job Applications</h2>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Application
          </Button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">{job.position}</h3>
                    <span className={`px-3 py-1 rounded-lg text-sm border ${getStatusColor(job.status)}`}>
                      {job.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {job.type}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-green-400 font-semibold">{job.salary}</span>
                    </div>
                    <div className="text-slate-500 text-sm">
                      Applied: {new Date(job.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No applications found</h3>
            <p className="text-slate-400">Add your first job application to get started</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
