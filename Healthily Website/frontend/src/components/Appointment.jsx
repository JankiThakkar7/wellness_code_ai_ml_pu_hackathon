const Appointment = ({ role, appointments, onClick }) => {
  const getColums = () => {
    switch (role) {
      case "ADMIN":
        return [
          { label: "Date", span: 1 },
          { label: "Time", span: 1 },
          { label: "Title", span: 4 },
          { label: "Doctor Name", span: 2 },
          { label: "Patient Name", span: 2 },
          { label: "Status", span: 2 },
        ];
      case "DOCTOR":
        return [
          { label: "Date", span: 2 },
          { label: "Time", span: 2 },
          { label: "Title", span: 4 },
          { label: "Patient Name", span: 2 },
          { label: "Status", span: 2 },
        ];
      case "PATIENT":
        return [
          { label: "Date", span: 2 },
          { label: "Time", span: 2 },
          { label: "Title", span: 4 },
          { label: "Doctor Name", span: 2 },
          { label: "Status", span: 2 },
        ];
      default:
        return [];
    }
  };

  const handleSelectedAppointment = (appointment) => {
    onClick(appointment);
  };

  const columns = getColums();

  return (
    <>
      <div className="grid grid-cols-12 gap-2 py-2 mr-4 mt-4 border-t-2">
        {columns.map(({ label, span }, index) => (
          <div
            key={index}
            className={`col-span-${span} text-center px-2 font-medium text-slate-500`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="h-[75%] overflow-auto">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="grid grid-cols-12 border border-[#605BFF] py-2 mr-2 rounded-md divide-x-2 divide-slate-400 mb-3 cursor-pointer"
            onClick={() => handleSelectedAppointment(appointment)}
          >
            <div
              className={`${
                role === "PATIENT" || role === "DOCTOR"
                  ? "col-span-2"
                  : "col-span-1"
              } text-center px-2`}
            >
              {appointment.date}
            </div>
            <div
              className={`${
                role === "PATIENT" || role === "DOCTOR"
                  ? "col-span-2"
                  : "col-span-1"
              } text-center px-2`}
            >
              {appointment.time}
            </div>
            <div className="col-span-4 px-2">{appointment.title}</div>
            {role === "ADMIN" || role === "PATIENT" ? (
              <div className={"col-span-2 px-2"}>{appointment.doctorName}</div>
            ) : null}
            {role === "ADMIN" || role === "DOCTOR" ? (
              <div className="col-span-2 px-2">{appointment.patientName}</div>
            ) : null}
            <div className="col-span-2 text-center px-2">
              {appointment?.status === false ? "Booked" : "Diagnosed"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Appointment;
