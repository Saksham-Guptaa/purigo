import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import PhoneAuthAlert from "../components/PhoneAuthAlert";
import Loader from "../components/Loader";
import LoginPage from "./Login";

export default function ProfilePage() {
  const { getUser, logout, user, loading } = useFirebase();
  const navigate = useNavigate();
  const [showPhoneAuthAlert, setShowPhoneAuthAlert] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/account/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const sendMissYouMail = () => {
    alert("Press OK to continue and this process will done in background")
    fetch('https://purigo-backend-2.onrender.com/missyou')
      .then(response => {
        if (response.ok) {
          alert('Mail send to all inactive users');
        } else {
          throw new Error('Failed to send miss you mail');
        }
      })
      .catch(error => {
        console.error('Error sending miss you mail:', error);
      });
  };
  

  useEffect(() => {
    document.title = "Profile Page | Purigo"
    window.scrollTo(0, 0);
  }, [])

  const handleClick = (orderId) => {
    navigate(`/account/tracking/${orderId}`);
  };

  const addPhoneNumber = async () => {
    setShowPhoneAuthAlert(true);
  };

  useEffect(() => {
    if (!user) {
      getUser()
        .then((userData) => {
          if (!userData) {
            navigate("/account/login");
          }
        })
        .finally(() => {
          setUserDataLoaded(true);
        });
    } else {
      setUserDataLoaded(true);
    }
  }, [user, getUser, navigate]);

  if (loading || !userDataLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  

  if (!user) {
    return <LoginPage />;
  }

  

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">User Information</h3>
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-700 focus:outline-none"
          >
            Logout
          </button>
          {user.admin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              Admin
            </button>
          )}
          {user.admin && (
            <button
              onClick={() => navigate("/admin/coupons")}
              className="text-sm text-emerald-600 hover:text-blue-700 focus:outline-none"
            >
              Add New Coupons
            </button>
          )}
          {user.admin && (
            <button
              onClick={sendMissYouMail}
              className="text-sm text-emerald-600 hover:text-blue-700 focus:outline-none"
            >
              Send Miss you mail
            </button>
          )}
          {user.admin && (
            <button
              onClick={() => navigate("/admin/viewproducts")}
              className="text-sm text-green-600 hover:text-green-700 focus:outline-none"
            >
              View Products
            </button>
          )}
        </div>
      </div>
      <dl className="space-y-6">
        <div>
          <dt className="text-sm font-medium">Full name</dt>
          <dd className="mt-1 text-sm">{user.fullName}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium">Email address</dt>
          <dd className="mt-1 text-sm">{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium">Phone Number</dt>
          {user.number != null ? (
            <dd className="mt-1 text-sm">+91 {user.number}</dd>
          ) : (
            <button
              onClick={addPhoneNumber}
              className="text-sm text-red-500 focus:outline-none hover:underline"
            >
              Add phone number
            </button>
          )}
        </div>
        <div>
          <dt className="text-sm font-medium">Your Address</dt>
          <dd className="mt-1 text-sm">{user.address}</dd>
        </div>
        {user.orderHistory && user.orderHistory.length > 0 && (
          <div>
            <dt className="text-sm font-medium">Order History</dt>
            <div className="mt-2 space-y-4">
              {user.orderHistory.map((order, index) => (
                <div
                  key={`${order.orderId}-${order.grandTotal}-${index}`}
                  className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">Order ID: {order.orderId}</p>
                    <p className="text-sm">Total Items: {order.items.length}</p>
                    <p className="text-sm">Total Price: ₹{order.grandTotal}</p>
                  </div>
                  <button
                    onClick={() => handleClick(order.orderId)}
                    className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
                  >
                    Track Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </dl>
      {showPhoneAuthAlert && <PhoneAuthAlert />}
    </div>
  );
}
