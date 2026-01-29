import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Full Stack Developer',
    bio: 'Passionate software engineer with 5+ years of experience in building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev',
    experience: '5+ years',
    availability: 'Immediately',
    expectedSalary: '$140k - $180k',
  });

  const handleSave = () => {
    setEditing(false);
    // API call to save profile
  };

  const stats = [
    { label: 'Profile Views', value: '1,234', change: '+12%', color: 'text-blue-400' },
    { label: 'Applications', value: '41', change: '+8%', color: 'text-purple-400' },
    { label: 'Response Rate', value: '68%', change: '+5%', color: 'text-green-400' },
    { label: 'Interviews', value: '8', change: '+3', color: 'text-amber-400' },
  ];

  const activityLog = [
    { action: 'Updated resume', time: '2 hours ago', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { action: 'Applied to Google - Senior Frontend Developer', time: '5 hours ago', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { action: 'Added new skill: TypeScript', time: '1 day ago', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { action: 'Profile viewed by Microsoft recruiter', time: '2 days ago', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-slate-800 flex items-center justify-center text-white text-4xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                {!editing && (
                  <button className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full border-4 border-slate-800 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="ml-6 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{profile.name}</h1>
                    <p className="text-xl text-slate-300 mb-2">{profile.title}</p>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {profile.experience}
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => editing ? handleSave() : setEditing(true)}
                    className={`${editing ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg flex items-center`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {editing ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      )}
                    </svg>
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className={`${stat.color} text-sm font-medium`}>{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="Job Title"
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="Expected Salary"
                  value={profile.expectedSalary}
                  onChange={(e) => setProfile({...profile, expectedSalary: e.target.value})}
                  disabled={!editing}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!editing}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">Social Links</h2>
              <div className="space-y-4">
                <Input
                  label="LinkedIn"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="GitHub"
                  value={profile.github}
                  onChange={(e) => setProfile({...profile, github: e.target.value})}
                  disabled={!editing}
                />
                <Input
                  label="Website"
                  value={profile.website}
                  onChange={(e) => setProfile({...profile, website: e.target.value})}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>

          {/* Activity & Settings */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.action}</p>
                      <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-slate-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span className="text-white font-medium">Change Password</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-slate-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="text-white font-medium">Notifications</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-slate-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-white font-medium">Privacy Settings</span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
