import React, { useState, useEffect } from 'react';
import { HiPlus, HiViewGrid, HiViewList, HiSearch, HiFilter } from 'react-icons/hi';
import type { Property, PropertyFormData } from './types';
import PropertyCard from './PropertyCard';
import PropertyFormModal from './PropertyFormModal';
import PropertyDetailsModal from './PropertyDetailsModal';
import houseService, { HouseService } from '../../../services/HouseService';
import type { House } from '../../../services/HouseService';

interface PropertyListViewProps {
  className?: string;
}

const PropertyListView: React.FC<PropertyListViewProps> = ({ className = '' }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'rented' | 'maintenance'>('all');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const houses = await houseService.getHousesByOwner();
      const convertedProperties = houses.map((house: House) => HouseService.convertToFrontendProperty(house));
      setProperties(convertedProperties);
    } catch (err) {
      console.error('Erro ao carregar propriedades:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar propriedades');
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormModalOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsFormModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta propriedade?')) {
      setProperties(properties.filter(p => p.id !== propertyId));
    }
  };

  const handleFormSubmit = async (formData: PropertyFormData) => {
    try {
      if (editingProperty) {
        const updatedProperty: Property = {
          ...editingProperty,
          ...formData,
          updatedAt: new Date().toISOString()
        };
        setProperties(properties.map(p => 
          p.id === editingProperty.id ? updatedProperty : p
        ));
      } else {
        const houseData = HouseService.convertToBackendFormat(formData);
        await houseService.createHouse(houseData);
        
        await loadProperties();
      }
      setIsFormModalOpen(false);
      setEditingProperty(null);
    } catch (err) {
      console.error('Erro ao salvar propriedade:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar propriedade');
    }
  };

  const getStatusCount = (status: string) => {
    return properties.filter(p => p.status === status).length;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Minhas Propriedades</h2>
          <p className="text-gray-600">Gerencie suas propriedades para aluguel</p>
        </div>
        <button
          onClick={handleAddProperty}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <HiPlus className="w-5 h-5 mr-2" />
          Nova Propriedade
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiViewGrid className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disponíveis</p>
              <p className="text-2xl font-bold text-green-600">{getStatusCount('available')}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <HiViewGrid className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Alugadas</p>
              <p className="text-2xl font-bold text-blue-600">{getStatusCount('rented')}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HiViewGrid className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Manutenção</p>
              <p className="text-2xl font-bold text-orange-600">{getStatusCount('maintenance')}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <HiViewGrid className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Carregando propriedades...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erro ao carregar propriedades</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={loadProperties}
                className="mt-2 text-sm text-red-800 hover:text-red-600 font-medium"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar propriedades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <HiFilter className="text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="available">Disponível</option>
              <option value="rented">Alugada</option>
              <option value="maintenance">Manutenção</option>
            </select>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <HiViewGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <HiViewList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      )}

      {!loading && !error && (
        filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <HiViewGrid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma propriedade encontrada</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Tente ajustar os filtros de busca' 
              : 'Comece adicionando sua primeira propriedade'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={handleAddProperty}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <HiPlus className="w-5 h-5 mr-2" />
              Adicionar Propriedade
            </button>
          )}
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={handleViewProperty}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
              isListView={viewMode === 'list'}
            />
          ))}
        </div>
        )
      )}

      <PropertyFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProperty(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingProperty}
      />

      <PropertyDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedProperty(null);
        }}
        property={selectedProperty}
        onEdit={handleEditProperty}
      />
    </div>
  );
};

export default PropertyListView;
