export interface Order {
  _id: string;
  deliveryAddress: string;
  priority: 'low' | 'medium' | 'high';
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  status: 'pending' | 'processing' | 'completed';
}

export interface Bus {
  _id: string;
  licensePlate: string;
  status: 'available' | 'in_transit' | 'maintenance';
  capacity: number;
  currentLocation: {
    coordinates: [number, number];
  };
}

export interface Driver {
  _id: string;
  name: string;
  licenseNumber: string;
  isActive: boolean;
  assignedBus: string | null;
  currentLocation: {
    coordinates: [number, number];
  };
}

export interface Assignment {
  _id: string;
  order: Order;
  bus: Bus;
  driver: Driver;
  assignedAt: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'cancelled';
}