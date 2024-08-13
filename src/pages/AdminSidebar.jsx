import React, { useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import Loader from '../components/Loader';

const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  const {user , loading} = useFirebase();
  if(!user && !loading) return <Loader/>
  return (
    <div className="w-64 bg-white shadow-md h-screen flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">PuriGo</span>
        </div>
        <nav className="mt-10 space-y-2">
          <a href="#" onClick={() => setCurrentPage('addNewProduct')} className={`block py-2.5 px-4 rounded hover:bg-green-100 transition-colors duration-200 ${currentPage === 'addNewProduct' ? 'bg-green-100' : ''}`}>
            Add New Product
          </a>
          <a href="#" onClick={() => setCurrentPage('viewProducts')} className={`block py-2.5 px-4 rounded hover:bg-green-100 transition-colors duration-200 ${currentPage === 'viewProducts' ? 'bg-green-100' : ''}`}>
            View Products
          </a>
          <a href="#" onClick={() => setCurrentPage('orders')} className={`block py-2.5 px-4 rounded hover:bg-green-100 transition-colors duration-200 ${currentPage === 'orders' ? 'bg-green-100' : ''}`}>
            Orders
          </a>
          <a href="#" onClick={() => setCurrentPage('addNewCoupons')} className={`block py-2.5 px-4 rounded hover:bg-green-100 transition-colors duration-200 ${currentPage === 'addNewCoupons' ? 'bg-green-100' : ''}`}>
            Add New Coupons
          </a>
        </nav>
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full border border-gray-300" src="https://imgs.search.brave.com/6eHKw_ZKNJtImOLKjAfZGshC9rVMAkIVnSsrQzeoewg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUu/cG5n" alt="User" />
          <div className="ml-4">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
