'use client'

import { useState } from 'react'
import { Search, Filter, Plus, Package, Users, BarChart2, Truck, ShoppingCart, MoreVertical } from 'lucide-react'
import { 
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'

// Sample data
const monthlyData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
]

const pieData = [
  { name: 'Wireless Headphones', value: 48230, color: '#0088FE' },
  { name: 'Smart Watch', value: 37500, color: '#00C49F' },
  { name: 'Running Shoes', value: 15750, color: '#FFBB28' },
]

export default function SalesReports() {
  const [dateRange, setDateRange] = useState('monthly')
  
  const exportReport = (format) => {
    // Implementation for export functionality
    console.log(`Exporting report in ${format} format`)
  }

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
      {/* Main Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales Reports</h1>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2 border rounded-lg"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button 
              onClick={() => exportReport('csv')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Revenue"
            value="$54,230"
            change="+12.5%"
            icon="$"
          />
          <MetricCard
            title="Total Orders"
            value="1,243"
            change="+8.2%"
            icon="📦"
          />
          <MetricCard
            title="Average Order Value"
            value="$43.65"
            change="+3.7%"
            icon="💰"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change="+1.2%"
            icon="📈"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {pieData.map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">245 sales</p>
                </div>
                <span className="font-semibold">${product.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, change, icon }) {
  const isPositiveChange = change.startsWith('+')
  
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-600 mt-2">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}

