import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Resume APIs
export const resumeAPI = {
  upload: async (formData) => {
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  analyze: async (resumeId) => {
    const response = await api.post(`/resume/analyze/${resumeId}`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  getById: async (resumeId) => {
    const response = await api.get(`/resume/${resumeId}`);
    return response.data;
  },

  delete: async (resumeId) => {
    const response = await api.delete(`/resume/${resumeId}`);
    return response.data;
  },
};

// Job Application APIs
export const jobAPI = {
  create: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  getAll: async (filters = {}) => {
    const response = await api.get('/jobs', { params: filters });
    return response.data;
  },

  getById: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },

  update: async (jobId, jobData) => {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  delete: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  },

  updateStatus: async (jobId, status) => {
    const response = await api.patch(`/jobs/${jobId}/status`, { status });
    return response.data;
  },
};

// Skills APIs
export const skillsAPI = {
  getAll: async () => {
    const response = await api.get('/skills');
    return response.data;
  },

  getUserSkills: async () => {
    const response = await api.get('/skills/user');
    return response.data;
  },

  addSkill: async (skillData) => {
    const response = await api.post('/skills', skillData);
    return response.data;
  },

  deleteSkill: async (skillId) => {
    const response = await api.delete(`/skills/${skillId}`);
    return response.data;
  },
};

// Dashboard/Analytics APIs
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getApplicationProgress: async () => {
    const response = await api.get('/dashboard/progress');
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await api.get('/dashboard/activity');
    return response.data;
  },
};

export default api;
