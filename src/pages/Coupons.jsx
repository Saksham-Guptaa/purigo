import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useCallback, useEffect, useState } from "react";

const Coupons = () => {
  const { loading, user, error, createCoupon, isLoggedIn } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  const [discount, setDiscount] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [title, setTitle] = useState("");
  const [repeating, setRepeating] = useState(false);

  useEffect(() => {
    document.title = "Add Coupoun | Purigo"
  }, [])
  

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      if (!discount || !quantity || !title) {
        alert("All fields required");
        return;
      }
      try {
        const coupon = await createCoupon({
          discount: parseFloat(discount),
          isActive,
          quantity: parseInt(quantity),
          title,
          repeating,
        });
        if (coupon) {
          setTitle("");
          setDiscount("");
          setQuantity("");
          setRepeating(false);
          alert("Created Successfully");
        }
      } catch (error) {
        console.error("Error creating coupon:", error);
      }
    },
    [discount, isActive, quantity, title, repeating, createCoupon, navigate]
  );

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/account/login", { state: { from: location } });
    }
  }, [isLoggedIn, loading, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF3E2] dark:bg-gray-800 p-4">
      <div className="w-full max-w-xl p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center justify-center">
            <img
              className="w-8 h-8 mr-2 inline-block"
              src="/logonobg.png"
              alt="logo"
            />
            PuriGO
          </Link>
          <h1 className="text-xl font-bold mt-4 text-gray-900 dark:text-white">Create Coupon</h1>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value.toUpperCase())}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#FF6F3D] focus:border-[#FF6F3D] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-[#FFA62F] dark:focus:border-[#FFA62F]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#FF6F3D] focus:border-[#FF6F3D] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-[#FFA62F] dark:focus:border-[#FFA62F]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#FF6F3D] focus:border-[#FF6F3D] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-[#FFA62F] dark:focus:border-[#FFA62F]"
              required
            />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#FF6F3D] dark:text-[#FFA62F]"
                checked={repeating}
                onChange={(e) => setRepeating(e.target.checked)}
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Allow multiple uses</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#FF6F3D] text-white font-semibold rounded-md shadow-sm hover:bg-[#FFA62F] dark:hover:bg-[#FF6F3D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F3D] dark:focus:ring-[#FFA62F]"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin inline-block w-4 h-4 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.708 7.5H16m-2 14v-4m0 0a8 8 0 01-7.745-10.256l1.53 1.53A5.996 5.996 0 0012 20v-4"
                ></path>
              </svg>
            ) : (
              "Create Coupon"
            )}
          </button>
        </form>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Coupons;
