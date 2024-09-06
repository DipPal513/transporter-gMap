import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaArrowLeft, FaArrowRight, FaTimes, FaCheck } from "react-icons/fa";
import "react-tabs/style/react-tabs.css";
import "./Modal.css";

// Sample data for demonstration
const timeSlots = [
  {
    date: "6. Sept",
    slots: ["00:00 - 05:59", "06:00 - 11:59", "12:00 - 17:59", "18:00 - 23:59"],
  },
  {
    date: "7. Sept",
    slots: ["00:00 - 05:59", "06:00 - 11:59", "12:00 - 17:59", "18:00 - 23:59"],
  },
  {
    date: "8. Sept",
    slots: ["00:00 - 05:59", "06:00 - 11:59", "12:00 - 17:59", "18:00 - 23:59"],
  },
  {
    date: "9. Sept",
    slots: ["00:00 - 05:59", "06:00 - 11:59", "12:00 - 17:59", "18:00 - 23:59"],
  },
  // ... Add more dates and slots as needed
];

const Modal = ({ isOpen, onClose }) => {
  const [selectedSlots, setSelectedSlots] = useState([]); // List of selected slots
  const [lastClickedSlot, setLastClickedSlot] = useState(null); // Store the last clicked slot
  const [dateRange, setDateRange] = useState(0);

  // Function to move to the next set of dates
  const nextDates = () => setDateRange((prev) => Math.min(prev + 7, timeSlots.length - 7));

  // Function to move to the previous set of dates
  const prevDates = () => setDateRange((prev) => Math.max(prev - 7, 0));

  // Toggle slot selection or select range if Shift is pressed
  const selectSlot = (slot, shiftKey) => {
    if (shiftKey && lastClickedSlot) {
      // Shift-click: Select range between the last clicked and the current one
      const rangeSlots = getRange(lastClickedSlot, slot);
      setSelectedSlots((prev) => [
        ...prev.filter((s) => !rangeSlots.some((r) => r.date === s.date && r.index === s.index)),
        ...rangeSlots.filter(
          (r) => !prev.some((s) => s.date === r.date && s.index === r.index)
        ),
      ]);
    } else {
      // Toggle individual slot selection
      if (selectedSlots.some((s) => s.date === slot.date && s.index === slot.index)) {
        setSelectedSlots((prev) =>
          prev.filter((s) => !(s.date === slot.date && s.index === slot.index))
        );
      } else {
        setSelectedSlots((prev) => [...prev, slot]);
      }
    }
    setLastClickedSlot(slot);
  };

  // Get the range of slots between two slots
  const getRange = (startSlot, endSlot) => {
    const startIndex = timeSlots.findIndex((d) => d.date === startSlot.date);
    const endIndex = timeSlots.findIndex((d) => d.date === endSlot.date);

    const startDateIndex = Math.min(startIndex, endIndex);
    const endDateIndex = Math.max(startIndex, endIndex);

    const rangeSlots = [];

    for (let i = startDateIndex; i <= endDateIndex; i++) {
      const slots = timeSlots[i].slots.map((_, slotIndex) => ({
        date: timeSlots[i].date,
        index: slotIndex,
      }));

      if (i === startIndex) {
        slots.splice(0, Math.min(startSlot.index, endSlot.index));
      }
      if (i === endIndex) {
        slots.splice(Math.max(startSlot.index, endSlot.index) + 1);
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
        <Tabs>
          <TabList className="flex justify-center mb-4">
            <Tab className="w-1/2 text-center border-b-2 cursor-pointer p-2">
              Time Slots
            </Tab>
            <Tab className="w-1/2 text-center border-b-2 cursor-pointer p-2">
              Info
            </Tab>
          </TabList>

          {/* Time Slots Tab */}
          <TabPanel>
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
                      {timeSlots[0].slots.map((slot, index) => (
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
                            className="border  cursor-pointer"
                            onClick={(e) =>
                              selectSlot({ date: slotData.date, index }, e.shiftKey)
                            }
                          >
                            <div
                              className={`w-full h-full flex items-center justify-center p-3 ${
                                selectedSlots.some(
                                  (s) => s.date === slotData.date && s.index === index
                                )
                                  ? "bg-gray-300"
                                  : "bg-white"
                              } `}
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
          </TabPanel>

          {/* Info Tab */}
          <TabPanel>
            <div>
              <h2 className="text-xl font-bold">Vehicle Information</h2>
              <p>
                This vehicle is perfect for long trips with its spacious seating,
                advanced features, and fuel efficiency. More details to follow here.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
