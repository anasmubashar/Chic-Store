import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { getBuses, deleteBus } from '../../lib/busapi';
import { AddBusDialog } from '../../components/Delivery/buses/AddBusDialog';
import { EditBusDialog } from '../../components/Delivery/buses/EditBusDialog';
import { DeleteBusDialog } from '../../components/Delivery/buses/DeleteBusDialog';
import { Bus } from '../../types/bus';

export function CargoBusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  useEffect(() => {
    fetchBuses();
  }, [currentPage, searchTerm]);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await getBuses(currentPage);
      setBuses(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching buses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bus: Bus) => {
    setSelectedBus(bus);
    setShowEditDialog(true);
  };

  const handleDelete = (bus: Bus) => {
    setSelectedBus(bus);
    setShowDeleteDialog(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cargo Buses</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Bus
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search buses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus Number</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">Loading...</TableCell>
              </TableRow>
            ) : (
              buses.map((bus) => (
                <TableRow key={bus._id}>
                  <TableCell>{bus.busNumber}</TableCell>
                  <TableCell>{bus.licensePlate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bus.status === 'available' ? 'bg-green-100 text-green-800' :
                      bus.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bus.status.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>{bus.condition}</TableCell>
                  <TableCell>{bus.assignedDriver?.name || 'Unassigned'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(bus)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(bus)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {buses.length} of {totalPages * 10} results
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <AddBusDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={fetchBuses}
      />

      {selectedBus && (
        <>
          <EditBusDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            bus={selectedBus}
            onSuccess={fetchBuses}
          />
          <DeleteBusDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            bus={selectedBus}
            onSuccess={fetchBuses}
          />
        </>
      )}
    </div>
  );
}