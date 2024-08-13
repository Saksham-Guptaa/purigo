import React from "react";

const ItemCardSkeleton = () => {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-56 bg-gray-200"></div>
      </div>
      <div className="p-4">
        <div className="text-lg font-semibold text-gray-800 bg-gray-200 h-8 mb-2"></div>
        <div className="text-gray-600 bg-gray-200 h-6 mb-2"></div>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-yellow-500">
            <div className="w-4 h-4 bg-gray-200 mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 mr-1"></div>
            <div className="w-4 h-4 bg-gray-200 mr-1"></div>
            <div className="w-4 h-4 bg-gray-200"></div>
          </div>
          <div className="text-sm text-gray-600 ml-2 bg-gray-200 h-4"></div>
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold text-gray-900 bg-gray-200 h-8"></div>
        </div>
      </div>
      <div className="p-4 bg-gray-100">
        <div className="w-full px-4 py-2 text-sm font-medium text-white bg-[#013C28] rounded hover:bg-[#013c28df] focus:outline-none focus:bg-[#013c28ba] "></div>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
