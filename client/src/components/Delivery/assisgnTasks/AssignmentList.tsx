import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { assignmentApi } from '../../../lib/assignment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export function AssignmentList() {
  const { data: assignments, isLoading } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => assignmentApi.getAssignments(),
  });

  if (isLoading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Address</TableHead>
            <TableHead>Bus</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Assigned At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments?.data.map((assignment) => (
            <TableRow key={assignment._id}>
              <TableCell>{assignment.order.deliveryAddress}</TableCell>
              <TableCell>{assignment.bus.licensePlate}</TableCell>
              <TableCell>{assignment.driver.name}</TableCell>
              <TableCell>
                {format(new Date(assignment.assignedAt), 'PPp')}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{assignment.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}