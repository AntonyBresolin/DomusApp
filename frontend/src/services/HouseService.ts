// Types matching backend structure
export interface Address {
  city: string;
  state: string;
  zipCode: string;
  street: string;
  complement?: string;
}

export interface PropertyFeatures {
  qtdRoom: number;
  qtdBathroom: number;
  buildingArea: number;
  features: string[];
  utilities: {
    hasWater: boolean;
    hasGas: boolean;
    hasElectricity: boolean;
    hasInternet: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  cpf: string;
  houses: string[];
  roles: Array<{
    roleId: number;
    name: string;
  }>;
}

export interface House {
  houseId: string;
  address: Address;
  propertyFeatures: PropertyFeatures;
  user: User;
  houseType: 'HOUSE' | 'APARTMENT' | 'COMMERCIAL';
  status: 'DISPONIVEL' | 'ALUGADO' | 'MANUTENCAO';
  rentValue: number;
  name: string;
  description?: string;
  createAt: string;
  updateAt: string;
}

export interface CreateHouseDTO {
  address: Address;
  propertyFeatures: PropertyFeatures;
  houseType: 'HOUSE' | 'APARTMENT' | 'COMMERCIAL';
  rentValue: number;
  name: string;
  description?: string;
}

class HouseService {
  private baseURL = 'http://localhost:8080/api/v1/houses';

  async getHousesByOwner(): Promise<House[]> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return []; // Nenhuma casa encontrada
        }
        throw new Error(`Erro ao buscar casas: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar casas:', error);
      throw error;
    }
  }

  async createHouse(houseData: CreateHouseDTO): Promise<string> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(houseData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao criar casa: ${response.status} - ${errorText}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Erro ao criar casa:', error);
      throw error;
    }
  }

  // Helper methods to convert between frontend and backend formats
  static convertToFrontendProperty(house: House) {
    return {
      id: house.houseId,
      name: house.name,
      type: house.houseType.toLowerCase() as 'house' | 'apartment' | 'commercial',
      address: `${house.address.street}, ${house.address.city} - ${house.address.state}`,
      size: house.propertyFeatures.buildingArea,
      bedrooms: house.propertyFeatures.qtdRoom,
      bathrooms: house.propertyFeatures.qtdBathroom,
      rentAmount: house.rentValue,
      status: house.status === 'DISPONIVEL' ? 'available' as const : 
              house.status === 'ALUGADO' ? 'rented' as const : 'maintenance' as const,
      tenantId: house.status === 'ALUGADO' ? 'tenant_id' : null,
      description: house.description || '',
      features: house.propertyFeatures.features,
      utilities: {
        water: house.propertyFeatures.utilities.hasWater,
        electricity: house.propertyFeatures.utilities.hasElectricity,
        gas: house.propertyFeatures.utilities.hasGas,
        internet: house.propertyFeatures.utilities.hasInternet
      },
      images: [] as string[],
      createdAt: house.createAt,
      updatedAt: house.updateAt
    };
  }

  static convertToBackendFormat(propertyData: any): CreateHouseDTO {
    return {
      name: propertyData.name,
      description: propertyData.description || '',
      houseType: propertyData.type.toUpperCase() as 'HOUSE' | 'APARTMENT' | 'COMMERCIAL',
      rentValue: propertyData.rentAmount,
      address: {
        street: propertyData.address || '',
        city: propertyData.city || '',
        state: propertyData.state || '',
        zipCode: propertyData.zipCode || '',
        complement: propertyData.complement || ''
      },
      propertyFeatures: {
        qtdRoom: propertyData.bedrooms || 0,
        qtdBathroom: propertyData.bathrooms || 0,
        buildingArea: propertyData.size,
        features: propertyData.features || [],
        utilities: {
          hasWater: propertyData.utilities?.water || false,
          hasElectricity: propertyData.utilities?.electricity || false,
          hasGas: propertyData.utilities?.gas || false,
          hasInternet: propertyData.utilities?.internet || false
        }
      }
    };
  }
}

export { HouseService };
export default new HouseService();
