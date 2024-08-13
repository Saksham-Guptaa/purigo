import React from 'react';
import { FaLeaf, FaSeedling, FaCubes, FaHandsHelping, FaTree } from 'react-icons/fa';

const WhyUs = () => {
  return (
    <div className="bg-white py-10 shadow-lg">
      <div className="text-center text-black text-3xl font-extrabold mb-6">
        Why Purigo?
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:space-x-24 px-6">
        <div className="flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <FaLeaf className="text-6xl text-black mb-2 shadow-lg" />
          <div className="text-black text-lg font-semibold">No added flavours</div>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <FaSeedling className="text-6xl text-black mb-2 shadow-lg" />
          <div className="text-black text-lg font-semibold">Farm Fresh</div>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <FaCubes className="text-6xl text-black mb-2 shadow-lg" />
          <div className="text-black text-lg font-semibold">Made in Small Batches</div>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <FaHandsHelping className="text-6xl text-black mb-2 shadow-lg" />
          <div className="text-black text-lg font-semibold">Positive Impact</div>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <FaTree className="text-6xl text-black mb-2 shadow-lg" />
          <div className="text-black text-lg font-semibold">Rooted in Tradition</div>
        </div>
      </div>
    </div>
  );
};  

export default WhyUs;
