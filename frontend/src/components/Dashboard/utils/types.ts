// Types for Dashboard components
export interface Tenant {
  id: string;
  name: string;
  property: string;
  avatar: string;
  rentAmount: number;
  paymentStatus: 'paid' | 'pending' | 'late';
  paymentDate: string;
  dueDate: string;
  utilitiesAmount: number;
  phone: string;
  email: string;
}

export interface PaymentHistory {
  id: string;
  tenantId: string;
  date: string;
  amount: number;
  type: 'rent' | 'utilities' | 'both';
  status: 'completed' | 'pending';
}

export interface Utility {
  id: string;
  propertyId: string;
  type: 'water' | 'electricity';
  currentReading: number;
  lastReading: number;
  consumption: number;
  amount: number;
  status: 'normal' | 'high' | 'alert';
}

export interface Contract {
  id: string;
  tenantId: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: 'active' | 'pending' | 'expired';
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalRevenue: number;
  totalTenants: number;
  pendingPayments: number;
  latePayments: number;
}

export interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
