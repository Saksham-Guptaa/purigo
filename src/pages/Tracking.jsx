import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logonobg from "../assets/logonobg.png";

const ShipmentTracking = () => {
  const navigate = useNavigate();
  const [searchBy, setSearchBy] = useState("Order ID");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${inputValue}`);
  };

  useEffect(() => {
    document.title = "Track your product | Purigo"
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <div className="text-center mb-6">
      <img src={logonobg} className="mx-auto mb-4 h-24" alt="Purigo" />
      <h2 className="text-2xl font-bold text-black ">
        Track status of your shipment
      </h2>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Enter ${searchBy} to search`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border text-black border-green-600 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 text-white rounded-lg transition-all bg-black hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-600 dark:focus:ring-[#FFA62F]"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default ShipmentTracking;
