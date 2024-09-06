import React from 'react';
import ReactDOM from 'react-dom';
import VehicleBooking from '../booking/Booking'; // Adjust the import path as necessary

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative h-[40vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-xl font-bold"
        >
          X
        </button>
        <VehicleBooking />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
