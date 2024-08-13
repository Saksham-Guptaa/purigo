import React from 'react';
import logo from '../assets/logonobg.png';

const Category = () => {
  return (
    <div className="bg-[#FFE8C8] py-10">
      <div className='flex justify-center items-center mb-3 space-x-4'>
        <div className='flex-grow border md:border-2 border-[#FFA62F]'></div>
        <h2 className='text-[#FFA62F] sm:text-lg md:text-2xl lg:text-3xl font-bold text-center'>Shop By Category</h2>
        <div className='flex-grow border md:border-2 border-[#FFA62F]'></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div className="relative bg-pink-200 p-4 rounded-lg shadow-lg hover:scale-110 transition-all">
          <img src={logo} alt="Ghee" className="w-full h-40 object-contain mb-4"/>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">GHEE</div>
          <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">SHOP NOW</button>
        </div>
        <div className="relative bg-yellow-200 p-4 rounded-lg shadow-lg hover:scale-110 transition-all">
          <img src={logo} alt="Honey" className="w-full h-40 object-contain mb-4"/>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">HONEY</div>
          <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">SHOP NOW</button>
        </div>
        <div className="relative bg-blue-200 p-4 rounded-lg shadow-lg hover:scale-110 transition-all">
          <img src={logo} alt="Stone-Pressed Oils" className="w-full h-40 object-contain mb-4"/>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">STONE-PRESSED OILS</div>
          <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">SHOP NOW</button>
        </div>
        <div className="relative bg-green-200 p-4 rounded-lg shadow-lg hover:scale-110 transition-all">
          <img src={logo} alt="Super Foods" className="w-full h-40 object-contain mb-4"/>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">SUPER FOODS</div>
          <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">SHOP NOW</button>
        </div>
        <div className="relative bg-orange-200 p-4 rounded-lg shadow-lg hover:scale-110 transition-all">
          <img src={logo} alt="Nut Butters" className="w-full h-40 object-contain mb-4"/>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">NUT BUTTERS</div>
          <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">SHOP NOW</button>
        </div>
        <div className="relative bg-gray-200 p-4 rounded-lg shadow-lg hover:scale-110 transition-all">
          <img src={logo} alt="Shop All" className="w-full h-40 object-contain mb-4"/>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">SHOP ALL</div>
          <button className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">SHOP NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
