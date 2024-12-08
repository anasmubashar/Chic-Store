import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EditDriverDialog } from './EditDriverDialog'
import { DeleteDriverDialog } from './DeleteDriverDialog'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

interface Driver {
  _id: string
  name: string
  cnicNumber: string
  phoneNumber: string
  licenseNumber: string
  yearsOfExperience: number
  assignedBus: {
    _id: string
    busNumber: string
  }
  address: {
    street: string
    city: string
    province: string
    postalCode: string
  }
  isActive: boolean
}

interface DriversTableProps {
  searchQuery: string
  sortBy: string
  filterStatus: string
}

export function DriversTable({ searchQuery, sortBy, filterStatus }: DriversTableProps) {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  useEffect(() => {
    fetchDrivers()
  }, [searchQuery, sortBy, filterStatus, currentPage])

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/drivers?page=${currentPage}&search=${searchQuery}&sort=${sortBy}&status=${filterStatus}`)
      const data = await response.json()
      setDrivers(data.data)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching drivers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver)
    setIsEditOpen(true)
  }

  const handleDelete = (driver: Driver) => {
    setSelectedDriver(driver)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">CNIC</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden lg:table-cell">License</TableHead>
              <TableHead className="hidden sm:table-cell">Experience</TableHead>
              <TableHead className="hidden xl:table-cell">Bus</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : drivers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No drivers found
                </TableCell>
              </TableRow>
            ) : (
              drivers.map((driver) => (
                <TableRow key={driver._id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{driver.cnicNumber}</TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell className="hidden lg:table-cell">{driver.licenseNumber}</TableCell>
                  <TableCell className="hidden sm:table-cell">{driver.yearsOfExperience} years</TableCell>
                  <TableCell className="hidden xl:table-cell">{driver.assignedBus?.busNumber || 'Unassigned'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      driver.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {driver.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(driver)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(driver)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {drivers.length} of {totalPages * 10} drivers
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {selectedDriver && (
        <>
          <EditDriverDialog
            driver={selectedDriver}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onSuccess={fetchDrivers}
          />
          <DeleteDriverDialog
            driver={selectedDriver}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            onSuccess={fetchDrivers}
          />
        </>
      )}
    </div>
  )
}

