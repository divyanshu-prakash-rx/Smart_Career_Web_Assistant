import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashboardNew';
import Resume from './pages/Resume';
import Jobs from './pages/Jobs';
import Skills from './pages/Skills';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume" 
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jobs" 
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/skills" 
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect root to dashboard or login */}
        <Route 
          path="/" 
          element={
            localStorage.getItem('token') ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
