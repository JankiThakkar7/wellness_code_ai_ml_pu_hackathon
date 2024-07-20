import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { useDispatch } from "react-redux";
import { setDate } from "./CalendarSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateClick = (day) => {
    setSelectedDate(day);
    const formattedDate = format(day, "yyyy-MM-dd");
    dispatch(setDate(formattedDate));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-lg">
          <span className="material-icons-round">chevron_left</span>
        </button>
        <div className="text-lg font-medium text-[#605BFF]">
          {format(currentDate, "MMMM yyyy")}
        </div>
        <button onClick={nextMonth} className="text-lg">
          <span className="material-icons-round">chevron_right</span>
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    let count = 0;
    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={count++} className="text-center text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`cursor-pointer size-10 flex justify-center items-center text-center ${
              !isSameMonth(day, monthStart) ? "text-gray-400" : ""
            } 
              ${
                isSameDay(day, selectedDate)
                  ? "border rounded-full border-[#605BFF]"
                  : ""
              }
              ${
                isToday(day) ? "bg-[#DFDEFF] text-[#605BFF] rounded-full" : ""
              }`}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    // Pad the beginning of the month
    while (rows.length < 6 && rows[0].key > 0) {
      rows.unshift(<div key={-1} className="grid grid-cols-7 gap-1" />);
    }

    // Pad the end of the month
    while (rows.length < 6) {
      rows.push(<div key={rows.length} className="grid grid-cols-7 gap-1" />);
    }

    return rows;
  };

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setCurrentDate((prev) => addMonths(prev, -1));
  };

  return (
    <div className="w-full max-w-lg  py-12">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
