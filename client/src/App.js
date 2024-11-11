import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/profile" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
