export interface MaintenanceRecord {
    date: Date;
    type: 'routine' | 'repair' | 'emergency';
    description: string;
    cost: number;
    nextServiceDue: Date;
  }
  
  export interface Bus {
    _id: string;
    busNumber: string;
    licensePlate: string;
    capacity: {
      weight: number;
      unit: 'kg' | 'ton';
    };
    condition: 'excellent' | 'good' | 'fair' | 'maintenance_required';
    status: 'available' | 'in_transit' | 'maintenance' | 'out_of_service';
    currentRoute?: string;
    maintenanceHistory: MaintenanceRecord[];
    currentLocation?: {
      type: 'Point';
      coordinates: [number, number];
    };
    assignedDriver?: {
      _id: string;
      name: string;
      phoneNumber: string;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface BusResponse {
    success: boolean;
    data: Bus[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }
  
  export interface CreateBusDto {
    busNumber: string;
    licensePlate: string;
    capacity: {
      weight: number;
      unit: 'kg' | 'ton';
    };
    condition: Bus['condition'];
    status: Bus['status'];
  }
  
  export interface UpdateBusDto extends Partial<CreateBusDto> {}