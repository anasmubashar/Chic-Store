import { useState, useEffect } from 'react';
import { useToast } from '../../hooks/use-toast';
import { OrderMetrics } from '../../components/Delivery/orders/OrderMetrics';
import { OrderFilters } from '../../components/Delivery/orders/OrderFilters';
import { OrderTable } from '../../components/Delivery/orders/OrderTable';
import { Pagination } from '../../components/Delivery/orders/Pagination';
import { orderApi } from '../../lib/orderApi';
import { Order, OrderFilters as OrderFiltersType } from '../../types/order';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<OrderFiltersType>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const metrics = {
    totalOrders: 112,
    deliveredOrders: 98,
    returns: 2,
    averageOrderValue: 2440,
    totalOrderAmount: 520580,
    revenue: 1280349,
  };

  useEffect(() => {
    loadOrders();
  }, [currentPage, filters]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderApi.getOrders(currentPage, filters);
      setOrders(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load orders",
      });
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (order: Order) => {
    // Implement edit functionality
    console.log('Edit order:', order);
  };

  const handleDelete = async (orderId: string) => {
    try {
      await orderApi.deleteOrder(orderId);
      toast({
        title: "Success",
        description: "Order deleted successfully",
      });
      loadOrders();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete order",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Order
        </Button>
      </div>

      <OrderMetrics metrics={metrics} />
      
      <OrderFilters onFilterChange={setFilters} />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">Loading...</div>
      ) : (
        <>
          <OrderTable
            orders={orders}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}