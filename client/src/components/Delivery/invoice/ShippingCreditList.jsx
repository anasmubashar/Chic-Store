import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const MOCK_CREDITS = [
  { id: 1, orderNumber: 'ORD-001', amount: 25.00, reason: 'Delayed Delivery', date: '2024-01-15', status: 'Applied' },
  { id: 2, orderNumber: 'ORD-002', amount: 15.50, reason: 'Damaged Package', date: '2024-01-18', status: 'Applied' },
]

export function ShippingCreditList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Shipping Credits</h3>
        <Button>Request Credit</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_CREDITS.map((credit) => (
            <TableRow key={credit.id}>
              <TableCell>{credit.orderNumber}</TableCell>
              <TableCell>${credit.amount.toFixed(2)}</TableCell>
              <TableCell>{credit.reason}</TableCell>
              <TableCell>{new Date(credit.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {credit.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

