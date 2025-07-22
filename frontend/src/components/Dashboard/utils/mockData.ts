import type { Tenant, PaymentHistory, Utility, Contract } from './types';

// Mock data for dashboard
export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'João Silva',
    property: 'Casa A - Rua das Flores, 123',
    avatar: 'JS',
    rentAmount: 1200,
    paymentStatus: 'paid',
    paymentDate: '2025-01-05',
    dueDate: '2025-01-05',
    utilitiesAmount: 180,
    phone: '(44) 99999-1234',
    email: 'joao.silva@email.com'
  },
  {
    id: '2',
    name: 'Maria Santos',
    property: 'Apartamento B - Av. Central, 456',
    avatar: 'MS',
    rentAmount: 850,
    paymentStatus: 'pending',
    paymentDate: '',
    dueDate: '2025-01-10',
    utilitiesAmount: 120,
    phone: '(44) 98888-5678',
    email: 'maria.santos@email.com'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    property: 'Casa C - Rua do Sol, 789',
    avatar: 'CO',
    rentAmount: 1500,
    paymentStatus: 'late',
    paymentDate: '',
    dueDate: '2024-12-15',
    utilitiesAmount: 220,
    phone: '(44) 97777-9012',
    email: 'carlos.oliveira@email.com'
  }
];

export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: '1',
    tenantId: '1',
    date: '2025-01-05',
    amount: 1380,
    type: 'both',
    status: 'completed'
  },
  {
    id: '2',
    tenantId: '1',
    date: '2024-12-05',
    amount: 1380,
    type: 'both',
    status: 'completed'
  },
  {
    id: '3',
    tenantId: '2',
    date: '2024-12-10',
    amount: 970,
    type: 'both',
    status: 'completed'
  }
];

export const mockUtilities: Utility[] = [
  {
    id: '1',
    propertyId: '1',
    type: 'water',
    currentReading: 1250,
    lastReading: 1180,
    consumption: 70,
    amount: 85,
    status: 'normal'
  },
  {
    id: '2',
    propertyId: '1',
    type: 'electricity',
    currentReading: 2840,
    lastReading: 2650,
    consumption: 190,
    amount: 95,
    status: 'high'
  }
];

export const mockContracts: Contract[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    rentAmount: 1200,
    status: 'active',
    isAuthenticated: true
  },
  {
    id: '2',
    tenantId: '2',
    propertyId: '2',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    rentAmount: 850,
    status: 'active',
    isAuthenticated: false
  }
];
