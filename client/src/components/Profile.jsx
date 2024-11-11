import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, fetchProfile, logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p>Email: {user.email}</p>
        <p>Created At: {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 w-full mt-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;