import ProfileForm from "./profileForm/ProfileForm";
import { setPatientPresence } from "./PatientPresentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Container from "../../components/Container";
import Dashboard from "../../components/Dashboard";

const Patient = ({ user }) => {
  // console.log(user?.email);
  const { isPatientPresent } = useSelector((state) => state.patientPresent);
  const dispatch = useDispatch();
  const checkPatient = async (email) => {
    try {
      const response = await fetch(
        "http://localhost:8080/healthily/api/patient/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        dispatch(setPatientPresence(true));
      } else {
        console.error("Error checking patient:", response.status);
      }
    } catch (error) {
      console.error("Error checking patient:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      checkPatient(user?.email);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col h-screen bg-[#f5f6f7]">
        <Navbar user={user} logoColor={"text-black"} />
        <Container
          OrgComp={
            <>
              {isPatientPresent ? (
                <Dashboard role={user?.role} />
              ) : (
                <ProfileForm user={user} checkPatient={checkPatient} />
              )}
            </>
          }
        />
        <footer className="w-full text-center font-semibold py-1">© Copyright 2024 Healthily</footer>
      </div>
    </>
  );
};
export default Patient;
