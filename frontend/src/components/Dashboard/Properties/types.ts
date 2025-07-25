// Types for Property Management
export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'house' | 'apartment' | 'commercial';
  size: number; // em m²
  bedrooms?: number;
  bathrooms?: number;
  rentAmount: number;
  status: 'available' | 'rented' | 'maintenance';
  description?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  tenantId?: string | null;
  features: string[];
  utilities: {
    water: boolean;
    electricity: boolean;
    gas: boolean;
    internet: boolean;
  };
}

export interface PropertyFormData {
  name: string;
  address: string;
  type: 'house' | 'apartment' | 'commercial';
  size: number;
  bedrooms?: number;
  bathrooms?: number;
  rentAmount: number;
  description?: string;
  features: string[];
  utilities: {
    water: boolean;
    electricity: boolean;
    gas: boolean;
    internet: boolean;
  };
}
