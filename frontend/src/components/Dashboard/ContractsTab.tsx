import React from 'react';
import { HiPlus, HiDocumentText, HiShieldCheck, HiEye, HiDownload, HiBadgeCheck } from 'react-icons/hi';
import type { Contract, Tenant } from './utils/types';
import { formatCurrency, formatDate, getStatusColor, getStatusText } from './utils';

interface ContractsTabProps {
  contracts: Contract[];
  tenants: Tenant[];
}

const ContractsTab: React.FC<ContractsTabProps> = ({ contracts, tenants }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Contratos</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <HiPlus className="w-4 h-4 inline mr-2" />
              Novo Contrato
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {contracts.map((contract) => {
            const tenant = tenants.find(t => t.id === contract.tenantId);
            return (
              <div key={contract.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <HiDocumentText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tenant?.name}</h3>
                      <p className="text-gray-600">{tenant?.property}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(contract.rentAmount)}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                          {getStatusText(contract.status)}
                        </span>
                        {contract.isAuthenticated && (
                          <HiBadgeCheck className="w-4 h-4 text-green-600" title="Contrato Autenticado" />
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600" title="Visualizar">
                        <HiEye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600" title="Download">
                        <HiDownload className="w-5 h-5" />
                      </button>
                      {!contract.isAuthenticated && (
                        <button className="p-2 text-gray-400 hover:text-yellow-600" title="Autenticar">
                          <HiShieldCheck className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Gerador de Contratos</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <HiDocumentText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modelo Padrão</h3>
              <p className="text-gray-600 mb-4">Use nosso modelo padrão de contrato de locação</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">Usar Modelo</button>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <HiShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Autenticação Digital</h3>
              <p className="text-gray-600 mb-4">Autentique contratos digitalmente com validade jurídica</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">Autenticar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsTab;
