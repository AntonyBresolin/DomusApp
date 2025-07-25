import React from 'react';
import { HiHome, HiOfficeBuilding, HiUsers, HiBadgeCheck, HiLocationMarker } from 'react-icons/hi';
import type { Property } from './types';
import { formatCurrency } from '../utils';
import { getPropertyStatusText, getPropertyTypeText, getPropertyStatusColor } from './mockData';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (propertyId: string) => void;
  onView: (property: Property) => void;
  isListView?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onDelete,
  onView,
  isListView = false
}) => {
  const getTypeIcon = () => {
    switch (property.type) {
      case 'house':
        return <HiHome className="w-5 h-5 text-blue-600" />;
      case 'apartment':
        return <HiOfficeBuilding className="w-5 h-5 text-green-600" />;
      case 'commercial':
        return <HiBadgeCheck className="w-5 h-5 text-purple-600" />;
      default:
        return <HiHome className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          {getTypeIcon()}
          <p className="text-sm text-gray-600 mt-2">Foto da propriedade</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <HiLocationMarker className="w-4 h-4 mr-1" />
              <span className="truncate">{property.address}</span>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPropertyStatusColor(property.status)}`}>
            {getPropertyStatusText(property.status)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Tipo:</span>
            <span className="ml-2 font-medium">{getPropertyTypeText(property.type)}</span>
          </div>
          <div>
            <span className="text-gray-500">Área:</span>
            <span className="ml-2 font-medium">{property.size}m²</span>
          </div>
          {property.type !== 'commercial' && (
            <>
              <div>
                <span className="text-gray-500">Quartos:</span>
                <span className="ml-2 font-medium">{property.bedrooms}</span>
              </div>
              <div>
                <span className="text-gray-500">Banheiros:</span>
                <span className="ml-2 font-medium">{property.bathrooms}</span>
              </div>
            </>
          )}
        </div>

        {/* Rent Amount */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-600">{formatCurrency(property.rentAmount)}</span>
          <span className="text-gray-500 text-sm ml-1">/mês</span>
        </div>

        {/* Tenant Info */}
        {property.status === 'rented' && property.tenantId && (
          <div className="flex items-center text-sm text-gray-600 mb-4 p-2 bg-blue-50 rounded-lg">
            <HiUsers className="w-4 h-4 mr-2" />
            <span>Alugado para inquilino</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onView(property)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Visualizar
          </button>
          <button
            onClick={() => onEdit(property)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
