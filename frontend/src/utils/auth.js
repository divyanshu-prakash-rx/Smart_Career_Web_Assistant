/**
 * Get authentication token from localStorage
 * @returns {string|null} - Token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set authentication token in localStorage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Remove authentication token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Get user data from localStorage
 * @returns {object|null} - User object or null if not found
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Set user data in localStorage
 * @param {object} user - User object
 */
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
