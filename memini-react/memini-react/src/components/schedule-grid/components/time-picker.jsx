import React, { useState } from 'react';

const TimePicker = ({label, labelClassName}) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  // Generate hour and minute options
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="flex flex-col space-y-2">
      <label className={`text-gray-700 font-medium ${labelClassName}`}>{label}</label>
      <div className="flex space-x-2">
        {/* Hour Select */}
        <select
          className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-300"
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
        >
          <option value="" disabled>
            HH
          </option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        {/* Minute Select */}
        <select
          className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring focus:ring-blue-300"
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(e.target.value)}
        >
          <option value="" disabled>
            MM
          </option>
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
