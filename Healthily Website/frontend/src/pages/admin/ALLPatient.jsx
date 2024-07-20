import { useEffect, useState } from "react";
import Text from "../../components/Text";
import userImg from "/user.png";
import backDrop from "/doctorBack.jpg";
const ALLPatient = () => {
  const [patients, setPatients] = useState(["kjkjk"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState();

  const handelBackToPatients = () => {
    setSelectedPatient(null);
  };

  const fetchPatients = () => {
    fetch("http://localhost:8080/healthily/api/admin/allPatient", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPatientDetails = () => {
    console.log(selectedPatient);
    const body = {
      email: selectedPatient?.email,
    };

    fetch("http://localhost:8080/healthily/api/patient/viewPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPatientDetails(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (selectedPatient) {
      fetchPatientDetails();
    } else {
      fetchPatients();
    }
  }, [selectedPatient]);

  const filteredPatients = patients.filter((patient) => {
    const { name, email, phoneNumber } = patient;
    const searchKeys = [name, email, phoneNumber].join(" ").toLowerCase();
    return searchKeys.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="h-full overflow-auto">
        <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
          {selectedPatient ? "Patient Details" : "All Patients"}
        </div>
        {!selectedPatient ? (
          <>
            <input
              type="text"
              className="mt-2 w-full rounded p-2  border border-slate-300 focus:outline-[#605BFF] focus:outline-2 focus:bg-[#EFEEFF]"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="h-[80%] overflow-auto my-4">
              <div className="grid grid-cols-3 gap-4">
                {filteredPatients.map((patient, index) => (
                  <div
                    className="flex gap-4 items-center bg-[#efeeff] p-4 rounded-lg"
                    key={index}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <img
                      className="size-14 rounded-full"
                      src={patient?.profileImg}
                      alt="User"
                    />
                    <div>
                      <div className="font-medium">
                        {patient?.firstName + " " + patient?.lastName}
                      </div>
                      <div className="text-slate-400">Patient</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <span
                className="material-symbols-rounded text-3xl text-[#605BFF] cursor-pointer"
                onClick={handelBackToPatients}
              >
                keyboard_backspace
              </span>
              <div className="w-full bg-[#efeeff] h-[200px] overflow-hidden object-cover rounded-md">
                <img src={backDrop} alt="" className="w-full" />
              </div>
              <div className="px-8">
                <img
                  src={selectedPatient?.profileImg}
                  alt=""
                  className="size-24 mt-[-5%] border-4 border-white rounded-full"
                />
              </div>
              <div className="px-8 pt-2 text-3xl font-semibold text-[#605bff]">
                {selectedPatient?.firstName+" "+selectedPatient?.lastName}
              </div>
              <div className="px-8 text-2xl font-medium text-slate-500">
                Patient
              </div>
              <div className="px-8 text-lg font-medium text-slate-500">
                <Text label={"Email Id"} value={patientDetails?.email} />
              </div>
              <div className="px-8 text-lg font-medium text-slate-500">
                <Text label={"Contact"} value={patientDetails?.phoneNumber} />
              </div>
              <div className="px-8 text-lg font-medium text-slate-500">
                <Text label={"Aadhar-card"} value={patientDetails?.aadhar} />
              </div>
              <div className="px-8 text-lg font-medium text-slate-500">
                <Text label={"Birth Date"} value={patientDetails?.birthDate} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ALLPatient;
