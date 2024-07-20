import { useEffect, useState } from "react";
import Text from "../../components/Text";
import AppointmentDetails from "../../components/AppointmentDetails";
import Appointment from "../../components/Appointment";

const AllAppointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleBackToAppointments = () => {
    setSelectedAppointment(null);
  };

  const fetchAppointments = async () => {
    let url;
    let method;
    let body;

    if (user.role === "PATIENT") {
      url = "http://localhost:8080/healthily/api/patient/allAppointment";
      method = "POST";
      body = { patientEmail: user?.email };
    } else if (user.role === "DOCTOR") {
      url = "http://localhost:8080/healthily/api/doctor/allAppointment";
      method = "POST";
      body = { doctorEmail: user?.email };
    } else if (user.role === "ADMIN") {
      url = "http://localhost:8080/healthily/api/admin/allAppointment";
      method = "GET";
    }

    if (url) {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setAppointments(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user, selectedAppointment]);

  const filteredAppointments = appointments.filter((appointment) => {
    const {
      title,
      date,
      time,
      status,
      doctorEmail,
      patientEmail,
      doctorName,
      patientName,
    } = appointment;
    const searchKeys = [
      title,
      date,
      time,
      status,
      doctorEmail,
      patientEmail,
      doctorName,
      patientName,
    ]
      .join(" ")
      .toLowerCase();
    return searchKeys.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="h-full overflow-auto">
        <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
          {!selectedAppointment ? "All Appointments" : "Appointment Details"}
        </div>
        {!selectedAppointment ? (
          <>
            <input
              type="text"
              className="mt-2 w-full rounded p-2  border border-slate-300 focus:outline-[#605BFF] focus:outline-2 focus:bg-[#EFEEFF]"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Appointment
              role={user?.role}
              appointments={filteredAppointments}
              onClick={setSelectedAppointment}
            />
          </>
        ) : (
          <>
            <AppointmentDetails
              role={user?.role}
              appointmentID={selectedAppointment?._id}
              onBackToAppointments={handleBackToAppointments}
            />
          </>
        )}
      </div>
    </>
  );
};
export default AllAppointments;
