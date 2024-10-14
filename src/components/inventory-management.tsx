import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import ProductSearch from './ProductSearch';
import axios from 'axios';
import ProductMenu from './ProductMenu';
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;

}

interface NewProduct {
  name: string;
  price: string;
  stock: string;
}

// Simulated API calls
const fetchInventory = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:3000/api/products');
  if(!response.ok){
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data;
  
};

const saveProduct = (product: Omit<Product, 'id'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...product, id: Date.now() }); // Simulate server-generated ID
    }, 500);
  });
};

const updateProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 500);
  });
};

const deleteProduct = (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', price: '', stock: '' });
  const [searchKey, setSearchKey] = useState('');


  useEffect(() => {
    fetchInventory().then((items) => {
      setInventory(items);
      setIsLoading(false);
    });
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const product: Omit<Product, 'id'> = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };
    const savedProduct = await saveProduct(product);
    setInventory([...inventory, savedProduct]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updatedProduct = await updateProduct(editingProduct);
      setInventory(inventory.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    setInventory(inventory.filter((item) => item.id !== id));
  };


 const filterInventory = inventory.filter((product)=>
product.name.toLowerCase().includes(searchKey.toLowerCase())
);

  return (
    <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
      <div className="flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4">
           <Sidebar />
          </div>
      
    <div className="container mx-auto p-6">          
    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-6">
              <ProductSearch onSearch={(searchKey: string) => {
                setSearchKey(searchKey);
              }} />
           
            
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>               
      {isLoading ? (
        <div className="text-center py-4">Loading inventory...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-y-auto ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200"> 

              {filterInventory.map((product) => (
                <tr key={product.id} className='items-center'>
                  <td className="px-5 py-4 whitespace-nowrap">{product.name}</td>                  
                  <td className="px-6 py-4 whitespace-nowrap">RD$ {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{product.stock}</td> 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <span className="sr-only">Edit</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <span className="sr-only">Delete</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editingProduct ? editingProduct.name : newProduct.name}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, name: e.target.value })
                  : setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={editingProduct ? editingProduct.price : newProduct.price}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                  : setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={editingProduct ? editingProduct.stock : newProduct.stock}
              onChange={(e) =>
                editingProduct
                  ? setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })
                  : setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            {editingProduct && (
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default InventoryManagement;