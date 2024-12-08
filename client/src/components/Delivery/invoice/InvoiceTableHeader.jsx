import {
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  export function InvoiceTableHeader() {
    return (
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
    );
  }