import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

const AdminOrderDetails = ({ order, onUpdateOrder, onUpdateSelectedOrder }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { updateOrderStatus } = useFirebase();
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])


  const handleUpdateStatus = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const sendConfirmationEmailShipped = async (order) => {
    console.log("Sending mail");
    const emailData = {
      name: order.userName,
      email: order.userMail,
      transactionId: order.trackingNumber,
    };

    try {
      const response = await fetch(
        "https://purigo-backend-2.onrender.com/sendshippedmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (!response.ok) {
        throw new Error("Error sending email");
      }
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  };
  
  const sendConfirmationEmail = async (order) => {
    console.log("Sending mail");
    const emailData = {
      name: order.userName,
      email: order.userMail,
      transactionId: order.trackingNumber,
    };

    try {
      const response = await fetch(
        "https://purigo-backend-2.onrender.com/senddeliveredmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      if (!response.ok) {
        throw new Error("Error sending email");
      }
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  };

  const handleStatusChange = async (status) => {
    setSelectedStatus(status);
    await updateOrderStatus(order.id, status);
    if(status === 'SHIPPING'){
      sendConfirmationEmailShipped(order);
    }else{
      sendConfirmationEmail(order);
    }
    setShowPopup(false);
    onUpdateOrder();
    onUpdateSelectedOrder();
  };

  if (!order) {
    return (
      <div className="w-full md:w-2/3 bg-gray-100 p-6">
        Select an order to view details
      </div>
    );
  }

  const formatSize = (size) => {
    switch (size) {
      case "onekg":
        return "1 kg";
      case "twofifty":
        return "250 g";
      case "fivehundred":
        return "500 g";
      default:
        return size;
    }
  };

  const getStatusColor = (currentStatus, targetStatus) => {
    const statuses = ["ORDER CONFIRMED", "SHIPPING", "DELIVERED"];
    const currentIndex = statuses.indexOf(currentStatus);
    const targetIndex = statuses.indexOf(targetStatus);
    return currentIndex >= targetIndex ? "bg-green-500" : "bg-gray-300";
  };

  return (
    <div className="w-full md:w-2/3 bg-gray-100 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Order {order.id}</h2>
        {order.status !== "DELIVERED" && (
          <button
            onClick={handleUpdateStatus}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Update Status
          </button>
        )}
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600"
            >
              Close
            </button>
            <h3 className="text-lg font-semibold mb-4">Update Status</h3>
            <div className="flex flex-col gap-4">
              {order.status === "ORDER CONFIRMED" && (
                <button
                  onClick={() => handleStatusChange("SHIPPING")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Mark as Shipping
                </button>
              )}
              {order.status === "SHIPPING" && (
                <button
                  onClick={() => handleStatusChange("DELIVERED")}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-medium">Order Tracking</h3>
        <div className="flex items-center mt-2">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>ORDER CONFIRMED</span>
            </div>
            <div
              className={`h-1 mt-1 ${getStatusColor(
                order.status,
                "ORDER CONFIRMED"
              )}`}
            ></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>SHIPPING</span>
            </div>
            <div
              className={`h-1 mt-1 ${getStatusColor(order.status, "SHIPPING")}`}
            ></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>DELIVERED</span>
            </div>
            <div
              className={`h-1 mt-1 ${getStatusColor(
                order.status,
                "DELIVERED"
              )}`}
            ></div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Order Summary</h3>
        <div className="p-4 bg-white rounded shadow-sm">
          <div className="flex justify-between">
            <span>Sub total</span>
            <span>Rs. {order.subtotal}</span>
          </div>
          {order.discounts[0].code !== "" && (
            <div className="flex justify-between">
              <span>Discount</span>
              <span>Rs. {order.discounts[0].amount}</span>
            </div>
          )}
          {order.deliveryFee !== "" && (
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs. {order.deliveryFee}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>Rs. {order.grandTotal}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">Order Info</h3>
        {order.items.map((product) => (
          <div className="p-4 bg-white rounded shadow-sm" key={product.id}>
            <div className="flex items-center justify-between">
              <span>
                {product.title} - {formatSize(product.size)}
              </span>
              <span>{product.price}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span>Qty: {product.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
