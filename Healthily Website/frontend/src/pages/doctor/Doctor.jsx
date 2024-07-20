import Container from "../../components/Container";
import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/navbar/Navbar";
import ProfileForm from "./profileForm/ProfileForm";
import { setDoctorPresence } from "./DoctorPresentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Doctor = ({ user }) => {
  const { isDoctorPresent } = useSelector((state) => state.doctorPresent);
  const dispatch = useDispatch();
  const checkDoctor = async (email) => {
    try {
      const response = await fetch(
        "http://localhost:8080/healthily/api/doctor/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        dispatch(setDoctorPresence(true));
      } else {
        console.error("Error checking doctor:", response.status);
      }
    } catch (error) {
      console.error("Error checking doctor:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      checkDoctor(user?.email);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col h-screen bg-[#f5f6f7]">
        <Navbar user={user} logoColor={"text-black"} />
        <Container
          OrgComp={
            <>
              {isDoctorPresent ? (
                <Dashboard role={user?.role} />
              ) : (
                <ProfileForm user={user} checkDoctor={checkDoctor} />
              )}
            </>
          }
        />
        <footer className="w-full text-center font-semibold py-1">© Copyright 2024 Healthily</footer>
      </div>
    </>
  );
};
export default Doctor;
