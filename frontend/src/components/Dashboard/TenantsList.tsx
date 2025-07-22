import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import type { Tenant } from './utils/types';
import { formatCurrency, formatDate, getStatusColor, getStatusText } from './utils';

interface TenantsListProps {
  tenants: Tenant[];
  onTenantClick?: (tenantId: string) => void;
}

const TenantsList: React.FC<TenantsListProps> = ({ tenants, onTenantClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Inquilinos</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{tenant.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                  <p className="text-gray-600">{tenant.property}</p>
                  <p className="text-sm text-gray-500">Vence: {formatDate(tenant.dueDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(tenant.rentAmount + tenant.utilitiesAmount)}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tenant.paymentStatus)}`}>
                    {getStatusText(tenant.paymentStatus)}
                  </span>
                </div>
                <button 
                  onClick={() => onTenantClick?.(tenant.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantsList;
