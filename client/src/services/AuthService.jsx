const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return await response.json();
  } catch (error) {
    window.alert(error.message || 'An error occurred during registration.');
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    window.alert(error.message || 'An error occurred during login.');
    throw error;
  }
};

const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    return await response.json();
  } catch (error) {
    window.alert(error.message || 'Failed to load profile data.');
    throw error;
  }
};

export default { register, login, getProfile };
