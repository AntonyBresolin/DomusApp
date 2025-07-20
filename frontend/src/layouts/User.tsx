import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import { AuthService } from '../services/AuthService';
import NavbarUser from '../components/Header/NavbarUser';
import DashboardUser from '../views/DashboardUser';

const User = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await AuthService.checkAuthStatus();
        setIsAuthenticated(authStatus.authenticated);
        if (!authStatus.authenticated) {
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
      <div className='h-screen w-screen overflow-hidden bg-slate-100'>
        <NavbarUser />
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} element={DashboardUser} />} />
          {/* Outras rotas protegidas */}
        </Routes>
      </div>
    </>
  );
};

export default User;