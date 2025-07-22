import React, { useState, useRef, useEffect } from 'react';
import { HiBell, HiLogout, HiUser, HiCog } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userEmail?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Dashboard Locador",
  subtitle = "Gerencie seus imóveis e inquilinos",
  userName = "AD",
  userEmail = "admin@domusapp.com"
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <HiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="text-white font-semibold text-sm">{userName}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{userName}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Locador</p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <HiUser className="w-4 h-4 mr-3 text-gray-400" />
                      Meu Perfil
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <HiCog className="w-4 h-4 mr-3 text-gray-400" />
                      Configurações
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <HiLogout className="w-4 h-4 mr-3" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
