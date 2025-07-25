import React from 'react';
import { HiX, HiHome, HiOfficeBuilding, HiBadgeCheck, HiLocationMarker, HiUsers } from 'react-icons/hi';
import type { Property } from './types';
import { formatCurrency } from '../utils';
import { getPropertyStatusText, getPropertyTypeText, getPropertyStatusColor } from './mockData';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onEdit: (property: Property) => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  isOpen,
  onClose,
  property,
  onEdit
}) => {
  if (!isOpen || !property) return null;

  const getTypeIcon = () => {
    switch (property.type) {
      case 'house':
        return <HiHome className="w-6 h-6 text-blue-600" />;
      case 'apartment':
        return <HiOfficeBuilding className="w-6 h-6 text-green-600" />;
      case 'commercial':
        return <HiBadgeCheck className="w-6 h-6 text-purple-600" />;
      default:
        return <HiHome className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {getTypeIcon()}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{property.name}</h2>
                <p className="text-gray-600">{getPropertyTypeText(property.type)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPropertyStatusColor(property.status)}`}>
                {getPropertyStatusText(property.status)}
              </span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Image placeholder */}
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {getTypeIcon()}
                    <p className="text-sm text-gray-600 mt-2">Imagens da propriedade</p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Informações Básicas</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <HiLocationMarker className="w-4 h-4 mr-2" />
                      <span>{property.address}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <span className="text-sm text-gray-500">Área</span>
                        <p className="font-semibold">{property.size}m²</p>
                      </div>
                      {property.type !== 'commercial' && (
                        <>
                          <div>
                            <span className="text-sm text-gray-500">Quartos</span>
                            <p className="font-semibold">{property.bedrooms}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Banheiros</span>
                            <p className="font-semibold">{property.bathrooms}</p>
                          </div>
                        </>
                      )}
                      <div>
                        <span className="text-sm text-gray-500">Valor do Aluguel</span>
                        <p className="font-semibold text-blue-600 text-lg">{formatCurrency(property.rentAmount)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {property.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Tenant Info */}
                {property.status === 'rented' && property.tenantId && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <HiUsers className="w-5 h-5 mr-2" />
                      Inquilino Atual
                    </h3>
                    <p className="text-gray-600">Esta propriedade está alugada</p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium mt-2">
                      Ver detalhes do inquilino
                    </button>
                  </div>
                )}

                {/* Features */}
                {property.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Utilities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Utilidades Incluídas</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(property.utilities).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={`text-sm ${value ? 'text-gray-900' : 'text-gray-500'}`}>
                          {key === 'water' ? 'Água' :
                           key === 'electricity' ? 'Luz' :
                           key === 'gas' ? 'Gás' : 'Internet'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Datas</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Criado em:</span>
                      <p className="font-medium">{new Date(property.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Última atualização:</span>
                      <p className="font-medium">{new Date(property.updatedAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => onEdit(property)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Editar Propriedade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
