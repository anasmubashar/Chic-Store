'use client'

import { useState } from 'react'
import { Search, Filter,Plus,  X ,Package, Users, BarChart2, Truck, ShoppingCart} from 'lucide-react'


// Sample user data
const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-03-15 14:30'
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-03-14 09:15'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    initials: 'MJ',
    email: 'mike@example.com',
    role: 'Editor',
    status: 'Inactive',
    lastLogin: '2024-03-10 16:45'
  }
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  })

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddUser = (e) => {
    e.preventDefault()
    const id = users.length + 1
    const initials = newUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
    const user = { ...newUser, id, initials, lastLogin: 'N/A' }
    setUsers([...users, user])
    setIsAddModalOpen(false)
    setNewUser({ name: '', email: '', role: 'User', status: 'Active' })
  }

  const handleEditUser = (e) => {
    e.preventDefault()
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? { ...currentUser } : user
    )
    setUsers(updatedUsers)
    setIsEditModalOpen(false)
    setCurrentUser(null)
  }

  const openEditModal = (user) => {
    setCurrentUser(user)
    setIsEditModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r">
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

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">User Management</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-5 w-5" />
                Filter
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-5 w-5" />
                Add User
              </button>
            </div>
          </div>

          {/* Users table */}
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">NAME</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">EMAIL</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">ROLE</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">STATUS</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">LAST LOGIN</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                          {user.initials}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New User</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Add User
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleEditUser}>
              <div className="mb-4">
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  id="edit-role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={currentUser.role}
                  onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="edit-status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={currentUser.status}
                  onChange={(e) => setCurrentUser({...currentUser, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

