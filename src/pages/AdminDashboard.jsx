import  { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminOrderDetails from './AdminOrderDetails';
import AddNewProduct from './AddNewProduct';
import AdminOrdersList from './AdminOrderList';
import AdminProduct from './AdminProduct';
import Coupons from './Coupons'
import { useFirebase } from '../context/Firebase';
import Loader from '../components/Loader';
import ErrorPage from './404'

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { fetchAllOrders, loading, user, findOrderById } = useFirebase();

  const handleUpdateOrders = async () => {
    try {
      const updatedOrders = await fetchAllOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };

  const handleUpdateSelectedOrder = async () => {
    try {
      const updatedOrder = await findOrderById(selectedOrder.id);
      setSelectedOrder(updatedOrder);
    } catch (error) {
      console.error("Error updating selected order:", error);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetchAllOrders();
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  // Check if user exists and is admin
  if (!user || !user.admin)
    return <ErrorPage />; // Render ErrorPage component if user is not admin

  // Render admin dashboard content
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {currentPage === 'orders' && (
          <>
            <AdminOrdersList orders={orders} onSelectOrder={handleSelectOrder} />
            <AdminOrderDetails order={selectedOrder} onUpdateOrder={handleUpdateOrders} onUpdateSelectedOrder={handleUpdateSelectedOrder} />
          </>
        )}
        {currentPage === 'addNewProduct' && (
          <div className="flex flex-1 justify-center items-center bg-[#FFF3E2] p-6">
            <AddNewProduct />
          </div>
        )}
        {currentPage === 'viewProducts' && (
          <div className="flex flex-1 justify-center items-center bg-[#FFF3E2] p-6">
            <AdminProduct />
          </div>
        )}
        {currentPage === 'addNewCoupons' && (
          <div className="flex flex-1 w-full justify-center items-center bg-[#FFF3E2] p-6">
            <Coupons />
          </div>
        )}
        {currentPage !== 'orders' && currentPage !== 'addNewProduct' && currentPage !== 'viewProducts' && currentPage !== 'addNewCoupons' && (
          <div className="flex flex-1 bg-gray-100 p-6 overflow-auto">
            <h2 className="text-2xl font-semibold mb-6">Page {currentPage} content goes here</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
