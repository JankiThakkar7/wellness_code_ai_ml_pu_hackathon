import userImg from "/user.png";
import backDrop from "/doctorBack.jpg";
import Text from "../../components/Text";
import { useEffect, useState } from "react";
import UpdatePatientForm from "./UpdatePatientForm";

const PatientProfile = ({ user }) => {
  const [patient, setPatient] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/healthily/api/patient/viewPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPatient(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="h-full overflow-auto">
        {edit ? (
          <>
            <UpdatePatientForm
              user={user}
              onClickSet={() => {
                setEdit(false);
              }}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 h-[85%] overflow-auto">
              <div className="w-full bg-[#efeeff] h-[200px] overflow-hidden object-cover rounded-md">
                <img src={backDrop} alt="" className="w-full" />
              </div>
              <div className="px-8">
                <img
                  src={user?.image}
                  alt=""
                  className="size-24 mt-[-5%] border-4 border-white rounded-full"
                />
              </div>
              <div className="flex-grow flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="px-8 pt-2 text-3xl font-semibold text-[#605bff]">
                    {user?.name}
                  </div>
                  <div className="px-8">
                    <button
                      onClick={() => {
                        setEdit(true);
                      }}
                      className="px-8 py-2 rounded-md text-white bg-[#605bff]"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div className="px-8 text-2xl font-medium text-slate-500">
                  Patient
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text label={"Email Id"} value={patient?.email} />
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text label={"Contact"} value={patient?.phoneNumber} />
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text label={"Aadhar-card"} value={patient?.aadhar} />
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text label={"Birth Date"} value={patient?.birthDate} />
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text label={"Blood Group"} value={patient?.bloodGroup} />
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text
                    label={"Address"}
                    value={
                      patient?.address?.building +
                      ", " +
                      patient?.address?.city +
                      ", " +
                      patient?.address?.houseNo
                    }
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default PatientProfile;
