import {
  Navigate,
  redirect,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import Patient from "./pages/patient/Patient";
import NewAppoint from "./pages/patient/newAppointment/NewAppoint";
import Admin from "./pages/admin/Admin";
import AddDoctor from "./pages/admin/addDoctor/AddDoctor";
import AllAppointments from "./pages/allAppointments/AllAppointments";
import UpcomingAppointment from "./pages/upcomingAppointment/UpcomingAppointment";
import Doctor from "./pages/doctor/Doctor";
import AllDoctors from "./pages/admin/AllDoctors";
import ALLPatient from "./pages/admin/ALLPatient";
import AdminProfile from "./pages/admin/AdminProfile";
import PatientProfile from "./pages/patient/PatientProfile";
import DoctorProfile from "./pages/doctor/DoctorProfile";

function App() {
  const location = useLocation();
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3000/auth/api/login/success", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            console.log("res okk");
            return res.json();
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error("Fetch error", err);
        });
    };
    getUser();
  }, []);
  const PrivateRoute = ({ role, children }) => {
    return user && user.role === role ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      <a href="http://localhost:5173" target="_blank"
        className="p-0 absolute bottom-10 right-16 size-14 bg-[#605bff] flex justify-center items-center rounded-xl cursor-pointer"
      >
        <span class="material-symbols-rounded text-3xl text-white">chat</span>
      </a>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            user ? (
              user.role === "PATIENT" ? (
                <Navigate to="/patient" />
              ) : user.role === "DOCTOR" ? (
                <Navigate to="/doctor" />
              ) : user.role === "ADMIN" ? (
                <Navigate to="/admin" />
              ) : (
                ""
              )
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/patient"
          element={
            <PrivateRoute role="PATIENT">
              <Patient user={user} />
            </PrivateRoute>
          }
        >
          <Route path="profile" element={<PatientProfile user={user} />} />
          <Route path="" element={<UpcomingAppointment user={user} />} />
          <Route path="new" element={<NewAppoint user={user} />} />
          <Route
            path="appointments"
            element={<AllAppointments user={user} />}
          />
        </Route>
        <Route
          path="/doctor"
          element={
            <PrivateRoute role="DOCTOR">
              <Doctor user={user} />
            </PrivateRoute>
          }
        >
          <Route path="profile" element={<DoctorProfile user={user} />} />
          <Route path="" element={<UpcomingAppointment user={user} />} />
          <Route
            path="appointments"
            element={<AllAppointments user={user} />}
          />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">
              <Admin user={user} />
            </PrivateRoute>
          }
        >
          <Route path="profile" element={<AdminProfile />} />
          <Route path="addDoctor" element={<AddDoctor />} />
          <Route path="" element={<UpcomingAppointment user={user} />} />
          <Route
            path="appointments"
            element={<AllAppointments user={user} />}
          />
          <Route path="doctors" element={<AllDoctors />} />
          <Route path="patients" element={<ALLPatient />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
