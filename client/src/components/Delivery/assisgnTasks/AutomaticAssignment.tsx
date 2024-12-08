import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentApi } from '../../../lib/assignment';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '../../../hooks/use-toast';

export function AutomaticAssignment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: assignmentApi.getOrders,
  });

  const autoAssignMutation = useMutation({
    mutationFn: assignmentApi.autoAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      toast({
        title: 'Success',
        description: 'Order automatically assigned',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to auto-assign order',
        variant: 'destructive',
      });
    },
  });

  const handleAutoAssign = (orderId: string) => {
    autoAssignMutation.mutate(orderId);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>
                  <Badge variant={order.priority === 'high' ? 'destructive' : 'secondary'}>
                    {order.priority}
                  </Badge>
                </TableCell>
                <TableCell>{order.weight} kg</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => handleAutoAssign(order._id)}
                    disabled={order.status !== 'pending' || autoAssignMutation.isPending}
                  >
                    Auto Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}