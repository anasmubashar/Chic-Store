// 'use client'

// import { useState } from 'react'
// import { Search, Filter, Plus, Package, Users, BarChart2, Truck, ShoppingCart, MoreVertical } from 'lucide-react'
// import AddProductModal from './Add-product-form'
// import EditProductModal from './Edit-product-form'
// import { getProducts } from "@/lib/api";

// const initialProducts = [
//   {
//     id: 1,
//     name: 'Wireless Headphones',
//     category: 'Electronics',
//     price: 199.99,
//     stock: 45,
//     image: '/placeholder.svg?height=200&width=200'
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     category: 'Electronics',
//     price: 299.99,
//     stock: 30,
//     image: '/placeholder.svg?height=200&width=200'
//   },
//   {
//     id: 3,
//     name: 'Running Shoes',
//     category: 'Sports',
//     price: 89.99,
//     stock: 60,
//     image: '/placeholder.svg?height=200&width=200'
//   }
// ]

// export default function ProductManagement() {
//   const [products, setProducts] = useState(initialProducts)
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [searchQuery, setSearchQuery] = useState('')

//   const addProduct = (newProduct) => {
//     setProducts([...products, { ...newProduct, id: products.length + 1 }])
//     setShowAddModal(false)
//   }

//   const editProduct = (updatedProduct) => {
//     setProducts(products.map(product =>
//       product.id === updatedProduct.id ? updatedProduct : product
//     ))
//     setShowEditModal(false)
//   }

//   const deleteProduct = (productId) => {
//     setProducts(products.filter(product => product.id !== productId))
//   }

//   const openEditModal = (product) => {
//     setEditingProduct(product)
//     setShowEditModal(true)
//   }

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r">
//         <div className="p-6">
//           <h1 className="text-xl font-bold">Admin Panel</h1>
//         </div>
//         <nav className="mt-6">
//           <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
//             <ShoppingCart className="w-5 h-5 mr-3" />
//             Orders
//           </a>
//           <a className="flex items-center px-6 py-3 bg-blue-50 text-blue-600">
//             <Package className="w-5 h-5 mr-3" />
//             Products
//           </a>
//           <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
//             <Users className="w-5 h-5 mr-3" />
//             Users
//           </a>
//           <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
//             <BarChart2 className="w-5 h-5 mr-3" />
//             Reports
//           </a>
//           <a className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
//             <Truck className="w-5 h-5 mr-3" />
//             Shipping
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           <div className="flex items-center justify-between mb-8">
//             <h1 className="text-2xl font-bold">Product Management</h1>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="pl-10 pr-4 py-2 border rounded-lg w-64"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
//                 <Filter className="w-5 h-5" />
//                 Filter
//               </button>
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add Product
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg shadow">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold">{product.name}</h2>
//                     <button className="p-2 hover:bg-gray-100 rounded-full">
//                       <MoreVertical className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <p className="text-gray-600">{product.category}</p>
//                   <div className="flex items-center justify-between mt-4">
//                     <span className="text-xl font-bold">${product.price}</span>
//                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                       {product.stock} in stock
//                     </span>
//                   </div>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => deleteProduct(product.id)}
//                       className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => openEditModal(product)}
//                       className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {showAddModal && (
//         <AddProductModal onAdd={addProduct} onClose={() => setShowAddModal(false)} />
//       )}

//       {showEditModal && (
//         <EditProductModal
//           product={editingProduct}
//           onEdit={editProduct}
//           onClose={() => setShowEditModal(false)}
//         />
//       )}
//     </div>
//   )
// }

// ProductManagement.jsx
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Package,
  Users,
  BarChart2,
  Truck,
  ShoppingCart,
  MoreVertical,
} from "lucide-react";
import AddProductModal from "./Add-product-form";
import EditProductModal from "./Edit-product-form";
import axios from "axios";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products`,
        {
          params: {
            search: searchQuery,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async (newProduct) => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/products`, newProduct);
    fetchProducts();
    setShowAddModal(false);
  };

  const editProduct = async (updatedProduct) => {
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/products/${updatedProduct._id}`,
      updatedProduct
    );
    fetchProducts();
    setShowEditModal(false);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/products/${productId}`
    );
    fetchProducts();
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Product Management</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600">{product.category}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEditModal(product)}
                      className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAddModal && (
        <AddProductModal
          onAdd={addProduct}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && (
        <EditProductModal
          product={editingProduct}
          onEdit={editProduct}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
