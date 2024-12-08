import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody } from "@/components/ui/table"
import { InvoiceTableHeader } from './InvoiceTableHeader'
import { InvoiceTableRow } from './InvoiceTableRow'
import { InvoiceFilters } from './InvoiceFilters'
import { AddInvoiceDialog } from './AddInvoiceDialog'

// Mock data for development
const MOCK_INVOICES = Array(50).fill().map((_, index) => ({
  _id: (index + 1).toString(),
  invoiceNumber: `INV-${(3000 + index).toString().padStart(4, '0')}`,
  customerName: `Customer ${index + 1}`,
  totalAmount: Math.floor(Math.random() * 1000) + 100,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  status: ['sent', 'pending', 'overdue'][Math.floor(Math.random() * 3)]
}))

export function InvoiceList() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('7')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    fetchInvoices()
  }, [searchTerm, dateFilter, currentPage])

  const fetchInvoices = async () => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Filter and paginate mock data
      let filteredInvoices = MOCK_INVOICES.filter(invoice => 
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )

      if (dateFilter !== 'all') {
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - parseInt(dateFilter))
        filteredInvoices = filteredInvoices.filter(invoice => 
          new Date(invoice.createdAt) >= startDate
        )
      }

      setTotalPages(Math.ceil(filteredInvoices.length / itemsPerPage))
      
      const startIndex = (currentPage - 1) * itemsPerPage
      const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage)
      
      setInvoices(paginatedInvoices)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddInvoice = (newInvoice) => {
    const invoiceWithId = {
      ...newInvoice,
      _id: (MOCK_INVOICES.length + 1).toString(),
      invoiceNumber: `INV-${(3000 + MOCK_INVOICES.length).toString().padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    MOCK_INVOICES.unshift(invoiceWithId)
    fetchInvoices()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <InvoiceFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />
        <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
          Add New Invoice
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <InvoiceTableHeader />
          <TableBody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">Loading...</td>
              </tr>
            ) : invoices.map((invoice) => (
              <InvoiceTableRow key={invoice._id} invoice={invoice} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Showing {invoices.length} of {MOCK_INVOICES.length} results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <AddInvoiceDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddInvoice={handleAddInvoice}
      />
    </div>
  )
}

