import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentApi } from '../../../lib/assignment';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '../../../hooks/use-toast';

const formSchema = z.object({
  orderId: z.string().min(1, 'Order is required'),
  busId: z.string().min(1, 'Bus is required'),
  driverId: z.string().min(1, 'Driver is required'),
});

export function ManualAssignment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: assignmentApi.getOrders,
  });

  const { data: buses } = useQuery({
    queryKey: ['buses'],
    queryFn: assignmentApi.getBuses,
  });

  const { data: drivers } = useQuery({
    queryKey: ['drivers'],
    queryFn: assignmentApi.getDrivers,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const assignMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      assignmentApi.manualAssign(values.orderId, values.busId, values.driverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      toast({
        title: 'Success',
        description: 'Order assigned successfully',
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to assign order',
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    assignMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orders?.map((order) => (
                    <SelectItem key={order._id} value={order._id}>
                      {order.deliveryAddress} - {order.priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="busId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bus</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {buses?.map((bus) => (
                    <SelectItem key={bus._id} value={bus._id}>
                      {bus.licensePlate} - {bus.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {drivers?.map((driver) => (
                    <SelectItem key={driver._id} value={driver._id}>
                      {driver.name} - {driver.isActive ? 'Available' : 'Busy'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={assignMutation.isPending}
        >
          {assignMutation.isPending ? 'Assigning...' : 'Assign Order'}
        </Button>
      </form>
    </Form>
  );
}