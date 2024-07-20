import React, { useState, useEffect } from "react";
import Text from "./Text";
import Report from "./Report";

const AppointmentDetails = ({ role, appointmentID, onBackToAppointments }) => {
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const fetchAppointmentData = () => {
      fetch(`http://localhost:8080/healthily/api/appointment/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: appointmentID }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setAppointmentData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchAppointmentData();
  }, [appointmentID]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <span
          className="material-symbols-rounded text-3xl text-[#605BFF] cursor-pointer"
          onClick={onBackToAppointments}
        >
          keyboard_backspace
        </span>
        {/* <Text label={"ID"} value={appointmentID} /> */}
        <Text label={"Date"} value={appointmentData?.date} />
        <Text label={"Time"} value={appointmentData?.time} />
        <Text
          label={"Status"}
          value={appointmentData?.status === false ? "Booked" : "Diagnosed"}
        />
        <Text label={"Title"} value={appointmentData?.title} />
        <Text label={"Doctor Name"} value={appointmentData?.doctorName} />
        <Text
          label={"Specialization"}
          value={appointmentData?.specialization}
        />
        <Text label={"Patient Name"} value={appointmentData?.patientName} />
        <Text label={"Description"} value={appointmentData?.description} />
        {!appointmentData?.status ? (
          <>
            {role === "PATIENT" || role === "ADMIN" ? (
              ""
            ) : (
              <Report appointmentId={appointmentID} />
            )}
          </>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <div className="text-lg font-medium text-[#605BFF] w-[150px] shrink-0">
                Report
              </div>
              <div className="w-full h-[200px] overflow-y-auto">
                <div className="text-lg font-medium text-slate-500">
                  {appointmentData?.report}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AppointmentDetails;
