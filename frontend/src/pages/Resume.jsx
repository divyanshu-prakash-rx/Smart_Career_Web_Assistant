import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const Resume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setUploadedFile(file);
      analyzeResume(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const analyzeResume = (file) => {
    setAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        score: 85,
        strengths: [
          'Strong technical skills section with relevant technologies',
          'Well-structured work experience with measurable achievements',
          'Clear and concise professional summary',
          'Good use of action verbs and quantified results'
        ],
        improvements: [
          'Add more specific metrics to demonstrate impact',
          'Include relevant certifications or courses',
          'Tailor keywords to match job descriptions',
          'Consider adding a projects section'
        ],
        skills: {
          detected: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker', 'Git', 'Agile'],
          missing: ['TypeScript', 'Kubernetes', 'CI/CD', 'System Design']
        },
        atsScore: 92
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Upload Section */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Resume Analysis</h2>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-500/10' 
                : 'border-slate-600 hover:border-slate-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            
            {uploadedFile ? (
              <div>
                <p className="text-green-400 font-medium mb-2">✓ {uploadedFile.name}</p>
                <p className="text-slate-400 text-sm">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <>
                <p className="text-white text-lg font-medium mb-2">Drag and drop your resume here</p>
                <p className="text-slate-400 mb-4">or</p>
              </>
            )}
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleChange}
              accept=".pdf"
            />
            <label
              htmlFor="file-upload"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors"
            >
              {uploadedFile ? 'Choose Different File' : 'Browse Files'}
            </label>
            <p className="text-slate-500 text-sm mt-4">Supports: PDF (Max 5MB)</p>
          </div>
        </div>

        {/* Analysis Results */}
        {analyzing && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white text-lg">Analyzing your resume...</p>
            <p className="text-slate-400 text-sm mt-2">This may take a few moments</p>
          </div>
        )}

        {analysis && !analyzing && (
          <div className="space-y-6">
            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Overall Score</h3>
                  <span className={`text-3xl font-bold ${analysis.score >= 80 ? 'text-green-400' : analysis.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {analysis.score}/100
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all ${analysis.score >= 80 ? 'bg-green-500' : analysis.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${analysis.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">ATS Compatibility</h3>
                  <span className="text-3xl font-bold text-green-400">{analysis.atsScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-green-500 transition-all"
                    style={{ width: `${analysis.atsScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Strengths
              </h3>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Suggested Improvements
              </h3>
              <ul className="space-y-3">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <span className="text-yellow-400 mr-2">→</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Detected Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.detected.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm border border-green-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Recommended Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.missing.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-sm border border-amber-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3">
                Download Optimized Resume
              </Button>
              <Button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3">
                Get Detailed Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resume;
