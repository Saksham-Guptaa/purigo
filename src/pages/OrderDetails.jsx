import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import ErrorPage from "./404";
const OrderDetails = () => {
  const { id } = useParams();
  const { findOrderById, loading } = useFirebase();
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState("");

  useEffect(() => {
    document.title = "Order Details | Purigo"
  }, [])
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await findOrderById(id);
        setOrder(orderData);
        if (orderData && orderData.trackingNumber) {
          setTrackingUrl (
            `https://purigo.netlify.app/account/tracking/${orderData.trackingNumber}`
          );
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id]);
  const handleCopy = () => {
    navigator.clipboard.writeText(trackingUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const getStatusColor = (currentStatus, targetStatus) => {
    const statuses = ["ORDER CONFIRMED", "SHIPPING", "DELIVERED"];
    const currentIndex = statuses.indexOf(currentStatus);
    const targetIndex = statuses.indexOf(targetStatus);
    return currentIndex >= targetIndex ? "bg-green-500" : "bg-gray-300";
  };
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
  if (loading) {
    return (
      <div className="max-w-4xl my-10 mx-auto p-4 sm:p-6 lg:p-8  rounded-lg shadow-md">
        <div className="animate-pulse flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0 w-3/4 bg-gray-200 h-8 rounded"></h2>
          <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm sm:text-base"></span>
        </div>
        <div className="text-gray-200 mb-4 text-sm sm:text-base">Date: </div>
        <div className="mb-6">
          {/* Skeleton loading for order status */}
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <div className="font-semibold text-sm sm:text-base w-3/4 bg-gray-200 h-4 rounded"></div>
                <div className="text-gray-200 text-xs sm:text-sm w-1/2 bg-gray-200 h-3 rounded"></div>
              </div>
            </div>
            <div className="w-full border-t border-gray-200 mx-2 my-2 sm:my-0"></div>
            {/* Skeleton loading for shipping status */}
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <div className="font-semibold text-sm sm:text-base w-3/4 bg-gray-200 h-4 rounded"></div>
                <div className="text-gray-200 text-xs sm:text-sm w-1/2 bg-gray-200 h-3 rounded"></div>
              </div>
            </div>
            <div className="w-full border-t border-gray-200 mx-2 my-2 sm:my-0"></div>
            {/* Skeleton loading for delivery status */}
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <div className="font-semibold text-sm sm:text-base w-3/4 bg-gray-200 h-4 rounded"></div>
                <div className="text-gray-200 text-xs sm:text-sm w-1/2 bg-gray-200 h-3 rounded"></div>
              </div>
            </div>
          </div>
          {/* Skeleton loading for courier name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200">
              Courier name
            </label>
            <input
              type="text"
              readOnly
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md text-sm bg-gray-200"
            />
          </div>
          {/* Skeleton loading for tracking number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200">
              Tracking number
            </label>
            <input
              type="text"
              readOnly
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md text-sm bg-gray-200"
            />
          </div>
          {/* Skeleton loading for tracking URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200">
              Shipment tracking URL
            </label>
            <div className="flex items-center">
              <div className="mt-1 p-2 block w-full border border-gray-200 rounded-md text-blue-500 text-sm bg-gray-200 break-all"></div>
              <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm "></button>
            </div>
          </div>
        </div>
        {/* Skeleton loading for item ordered */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 w-3/4 bg-gray-200 h-6 rounded"></h3>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 object-cover mr-4 bg-gray-200"></div>
              <div>
                <div className="font-semibold text-sm sm:text-base w-3/4 bg-gray-200 h-4 rounded"></div>
                <div className="text-gray-200 text-xs sm:text-sm w-1/2 bg-gray-200 h-3 rounded"></div>
              </div>
            </div>
            <div className="text-gray-200 text-sm sm:text-base w-1/4 bg-gray-200 h-4 rounded"></div>
          </div>
        </div>
        {/* Skeleton loading for product total */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm sm:text-base w-1/2 bg-gray-200 h-4 rounded"></div>
          <div className="text-gray-200 text-sm sm:text-base w-1/4 bg-gray-200 h-4 rounded"></div>
        </div>
        {/* Skeleton loading for shipping cost */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm sm:text-base w-1/2 bg-gray-200 h-4 rounded"></div>
          <div className="text-green-500 text-sm sm:text-base w-1/4 bg-gray-200 h-4 rounded"></div>
        </div>
        {/* Skeleton loading for discount */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm sm:text-base w-1/2 bg-gray-200 h-4 rounded"></div>
          <div className="text-gray-200 text-sm sm:text-base w-1/4 bg-gray-200 h-4 rounded"></div>
        </div>
        {/* Skeleton loading for total */}
        <div className="flex justify-between items-center font-semibold">
          <div className="text-sm sm:text-base w-1/2 bg-gray-200 h-6 rounded"></div>
          <div className="text-gray-200 text-sm sm:text-base w-1/4 bg-gray-200 h-6 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) return <ErrorPage />;

  return (
    <div className="max-w-4xl my-10 mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">
          Order details #{order.id}
        </h2>
        <span
          className={`px-3 py-1 ${getStatusColor(
            order.status
          )} text-white rounded-lg text-sm sm:text-base`}
        >
          {order.status}
        </span>
      </div>
      <div className="text-gray-500 mb-4 text-sm sm:text-base">
        Date: {new Date(order.orderDate).toLocaleDateString()}
      </div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                order.status,
                "ORDER CONFIRMED"
              )} mr-2`}
            ></div>
            <div>
              <div className="font-semibold text-sm sm:text-base">
                ORDER CONFIRMED
              </div>
              <div className="text-gray-500 text-xs sm:text-sm">
                {new Date(order.orderDate).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-300 mx-2 my-2 sm:my-0"></div>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                order.status,
                "SHIPPING"
              )} mr-2`}
            ></div>
            <div>
              <div className="font-semibold text-sm sm:text-base">SHIPPED</div>
              {order.courierName && (
                <div className="text-gray-500 text-xs sm:text-sm">
                  Shipped with {order.courierName}
                </div>
              )}
            </div>
          </div>
          <div className="w-full border-t border-gray-300 mx-2 my-2 sm:my-0"></div>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                order.status,
                "DELIVERED"
              )} mr-2`}
            ></div>
            <div>
              <div className="font-semibold text-sm sm:text-base">
                DELIVERED
              </div>
              {order.deliveryDate && (
                <div className="text-gray-500 text-xs sm:text-sm">
                  Estimated date: {order.deliveryDate}
                </div>
              )}
            </div>
          </div>
        </div>
        {order.courierName && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Courier name
            </label>
            <input
              type="text"
              value={order.courierName}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}
        {order.trackingNumber && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tracking number
            </label>
            <input
              type="text"
              value={order.trackingNumber}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}
        {trackingUrl && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Shipment tracking URL
            </label>
            <div className="flex items-center">
              <a
                href={trackingUrl}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-blue-500 text-sm break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {trackingUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Item ordered</h3>
        {order.items.map((item, index) => (
          <div
            key={`${item.id}-${index}-${item.size}-${item.quantity}`}
            className="flex flex-col sm:flex-row justify-between items-center mb-4"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover mr-4"
              />
              <div>
                <div className="font-semibold text-sm sm:text-base">
                  {item.title} - {formatSize(item.size)}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">
                  {item.quantity}x
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-sm sm:text-base">
              ₹{Number(item.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm sm:text-base">Product Total</div>
        <div className="text-gray-500 text-sm sm:text-base">
          ₹{Number(order.subtotal).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm sm:text-base">Shipping cost</div>
        <div className="text-green-500 text-sm sm:text-base">
          {order.deliveryFee != null
            ? `₹${Number(order.deliveryFee).toFixed(2)}`
            : "FREE"}
        </div>
      </div>
      {order.discounts && order.discounts.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm sm:text-base">Discount</div>
          <div className="text-gray-500 text-sm sm:text-base">
            - ₹{Number(order.discounts[0].amount).toFixed(2)}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center font-semibold">
        <div className="text-sm sm:text-base">Total</div>
        <div className="text-gray-500 text-sm sm:text-base">
          ₹{Number(order.grandTotal).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
