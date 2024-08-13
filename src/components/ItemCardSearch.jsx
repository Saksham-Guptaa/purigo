import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ItemCardSearch = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id, // Assuming 'item' has an 'id' property
      title: item.title,
      price: item.price,
      image: item.images[0], // Assuming 'item' has an 'images' array with at least one image
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          className={`w-full h-40 sm:h-48 object-cover ${imageLoaded ? "block" : "hidden"}`}
          src={item.images[0]}
          alt={item.title}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && (
          <div className="w-full h-40 sm:h-48 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
        <div className="mt-2">
          <span className="text-sm font-bold text-gray-900">Rs. {item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCardSearch;
