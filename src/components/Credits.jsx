import React from 'react';

const FssaiAndMadeInIndia = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Our Certifications</h2>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full lg:w-1/2">
            <img src="./1707841565fssai-logo-png-black.png" alt="FSSAI Approved" className="w-32 h-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">FSSAI Approved</h3>
            <p className="text-gray-600 dark:text-gray-400">Our products are certified and approved by the Food Safety and Standards Authority of India.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full lg:w-1/2">
            <img src="./WhatsApp Image 2024-06-22 at 11.51.58_75547cf4.jpg" alt="Made in India" className="w-32 h-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Made in India</h3>
            <p className="text-gray-600 dark:text-gray-400">Proudly made in India, contributing to the vision of Atmanirbhar Bharat.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FssaiAndMadeInIndia;
