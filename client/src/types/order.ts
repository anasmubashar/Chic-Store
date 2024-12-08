export interface OrderItem {
    id: string;
    product: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }
  
  export interface Order {
    id: string;
    orderId: string;
    customer: string;
    items: OrderItem[];
    total: number;
    status: 'draft' | 'in-progress' | 'completed' | 'cancelled';
    paymentStatus: 'paid' | 'unpaid' | 'refund';
    priority: 'normal' | 'high';
    deliveryNumber?: string;
    createdAt: string;
  }
  
  export interface OrderFilters {
    customer?: string;
    status?: string;
    paymentStatus?: string;
    material?: string;
    priority?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
  }
  
  export interface OrderMetrics {
    totalOrders: number;
    deliveredOrders: number;
    returns: number;
    averageOrderValue: number;
    totalOrderAmount: number;
    revenue: number;
  }
  
  export interface PaginatedOrders {
    data: Order[];
    meta: {
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }