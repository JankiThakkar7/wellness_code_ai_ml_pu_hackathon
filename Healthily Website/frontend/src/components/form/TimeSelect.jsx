import React, { useState, useEffect } from "react";

const TimeSelect = ({ register, errors }) => {
  const [minTime, setMinTime] = useState("09:00");
  const [maxTime, setMaxTime] = useState("17:00");
  const [timeOptions, setTimeOptions] = useState([]);

  useEffect(() => {
    const generateTimeOptions = () => {
      const options = [];
      const startTime = new Date(`2000-01-01T${minTime}:00`);
      const endTime = new Date(`2000-01-01T${maxTime}:00`);
      let currentTime = startTime;

      while (currentTime <= endTime) {
        const timeString = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
        currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
      }

      setTimeOptions(options);
    };

    generateTimeOptions();
  }, [minTime, maxTime]);

  return (
    <>
      <select
        {...register("time", { required: "Select time slot" })}
        name="time"
        className="my-2 border-b-2 border-[#605BFF] focus:outline-none px-1"
      >
        <option value="">Select Time</option>
        {timeOptions}
      </select>
      {errors.time && (
        <span className="text-red-500">{errors.time.message}</span>
      )}
    </>
  );
};

export default TimeSelect;
