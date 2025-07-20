import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  element: React.ComponentType<Record<string, unknown>>;
  [key: string]: unknown;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  element: Element, 
  ...rest 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;