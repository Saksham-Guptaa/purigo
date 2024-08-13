import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ItemCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.images[0],
      href: `/products/${item.slug}`,
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleClick = () => {
    let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    recentlyViewed = recentlyViewed.filter((i) => i.slug !== item.slug);
    recentlyViewed.unshift(item);
    if (recentlyViewed.length > 10) {
      recentlyViewed.pop();
    }
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link onClick={handleClick} to={`/products/${item.slug}`}>
        <div className="relative">
          <img
            className={`w-full h-56 sm:h-64 object-cover ${imageLoaded ? "block" : "hidden"} transition-opacity duration-500 ease-in-out`}
            src={item.images[0]}
            alt={item.title}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && (
            <div className="w-full h-56 sm:h-64 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300">{item.title}</h3>
        <p className="text-gray-600">Organic Cotton, fairtrade certified</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <svg key={index} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L0 7.455l6.561-.954L10 1l2.439 5.501L19 7.455l-5.245 4.09 1.123 6.545L10 15z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">(121)</span>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <button
          onClick={() => navigate(`/products/${item.slug}`)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded focus:outline-none focus:ring-4 focus:ring-black transition-colors duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};  

export default ItemCard;
