'use client'

import { useState } from 'react'
import { Search, Filter,Plus, Package, MapPin, Clock , Users, BarChart2, Truck, ShoppingCart, MoreVertical } from 'lucide-react'


const initialShipments = [
  {
    trackingId: 'SHP001',
    order: '#1234',
    customer: 'John Doe',
    status: 'In Transit',
    location: 'New York, NY',
    eta: '2024-03-16',
    carrier: 'FedEx'
  },
  {
    trackingId: 'SHP002',
    order: '#1235',
    customer: 'Jane Smith', 
    status: 'Delivered',
    location: 'Los Angeles, CA',
    eta: '2024-03-15',
    carrier: 'UPS'
  },
  {
    trackingId: 'SHP003',
    order: '#1236',
    customer: 'Mike Johnson',
    status: 'Processing',
    location: 'Chicago, IL', 
    eta: '2024-03-17',
    carrier: 'USPS'
  }
]

const statuses = ['Processing', 'In Transit', 'Out for Delivery', 'Delivered']

export default function ShippingManagement() {
  const [shipments, setShipments] = useState(initialShipments)
  const [search, setSearch] = useState('')
  
  const metrics = {
    active: shipments.filter(s => s.status !== 'Delivered').length,
    delivered: shipments.filter(s => s.status === 'Delivered').length,
    pending: shipments.filter(s => s.status === 'Processing').length
  }

  const updateStatus = (trackingId, newStatus) => {
    setShipments(shipments.map(shipment => {
      if (shipment.trackingId === trackingId) {
        // In a real app, make API call here
        sendNotification(shipment.customer, newStatus)
        return { ...shipment, status: newStatus }
      }
      return shipment
    }))
  }

  const sendNotification = (customer, status) => {
    // In a real app, integrate with notification service
    console.log(`Notification sent to ${customer}: Order status updated to ${status}`)
  }

  const filteredShipments = shipments.filter(shipment => 
    Object.values(shipment).some(value => 
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div className="flex h-screen bg-gray-50">
    
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            <ShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </a>
          <a className="flex items-center px-6 py-3 bg-blue-50 text-blue-600">
            <Package className="w-5 h-5 mr-3" />
            Products
          </a>
          <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            <Users className="w-5 h-5 mr-3" />
            Users
          </a>
          <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            <BarChart2 className="w-5 h-5 mr-3" />
            Reports
          </a>
          <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            <Truck className="w-5 h-5 mr-3" />
            Shipping
          </a>
        </nav>
      </aside>
    
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Shipping Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search shipments..."
              className="pl-10 pr-4 py-2 border rounded-lg w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Active Shipments</h3>
              <p className="text-2xl font-bold">{metrics.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Delivered Today</h3>
              <p className="text-2xl font-bold">{metrics.delivered}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Pending Shipments</h3>
              <p className="text-2xl font-bold">{metrics.pending}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-600">TRACKING ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">ORDER</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">CUSTOMER</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">STATUS</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">LOCATION</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">ETA</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">CARRIER</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment.trackingId} className="border-t">
                  <td className="p-4">{shipment.trackingId}</td>
                  <td className="p-4">{shipment.order}</td>
                  <td className="p-4">{shipment.customer}</td>
                  <td className="p-4">
                    <select
                      value={shipment.status}
                      onChange={(e) => updateStatus(shipment.trackingId, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                        ${shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : ''}
                        ${shipment.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${shipment.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' : ''}
                      `}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">{shipment.location}</td>
                  <td className="p-4">{shipment.eta}</td>
                  <td className="p-4">{shipment.carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    </div>
  )
}

