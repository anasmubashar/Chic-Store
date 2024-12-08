import { format } from 'date-fns';
import { Eye, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

export function InvoiceTableRow({ invoice }) {
  const getStatusColor = (status) => {
    const colors = {
      sent: 'text-green-500 bg-green-50',
      overdue: 'text-yellow-500 bg-yellow-50',
      pending: 'text-red-500 bg-red-50'
    };
    return colors[status] || 'text-gray-500 bg-gray-50';
  };

  return (
    <TableRow>
      <TableCell>{invoice.invoiceNumber}</TableCell>
      <TableCell>{invoice.customerName}</TableCell>
      <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
      <TableCell>{format(new Date(invoice.createdAt), 'MM/dd/yyyy')}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
          {invoice.status}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}