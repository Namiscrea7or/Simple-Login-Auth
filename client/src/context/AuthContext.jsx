import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await authService.getProfile(token);
        setUser(res.user);
      } catch (error) {
        console.error('Unauthorized or session expired');
        window.alert('Failed to load profile. Please login again.');
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem('token', res.accessToken);
      setUser({ email: res.email });
      window.alert('Login successful');
      navigate('/profile');
    } catch (error) {
      console.error(error.message || 'Login failed');
      window.alert(error.message || 'Login failed. Please try again.');
    }
  };

  const register = async (email, password) => {
    try {
      await authService.register({ email, password });
      window.alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error(error.message || 'Registration failed');
      window.alert(error.message || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
