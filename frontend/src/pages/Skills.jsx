import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const technicalSkills = [
    { name: 'React', level: 95, category: 'Frontend', demand: 'High', trend: '+8%' },
    { name: 'Node.js', level: 85, category: 'Backend', demand: 'High', trend: '+5%' },
    { name: 'Python', level: 80, category: 'Backend', demand: 'Very High', trend: '+12%' },
    { name: 'MongoDB', level: 75, category: 'Database', demand: 'Medium', trend: '+3%' },
    { name: 'AWS', level: 70, category: 'Cloud', demand: 'Very High', trend: '+15%' },
    { name: 'Docker', level: 65, category: 'DevOps', demand: 'High', trend: '+10%' },
    { name: 'TypeScript', level: 90, category: 'Language', demand: 'High', trend: '+7%' },
    { name: 'Git', level: 85, category: 'Tools', demand: 'High', trend: '+2%' },
  ];

  const softSkills = [
    { skill: 'Communication', A: 85 },
    { skill: 'Leadership', A: 75 },
    { skill: 'Problem Solving', A: 90 },
    { skill: 'Teamwork', A: 80 },
    { skill: 'Time Management', A: 70 },
    { skill: 'Adaptability', A: 85 },
  ];

  const industryDemand = [
    { skill: 'React', market: 95, your: 95 },
    { skill: 'Python', market: 92, your: 80 },
    { skill: 'AWS', market: 88, your: 70 },
    { skill: 'TypeScript', market: 85, your: 90 },
    { skill: 'Docker', market: 75, your: 65 },
  ];

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-green-400';
      case 'High': return 'text-blue-400';
      case 'Medium': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Skills Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Technical Skills</h3>
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">{technicalSkills.length}</p>
            <p className="text-green-400 text-sm mt-2">+2 this month</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Avg Proficiency</h3>
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">81%</p>
            <p className="text-purple-400 text-sm mt-2">Above average</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Market Alignment</h3>
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">88%</p>
            <p className="text-green-400 text-sm mt-2">Excellent match</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'technical', label: 'Technical Skills' },
            { id: 'soft', label: 'Soft Skills' },
            { id: 'demand', label: 'Market Demand' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Technical Skills */}
        {activeTab === 'technical' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Skill
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">{skill.category}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`${getDemandColor(skill.demand)} font-medium`}>
                          {skill.demand} Demand
                        </span>
                        <span className="text-green-400">{skill.trend}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-indigo-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {activeTab === 'soft' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Soft Skills Analysis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-6">Skills Radar</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={softSkills}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis dataKey="skill" stroke="#94a3b8" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                    <Radar name="Your Skills" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {softSkills.map((skill, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">{skill.skill}</h4>
                      <span className="text-purple-400 font-bold">{skill.A}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500 transition-all"
                        style={{ width: `${skill.A}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Market Demand */}
        {activeTab === 'demand' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Market Demand Analysis</h2>
            
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Your Skills vs Market Demand</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={industryDemand}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="skill" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="market" fill="#3b82f6" name="Market Demand" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="your" fill="#10b981" name="Your Proficiency" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Top Strengths
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-slate-300">
                    <span>React Development</span>
                    <span className="text-green-400 font-semibold">95%</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-300">
                    <span>TypeScript</span>
                    <span className="text-green-400 font-semibold">90%</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-300">
                    <span>Node.js</span>
                    <span className="text-green-400 font-semibold">85%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Growth Opportunities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-slate-300">
                    <span>AWS (High Demand)</span>
                    <span className="text-yellow-400 font-semibold">+18%</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-300">
                    <span>Python (Very High)</span>
                    <span className="text-yellow-400 font-semibold">+12%</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-300">
                    <span>Docker (High Demand)</span>
                    <span className="text-yellow-400 font-semibold">+10%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Skills;
