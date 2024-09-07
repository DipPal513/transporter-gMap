import React from "react";

const CarModal = ({ isOpen, car, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-4xl w-full">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Wähle deine Größe
        </h2>
        <p className="text-center mb-3">
          Es sieht so aus, als gäbe es eine Menge Fahrzeuge in diesem Gebiet.
          Welche Größe möchtest Du haben?
        </p>
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First image */}
          <div className="flex justify-center items-center flex-col">
            <img
              src="https://dfkjvbenn7r2b.cloudfront.net/img/truck_mockups/XL.png"
              alt="Car Image"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <button className="border-0 rounded text-red-500 mt-4 bg-gray-300 px-3 py-1">
              ab 45 € /24 Std
            </button>
            <button className="border-0 rounded text-red-500 mt-4 bg-gray-300 px-3 py-1">
              ab 45 € /24 Std
            </button>
          </div>

          {/* Second image (placeholder, replace if needed) */}
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://dfkjvbenn7r2b.cloudfront.net/img/truck_mockups/XL.png"
              alt="Car Image"
              className="w-full h-auto rounded-lg shadow-md"
            />
            <button className="border-0 rounded text-red-500 mt-4 bg-gray-300 px-3 py-1">
              ab 45 € /24 Std
            </button>
            <button className="border-0 rounded text-red-500 mt-4 bg-gray-300 px-3 py-1">
              ab 45 € /24 Std
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
