import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFirebase } from "../context/Firebase";
import Loader from "../components/Loader";
import SuccessPopup from "../components/SuccessPopup";
import ItemCard from "../components/ItemCard";

const Checkout = () => {
  
  const { cart, removeFromCart } = useCart();
  const { user, products, loading, isLoggedIn, coupons, createOrder } =
    useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const deliveryFee = 64.0;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    document.title = "Checkout | Purigo"
  }, [])
  

  useEffect(() => {
    setGrandTotal(subtotal + deliveryFee - discount);
  }, [subtotal, deliveryFee, discount]);

  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    const randomSubset = shuffledProducts.slice(0, 4);
    setRandomProducts(randomSubset);
  }, [products]);

  const generateTrackingNumber = () => {
    const getRandomLetter = () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return letters[Math.floor(Math.random() * letters.length)];
    };
    const getRandomDigit = () => {
      return Math.floor(Math.random() * 10).toString();
    };
    const randomLetter = getRandomLetter();
    const uniqueNumber = new Date().getTime().toString().slice(-6);
    const randomDigits = Array.from({ length: 4 }, getRandomDigit).join("");
    const trackingNumber = `${randomLetter}${uniqueNumber}${randomDigits}`;
    return trackingNumber;
  };

  const applyPromoCode = () => {
    const coupon = coupons.find(
      (coupon) => coupon.title === promoCode && coupon.isActive
    );
  
    if (!coupon) {
      alert("Invalid or inactive promo code");
      return;
    }
  
    const userHasCoupon = user && user.coupons ? user.coupons.includes(coupon.title) : false;
    if (userHasCoupon && !coupon.repeating) {
      alert("This coupon is valid for first-time users only.");
      return;
    }
  
    const couponDiscount = (subtotal * coupon.discount) / 100;
    
    setDiscount(couponDiscount);
    setAppliedPromoCode(promoCode);
  };
  

  const removePromoCode = () => {
    setDiscount(0);
    setAppliedPromoCode("");
  };
  const trackingId = generateTrackingNumber();

  const sendConfirmationEmail = async (orderData) => {
    console.log("Sending mail");
    const emailData = {
      name: user.fullName,
      grandTotal: orderData.grandTotal,
      itemSize: cart.length,
      deliveryAddress: user.address,
      phoneNumber: user.number,
      email: user.email,
      cart: cart,
      transactionId: trackingId,
      subtotal: subtotal,
      discount: discount,
      delivery: deliveryFee,
    };

    try {
      const response = await fetch(
        "https://purigo-backend-2.onrender.com/sendmail",
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

  const handleClick = async () => {
    try {
      const orderData = {
        userId: user.uid,
        userMail : user.email,
        userName : user.fullName,
        items: cart,
        orderDate: Date.now(),
        status: "ORDER CONFIRMED",
        shippingAddress: user.address,
        billingAddress: user.address,
        paymentMethod: "COD",
        paymentStatus: "unpaid",
        shippingMethod: "standard",
        trackingNumber: trackingId,
        discounts: [
          {
            code: promoCode,
            amount: discount,
          },
        ],
        subtotal: subtotal,
        grandTotal: grandTotal,
        deliveryDate: null,
        deliveryFee: deliveryFee,
      };
      // const ORDERstatuses = ["ORDER CONFIRMED", "SHIPPING", "DELIVERED"];
      await createOrder(orderData, "ORDER CONFIRMED");
      sendConfirmationEmail(orderData);
      setOrderConfirmed(true);
      // console.log("Order placed and email sent successfully!");
    } catch (error) {
      // console.error("Failed to create order:", error);
    }
  };

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/account/login", { state: { from: location } });
    }
  }, [isLoggedIn, loading, navigate, location]);

  if (loading || !isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
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

  return (
    <React.Fragment>
      <div className="container mx-auto p-6">
        <main className="mt-10">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {cart.length === 0 ? (
            <div className="text-center text-lg font-semibold">
              Your cart is empty.
            </div>
          ) : (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="bg-white p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full md:w-20 h-20 object-cover rounded mb-4 md:mb-0"
                        />
                        <div className="md:ml-4 flex-1 text-center md:text-left">
                          <h2 className="text-lg font-semibold">
                            {item.title}
                          </h2>
                          <div className="mt-2">{`${
                            item.quantity
                          } x ${formatSize(item.size)}`}</div>
                        </div>
                        <div className="flex flex-col items-center space-x-2 mt-4 md:mt-0">
                          <div className="font-semibold">{`₹${
                            item.price * item.quantity
                          }`}</div>
                          <button
                            onClick={() => removeFromCart(item.id , item.size)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow space-y-6">
                <h2 className="text-xl font-semibold">Review Order Details</h2>
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between items-center"
                  >
                    <span>{item.title}</span>
                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Promo code</span>
                  {appliedPromoCode ? (
                    <div className="flex items-center">
                      <span>{appliedPromoCode}</span>
                      <button
                        onClick={removePromoCode}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="border px-2 py-1 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-blue-500 text-white px-4 py-2 sm:py-1 rounded w-full sm:w-auto"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span className="font-semibold">
                      ₹{deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discount !== 0 ? (
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="font-semibold">
                        - ₹{discount.toFixed(2)}
                      </span>
                    </div>
                  ) : null}
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Grand Total</span>
                    <span className="text-lg font-semibold">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleClick}
                  className="w-full bg-green-500 text-white py-2 rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </section>
          )}

          <section className="mt-10">
            <section className="py-12 sm:py-16 lg:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 lg:mb-0 dark:text-white">
                  Similar Items You Might Like
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 overflow-x-auto">
                  {randomProducts.slice(0, 4).map((product) => (
                    <ItemCard key={product.id} item={product} />
                  ))}
                </div>
              </div>
            </section>
          </section>
        </main>
      </div>
      {orderConfirmed && <SuccessPopup />}
    </React.Fragment>
  );
};

export default Checkout;
