import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'react-tabs/style/react-tabs.css';

const VehicleBooking = () => {
  // State for selected time, tab, and date range navigation
  const [selectedTime, setSelectedTime] = useState(null);
  const [dateRange, setDateRange] = useState(0); // For navigating date ranges

  // Example dates and time slots
  const timeSlots = [
    { date: '6. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
    { date: '7. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
    { date: '8. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
    { date: '9. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
    { date: '10. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
    { date: '11. Sept', slots: ['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'] },
  ];

  // Function to handle next 5 days
  const nextDates = () => setDateRange((prev) => prev + 1);
  const prevDates = () => setDateRange((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Cross Button */}
      <div className="absolute top-2 left-2">
        <button className="text-red-500 text-xl font-bold">X</button>
      </div>

      {/* Image */}
      <div className="w-full h-64 bg-gray-300 mb-4">
        <img src="https://via.placeholder.com/1000x400" alt="Vehicle" className="w-full h-full object-cover" />
      </div>

      {/* Header and Subtitle */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Select Your Vehicle</h1>
        <p className="text-gray-600">Book your time slot and get ready for the ride!</p>
      </div>

      {/* Tabs */}
      <Tabs>
        <TabList className="flex justify-center mt-4">
          <Tab className="w-1/2 text-center border-b-2 cursor-pointer p-2">Time Selection</Tab>
          <Tab className="w-1/2 text-center border-b-2 cursor-pointer p-2">Info</Tab>
        </TabList>

        {/* Time Selection Tab */}
        <TabPanel>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
            
            {/* Time Slot Table */}
            <div className="grid grid-cols-5 gap-4 border-t border-l">
              {/* Top Row: Time Slot Titles */}
              <div className="border-b border-r p-2">Date / Time</div>
              {['00:00 - 05:59', '06:00 - 11:59', '12:00 - 17:59', '18:00 - 23:59'].map((range, index) => (
                <div key={index} className="border-b border-r p-2 text-center font-semibold">
                  {range}
                </div>
              ))}

              {/* Table Rows: Dates and Availability */}
              {timeSlots.slice(dateRange, dateRange + 6).map((slotData, i) => (
                <>
                  {/* Date Column */}
                  <div key={i} className="border-b border-r p-2">
                    {slotData.date}
                  </div>

                  {/* Time Slot Columns */}
                  {slotData.slots.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`border-b border-r p-2 text-center cursor-pointer ${selectedTime === time ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                    >
                      {time === 'X' ? 'X' : 'Select'}
                    </button>
                  ))}
                </>
              ))}
            </div>

            {/* Next/Prev Arrows */}
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
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
            <p>
              This vehicle is perfect for long trips with its spacious seating, advanced features, and fuel efficiency.
              More details to follow here.
            </p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default VehicleBooking;
