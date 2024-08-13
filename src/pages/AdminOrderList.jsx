import { useEffect } from "react";

const AdminOrdersList = ({ orders, onSelectOrder  }) => {
  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  return (
    <div className="w-full md:w-1/3 bg-white p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div>
        {orders.map((order,index) => (
          <div
            key={`${order.id}-${order.status}-${index}`}
            className="flex justify-between items-center p-4 border-b cursor-pointer"
            onClick={() => onSelectOrder(order)}
          >
            <div>
              <h3 className="text-lg font-medium">Order #{order.id}</h3>
              <p className="text-gray-600">₹{Number(order.grandTotal).toFixed(2)}
</p>
            </div>
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersList;
