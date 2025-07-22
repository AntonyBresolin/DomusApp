import React from 'react';
import { HiWifi, HiLightningBolt } from 'react-icons/hi';
import type { Utility } from './utils/types';
import { formatCurrency, getStatusColor, getStatusText } from './utils';

interface UtilitiesTabProps {
  utilities: Utility[];
}

const UtilitiesTab: React.FC<UtilitiesTabProps> = ({ utilities }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Status de Utilidades</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {utilities.map((utility) => (
              <div key={utility.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {utility.type === 'water' ? 
                      <HiWifi className="w-6 h-6 text-blue-600" /> :
                      <HiLightningBolt className="w-6 h-6 text-yellow-600" />
                    }
                    <h3 className="text-lg font-semibold text-gray-900">
                      {utility.type === 'water' ? 'Água' : 'Energia Elétrica'}
                    </h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(utility.status)}`}>
                    {getStatusText(utility.status)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leitura Atual:</span>
                    <span className="font-medium">{utility.currentReading}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leitura Anterior:</span>
                    <span className="font-medium">{utility.lastReading}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumo:</span>
                    <span className="font-medium">{utility.consumption} {utility.type === 'water' ? 'm³' : 'kWh'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor:</span>
                    <span className="font-bold text-lg">{formatCurrency(utility.amount)}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Transferir Automaticamente
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Configurações de Transferência</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Transferência Automática</h3>
                <p className="text-gray-600">Transferir automaticamente valores de água e luz para inquilinos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilitiesTab;
