"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Package,
  Users,
  BarChart2,
  Truck,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#1",
      customer: "John Doe",
      status: "Processing",
      total: "$299.99",
      date: "2024-03-15",
    },
    {
      id: "#2",
      customer: "Jane Smith",
      status: "Shipped",
      total: "$149.5",
      date: "2024-03-14",
    },
    {
      id: "#3",
      customer: "Mike Johnson",
      status: "Delivered",
      total: "$499.99",
      date: "2024-03-13",
    },
  ]);

  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (order) => {
    setEditingOrder({ ...order });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleSave = () => {
    setOrders(
      orders.map((order) =>
        order.id === editingOrder.id ? editingOrder : order
      )
    );
    setIsEditing(false);
    setEditingOrder(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingOrder(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/orders"
            className="flex items-center px-6 py-3 text-blue-600 bg-blue-50"
          >
            <Package className="w-5 h-5 mr-3" />
            Orders
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Reports
          </Link>
          <Link
            to="/admin/shipping"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            <Truck className="w-5 h-5 mr-3" />
            Shipping
          </Link>
        </nav>
              
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Order Management</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ORDER ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  CUSTOMER
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  STATUS
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  TOTAL
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  DATE
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.total}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-1/2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Edit Order</h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order ID
                  </label>
                  <input
                    type="text"
                    value={editingOrder.id}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, id: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer
                  </label>
                  <input
                    type="text"
                    value={editingOrder.customer}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        customer: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        status: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total
                  </label>
                  <input
                    type="text"
                    value={editingOrder.total}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        total: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingOrder.date}
                    onChange={(e) =>
                      setEditingOrder({ ...editingOrder, date: e.target.value })
                    }
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
