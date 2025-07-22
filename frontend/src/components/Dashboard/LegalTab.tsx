import React from 'react';
import { HiExclamation, HiBell, HiDocumentText } from 'react-icons/hi';
import { HiEnvelope } from 'react-icons/hi2';
import type { Tenant } from './utils/types';

interface LegalTabProps {
  tenants: Tenant[];
}

const LegalTab: React.FC<LegalTabProps> = ({ tenants }) => {
  const lateTenants = tenants.filter(t => t.paymentStatus === 'late');
  const pendingTenants = tenants.filter(t => t.paymentStatus === 'pending');

  return (
    <div className="space-y-6">
      {/* Legal Actions Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Ações Legais</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HiExclamation className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900">Ordem de Despejo</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Emita automaticamente uma ordem de despejo para inquilinos em atraso
              </p>
              <div className="space-y-3">
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent">
                  <option>Selecionar inquilino</option>
                  {lateTenants.map(tenant => (
                    <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                  ))}
                </select>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Gerar Ordem de Despejo
                </button>
              </div>
            </div>

            <div className="border border-orange-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HiBell className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-900">Notificação de Pagamento</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Envie notificação automática para inquilinos com pagamento pendente
              </p>
              <div className="space-y-3">
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent">
                  <option>Selecionar inquilino</option>
                  {pendingTenants.map(tenant => (
                    <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                  ))}
                </select>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                  Enviar Notificação
                </button>
              </div>
            </div>

            <div className="border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HiDocumentText className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Pequenas Causas</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Emita processo para pequenas causas com um clique
              </p>
              <div className="space-y-3">
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                  <option>Selecionar inquilino</option>
                  {lateTenants.map(tenant => (
                    <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                  ))}
                </select>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Emitir Processo
                </button>
              </div>
            </div>

            <div className="border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <HiEnvelope className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Comunicação</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Envie comunicados e notificações para seus inquilinos
              </p>
              <div className="space-y-3">
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent">
                  <option>Todos os inquilinos</option>
                  {tenants.map(tenant => (
                    <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                  ))}
                </select>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Enviar Comunicado
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Histórico de Ações</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <HiExclamation className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Ordem de despejo enviada para Carlos Oliveira
                </p>
                <p className="text-xs text-gray-500">Há 2 dias</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Pendente
              </span>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <HiBell className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Notificação de pagamento enviada para Maria Santos
                </p>
                <p className="text-xs text-gray-500">Há 1 semana</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Concluído
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalTab;
