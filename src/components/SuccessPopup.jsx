import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPopup = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-md shadow-lg w-80">
        <div className="flex items-center justify-center p-4 border-b border-gray-200">
          <div className="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="ml-2 text-lg font-bold">Awesome!</h4>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-700">
            Your booking has been confirmed. Check your email for details.
          </p>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-green-500"
            onClick={handleClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default SuccessPopup;
