import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import { AuthService } from '../services/AuthService';
import DashboardUser from '../views/DashboardUser';

const User = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await AuthService.checkAuthStatus();
        setIsAuthenticated(authStatus.isAuthenticated);
        if (!authStatus.isAuthenticated) {
          navigate('/');
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='h-screen w-screen overflow-x-hidden bg-slate-100'>
        <Routes>
          <Route path="/" element={<PrivateRoute element={DashboardUser} />} />
          {/* Outras rotas protegidas */}
        </Routes>
      </div>
    </>
  );
};

export default User;