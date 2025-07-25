import type { Property } from './types';

// Mock data for properties
export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Casa das Flores',
    address: 'Rua das Flores, 123, Centro, Toledo - PR',
    type: 'house',
    size: 120,
    bedrooms: 3,
    bathrooms: 2,
    rentAmount: 1200,
    status: 'rented',
    description: 'Casa ampla com quintal, ideal para famílias. Localizada em bairro residencial tranquilo.',
    images: ['/placeholder-house1.jpg', '/placeholder-house2.jpg'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    tenantId: '1',
    features: ['Quintal', 'Garagem', 'Área de serviço', 'Churrasqueira'],
    utilities: {
      water: true,
      electricity: true,
      gas: true,
      internet: false
    }
  },
  {
    id: '2',
    name: 'Apartamento Central',
    address: 'Av. Central, 456, Apt 302, Centro, Toledo - PR',
    type: 'apartment',
    size: 75,
    bedrooms: 2,
    bathrooms: 1,
    rentAmount: 850,
    status: 'rented',
    description: 'Apartamento moderno no centro da cidade, próximo a comércios e serviços.',
    images: ['/placeholder-apt1.jpg'],
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01',
    tenantId: '2',
    features: ['Elevador', 'Portaria 24h', 'Área comum'],
    utilities: {
      water: true,
      electricity: true,
      gas: false,
      internet: true
    }
  },
  {
    id: '3',
    name: 'Casa do Sol',
    address: 'Rua do Sol, 789, Jardim América, Toledo - PR',
    type: 'house',
    size: 150,
    bedrooms: 4,
    bathrooms: 3,
    rentAmount: 1500,
    status: 'available',
    description: 'Casa espaçosa com área de lazer completa, piscina e jardim.',
    images: ['/placeholder-house3.jpg', '/placeholder-house4.jpg'],
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
    features: ['Piscina', 'Área gourmet', 'Jardim', 'Garagem para 2 carros'],
    utilities: {
      water: true,
      electricity: true,
      gas: true,
      internet: true
    }
  },
  {
    id: '4',
    name: 'Loja Comercial',
    address: 'Rua Comercial, 321, Centro, Toledo - PR',
    type: 'commercial',
    size: 80,
    bedrooms: 0,
    bathrooms: 1,
    rentAmount: 2000,
    status: 'maintenance',
    description: 'Ponto comercial estratégico no centro da cidade, ideal para diversos tipos de negócio.',
    images: ['/placeholder-commercial1.jpg'],
    createdAt: '2023-12-05',
    updatedAt: '2025-01-20',
    features: ['Vitrine', 'Estacionamento', 'Localização privilegiada'],
    utilities: {
      water: true,
      electricity: true,
      gas: false,
      internet: false
    }
  }
];

export const getPropertyStatusText = (status: string): string => {
  switch (status) {
    case 'available': return 'Disponível';
    case 'rented': return 'Alugado';
    case 'maintenance': return 'Manutenção';
    default: return status;
  }
};

export const getPropertyTypeText = (type: string): string => {
  switch (type) {
    case 'house': return 'Casa';
    case 'apartment': return 'Apartamento';
    case 'commercial': return 'Comercial';
    default: return type;
  }
};

export const getPropertyStatusColor = (status: string): string => {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'rented': return 'bg-blue-100 text-blue-800';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
