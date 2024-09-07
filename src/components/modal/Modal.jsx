/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaArrowLeft, FaArrowRight, FaTimes, FaCheck } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Modal.css"; // Assuming you have styles here
import Slider from "react-slick";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const slots = [
  "00:00 - 05:59",
  "06:00 - 11:59",
  "12:00 - 17:59",
  "18:00 - 23:59",
];

const generateDates = (startDate, numberOfDays) => {
  const dates = [];
  const date = new Date(startDate);
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(date);
    dates.push({
      date: currentDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      slots,
    });
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const Modal = ({ isOpen, onClose,slot:item }) => {
  console.log("this is slot data",item)
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [lastClickedSlot, setLastClickedSlot] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const daysToShow = 7;
  const startDate = new Date();

  const timeSlots = generateDates(startDate, 30); // Generate 30 days

  const nextDates = () =>
    setCurrentDayIndex((prev) =>
      Math.min(prev + daysToShow, timeSlots.length - daysToShow)
    );
  const prevDates = () =>
    setCurrentDayIndex((prev) => Math.max(prev - daysToShow, 0));

  const handleSlotClick = (slot) => {
    setClickCount((prev) => {
      const newCount = prev + 1;

      if (newCount === 1) {
        // First click: Toggle selection of the current slot
        const isSelected = selectedSlots.some(
          (s) => s.date === slot.date && s.index === slot.index
        );
        if (isSelected) {
          setSelectedSlots((prev) =>
            prev.filter(
              (s) => !(s.date === slot.date && s.index === slot.index)
            )
          );
        } else {
          setSelectedSlots([slot]);
        }
        setLastClickedSlot(slot);
      } else if (newCount === 2) {
        // Second click: Select range from last clicked slot to current slot
        if (lastClickedSlot) {
          const rangeSlots = getRangeSlots(lastClickedSlot, slot);
          setSelectedSlots((prev) => {
            const newSelectedSlots = [
              ...prev.filter(
                (s) =>
                  !rangeSlots.some(
                    (r) => r.date === s.date && r.index === s.index
                  )
              ),
              ...rangeSlots,
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
    const startDateIndex = timeSlots.findIndex(
      (d) => d.date === startSlot.date
    );
    const endDateIndex = timeSlots.findIndex((d) => d.date === endSlot.date);

    const rangeSlots = [];

    for (let i = startDateIndex; i <= endDateIndex; i++) {
      const slots = timeSlots[i].slots.map((_, index) => ({
        date: timeSlots[i].date,
        index,
      }));

      if (i === startDateIndex) {
        slots.splice(0, startSlot.index);
      }
      if (i === endDateIndex) {
        slots.splice(endSlot.index + 1);
      }

      rangeSlots.push(...slots);
    }

    return rangeSlots;
  };

  const settings = {
    autoPlay: true,
    dots: false,
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
        <Slider className="mb-4" {...settings}>
          <img
            src="https://dfkjvbenn7r2b.cloudfront.net/img/truck_mockups/XL.png"
            alt="Vehicle"
            className="w-full h-auto object-cover"
          />
          <img
            src="https://dfkjvbenn7r2b.cloudfront.net/img/truck_mockups/XL.png"
            alt="Vehicle"
            className="w-full h-auto object-cover"
          />
        </Slider>
        <div className="w-full bg-blue-300 py-2 text-center">
          <h1 className="text-xl font-bold"> Aktion: 6 Stunden ab nur € 9 </h1>
        </div>
        <Tabs>
          <TabList className={"flex text-center py-3 items-center justify-center border-0"}>
            <Tab className={" py-3 flex-1 cursor-pointer font-bold"}>Time Table</Tab>
            <Tab className={"py-3 flex-1 cursor-pointer font-bold"}>Details</Tab>
          </TabList>

          <TabPanel>
            {/* Title and Subtitle */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold">Select Your Vehicle</h1>
              <h3 className="text-xl">
                data getting from props: {item.name}
              </h3>
              <p className="text-gray-600">
                Book your time slot and get ready for the ride!
              </p>
              <div className="w-full bg-red-500 py-3">
                price: {selectedSlots.length * 10}
              </div>
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
                      <th className="border p-2 sticky left-0 bg-white">
                        Date
                      </th>
                      {slots.map((_, index) => (
                        <th key={index} className="border p-2 text-center">
                          {_}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots
                      .slice(currentDayIndex, currentDayIndex + daysToShow)
                      .map((slotData, i) => (
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
                                    (s) =>
                                      s.date === slotData.date &&
                                      s.index === index
                                  )
                                    ? "bg-gray-300"
                                    : "bg-white"
                                }`}
                              >
                                {selectedSlots.some(
                                  (s) =>
                                    s.date === slotData.date &&
                                    s.index === index
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
                <button
                  onClick={prevDates}
                  className="text-orange-500"
                  disabled={currentDayIndex === 0}
                >
                  <FaArrowLeft size={24} />
                </button>
                <button
                  onClick={nextDates}
                  className="text-orange-500"
                  disabled={currentDayIndex + daysToShow >= timeSlots.length}
                >
                  <FaArrowRight size={24} />
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex items-center justify-between px-2">
              <div>
                <p> Größen-Gruppe : XXL</p>
                <p>Automodell :</p>
                <p>Farbe :</p>
                <p>Sitze : </p>
                <p>Schaltung : </p>
                <p>Kraftstoff : </p>
                <p>Gewicht : </p>
                <p>Max. Zuladung : </p>
                <p>Befestigungsösen : </p>
                <p>Schlüsselloses System :</p>
                <p>Anhängerkupplung : </p>
                <p> - max Zuladung : </p>
                <p>- max Zuladung (gebremst) :</p>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
