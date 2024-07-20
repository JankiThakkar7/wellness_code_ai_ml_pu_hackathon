import { useEffect, useState } from "react";
import Appointment from "../../components/Appointment";
import AppointmentDetails from "../../components/AppointmentDetails";
import NoData from "../../components/NoData";
import { useSelector } from "react-redux";

const UpcomingAppointment = ({ user }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleBackToAppointments = () => {
    setSelectedAppointment(null);
  };

  const { selectedDate } = useSelector((store) => store.calendar);

  useEffect(() => {
    const fetchUpcomingAppointments = () => {
      let apiEndpoint, method, body;

      if (user.role === "ADMIN") {
        apiEndpoint =
          "http://localhost:8080/healthily/api/admin/upComingAppointment";
        method = "GET";
      } else if (user.role === "PATIENT") {
        apiEndpoint =
          "http://localhost:8080/healthily/api/patient/upComingAppointment";
        method = "POST";
        body = JSON.stringify({ patientEmail: user.email });
      } else if (user.role === "DOCTOR") {
        apiEndpoint =
          "http://localhost:8080/healthily/api/doctor/upComingAppointment";
        method = "POST";
        body = JSON.stringify({ doctorEmail: user.email });
      }

      fetch(apiEndpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => response.json())
        .then((data) => {
          setUpcomingAppointments(data);
        })
        .catch((error) => {
          console.error("Error fetching upcoming appointments:", error);
        });
    };

    const fetchAppointmentsByDate = () => {
      if (selectedDate) {
        let apiEndpoint, method, body;

        if (user.role === "ADMIN") {
          apiEndpoint =
            "http://localhost:8080/healthily/api/admin/appointmentByDate";
          method = "POST";
          body = JSON.stringify({ date: selectedDate });
        } else if (user.role === "PATIENT") {
          apiEndpoint =
            "http://localhost:8080/healthily/api/patient/appointmentByDate";
          method = "POST";
          body = JSON.stringify({
            patientEmail: user.email,
            date: selectedDate,
          });
        } else if (user.role === "DOCTOR") {
          apiEndpoint =
            "http://localhost:8080/healthily/api/doctor/appointmentByDate";
          method = "POST";
          body = JSON.stringify({
            doctorEmail: user.email,
            date: selectedDate,
          });
        }

        fetch(apiEndpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body,
        })
          .then((response) => response.json())
          .then((data) => {
            setUpcomingAppointments(data);
          })
          .catch((error) => {
            console.error("Error fetching appointments by date:", error);
          });
      }
    };

    if (selectedDate) {
      fetchAppointmentsByDate();
    } else {
      fetchUpcomingAppointments();
    }
  }, [user, selectedDate, selectedAppointment]);

  return (
    <>
      <div className="h-full overflow-auto">
        {upcomingAppointments.length > 0 ? (
          <>
            <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
              {!selectedAppointment
                ? "Upcoming Appointments"
                : "Appointment Details"}
            </div>
            {!selectedAppointment ? (
              <>
                <Appointment
                  role={user?.role}
                  appointments={upcomingAppointments}
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
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};
export default UpcomingAppointment;
