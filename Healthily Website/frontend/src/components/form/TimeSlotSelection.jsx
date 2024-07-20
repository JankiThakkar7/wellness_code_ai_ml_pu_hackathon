import React, { useState } from "react";

const TimeSlotSelection = ({
  name,
  register,
  requiredMessage,
  day,
  errors,
}) => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const handleTimeSlotChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTimeSlots([...selectedTimeSlots, value]);
    } else {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== value));
    }
  };

  const timeSlots = [
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "12:30 PM", label: "12:30 PM" },
    { value: "01:00 PM", label: "01:00 PM" },
    { value: "01:30 PM", label: "01:30 PM" },
    { value: "02:00 PM", label: "02:00 PM" },
    { value: "03:00 PM", label: "03:00 PM" },
    { value: "03:30 PM", label: "03:30 PM" },
    { value: "04:00 PM", label: "04:00 PM" },
    { value: "04:30 PM", label: "04:30 PM" },
    { value: "05:00 PM", label: "05:00 PM" },
  ];

  return (
    <div>
      <div className="mb-1 font-medium">{day}</div>
      {timeSlots.map((slot) => (
        <div key={slot.value}>
          <input
            type="checkbox"
            id={`${name}-${slot.value}`}
            value={slot.value}
            {...register(`timeSlots.${name}`, { required: requiredMessage })}
            onChange={handleTimeSlotChange}
            checked={selectedTimeSlots.includes(slot.value)}
          />
          <label htmlFor={`${name}-${slot.value}`} className="ml-2">
            {slot.label}
          </label>
        </div>
      ))}
      {errors[`timeSlots.${name}`] && (
        <p className="text-red-500">{errors[`timeSlots.${name}`]?.message}</p>
      )}
    </div>
  );
};

export default TimeSlotSelection;
