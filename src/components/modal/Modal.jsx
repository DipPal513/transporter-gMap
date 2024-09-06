import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft, FaArrowRight, FaTimes, FaCheck } from 'react-icons/fa';
import './Modal.css'; // Assuming you have styles here

const timeSlots = [
  { date: '6. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
  { date: '7. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
  { date: '8. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
  { date: '9. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
  // Add more dates and slots as needed
];

const Modal = ({ isOpen, onClose }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [lastClickedSlot, setLastClickedSlot] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [dateRange, setDateRange] = useState(0);

  const nextDates = () => setDateRange(prev => Math.min(prev + 7, timeSlots.length - 7));
  const prevDates = () => setDateRange(prev => Math.max(prev - 7, 0));

  const handleSlotClick = (slot) => {
    setClickCount(prev => {
      const newCount = prev + 1;

      const slotAlreadySelected = selectedSlots.some(s => s.date === slot.date && s.index === slot.index);

      if (newCount === 1) {
        // First click: Toggle selection of the current slot
        if (slotAlreadySelected) {
          setSelectedSlots(prev => prev.filter(s => !(s.date === slot.date && s.index === slot.index)));
        } else {
          setSelectedSlots([slot]);
        }
        setLastClickedSlot(slot);
      } else if (newCount === 2) {
        // Second click: Select range from last clicked slot to current slot
        if (lastClickedSlot) {
          const rangeSlots = getRangeSlots(lastClickedSlot, slot);
          setSelectedSlots(prev => {
            const newSelectedSlots = [
              ...prev.filter(s => !rangeSlots.some(r => r.date === s.date && r.index === s.index)),
              ...rangeSlots
            ];
            return newSelectedSlots;
          });
        }
        setLastClickedSlot(slot);
      } else if (newCount === 3) {
        // Third click: Select only the current slot
        setSelectedSlots([slot]);
        setLastClickedSlot(slot);
        setClickCount(0); // Reset click count
      }

      return newCount;
    });
  };

  const getRangeSlots = (startSlot, endSlot) => {
    const startDateIndex = timeSlots.findIndex(d => d.date === startSlot.date);
    const endDateIndex = timeSlots.findIndex(d => d.date === endSlot.date);

    const rangeSlots = [];

    for (let i = startDateIndex; i <= endDateIndex; i++) {
      const slots = timeSlots[i].slots.map((_, index) => ({
        date: timeSlots[i].date,
        index,
      }));

      if (i === startDateIndex) {
        slots.splice(0, startSlot.index + 1);
      }
      if (i === endDateIndex) {
        slots.splice(endSlot.index + 1);
      }

      rangeSlots.push(...slots);
    }

    return rangeSlots;
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative modal-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-xl font-bold rounded-full shadow-md hover:bg-gray-100 p-2"
        >
          <FaTimes />
        </button>

        {/* Image */}
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/1000x400"
            alt="Vehicle"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Select Your Vehicle</h1>
          <p className="text-gray-600">
            Book your time slot and get ready for the ride!
          </p>
        </div>

        {/* Tabs */}
        <div>
          <h2 className="text-xl font-bold bg-red-500 text-white p-2 uppercase">
            Available Time Slots
          </h2>

          {/* Time Slot Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border p-2 sticky left-0 bg-white">Date</th>
                  {timeSlots[0].slots.map((_, index) => (
                    <th key={index} className="border p-2 text-center">
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.slice(dateRange, dateRange + 7).map((slotData, i) => (
                  <tr key={i}>
                    <td className="border p-2 sticky left-0 bg-white">
                      {slotData.date}
                    </td>
                    {slotData.slots.map((_, index) => (
                      <td
                        key={index}
                        className="border cursor-pointer"
                        onClick={() =>
                          handleSlotClick({ date: slotData.date, index })
                        }
                      >
                        <div
                          className={`w-full h-full flex items-center justify-center py-3 ${
                            selectedSlots.some(
                              (s) => s.date === slotData.date && s.index === index
                            )
                              ? 'bg-gray-300'
                              : 'bg-white'
                          }`}
                        >
                          {selectedSlots.some(
                            (s) => s.date === slotData.date && s.index === index
                          ) && <FaCheck className="text-green-500" />}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-4">
            <button onClick={prevDates} className="text-orange-500">
              <FaArrowLeft size={24} />
            </button>
            <button onClick={nextDates} className="text-orange-500">
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
