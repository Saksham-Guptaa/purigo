import React from 'react';

const Popup = ({ popupData, onClose }) => {
  return (
    <div className="fixed left-0 bottom-0 p-4 w-full md:w-auto z-50">
      {popupData && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:flex">
          <img className="md:w-1/3 md:h-auto object-cover h-24 w-24 md:h-32 md:w-32" src={popupData.imageUrl} alt="Card" />
          <div className="p-4 md:w-2/3 flex flex-col justify-center">
            <p className="text-gray-600">
              {popupData.name} from {popupData.place} purchased {popupData.product}{" "}
              {popupData.minutesAgo} {popupData.minutesAgo === 1 ? "minute" : "minutes"} ago.
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
