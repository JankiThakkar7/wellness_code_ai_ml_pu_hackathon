import { useEffect, useState } from "react";
import userImg from "/user.png";
import backDrop from "/doctorBack.jpg";
import Text from "../../components/Text";
const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handelBackToDoctors = () => {
    setSelectedDoctor(null);
  };

  const fetchDoctors = () => {
    fetch("http://localhost:8080/healthily/api/admin/allDoctor", {
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
        setDoctors(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDoctorDetails = () => {
    const body = {
      email: selectedDoctor?.email,
    };
    fetch("http://localhost:8080/healthily/api/doctor/viewDoctor", {
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
        setDoctorDetails(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (selectedDoctor) {
      console.log(selectedDoctor);
      fetchDoctorDetails();
    } else {
      fetchDoctors();
    }
  }, [selectedDoctor]);

  const filteredDoctors = doctors.filter((doctor) => {
    const { name, email, phoneNumber, specialization } = doctor;
    const searchKeys = [name, email, phoneNumber, specialization]
      .join(" ")
      .toLowerCase();
    return searchKeys.includes(searchTerm.toLowerCase());
  });

  const handelRemoveClick = () => {
    setIsConfirmationVisible(true);
  };

  const handleConfirmationNo = () => {
    setIsConfirmationVisible(false);
  };

  const handleConfirmationYes = () => {
    setIsConfirmationVisible(false);
    setSelectedDoctor(null);
    const body = {
      email: doctorDetails?.email,
    };

    fetch("http://localhost:8080/healthily/api/doctor/deleteDoctor", {
      method: "DELETE",
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
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="h-full overflow-auto">
        <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
          {selectedDoctor ? "Doctor Details" : "All Doctors"}
        </div>
        {!selectedDoctor ? (
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
                {filteredDoctors.map((doctor, index) => (
                  <div
                    className="flex gap-4 items-center bg-[#efeeff] p-4 rounded-lg"
                    key={index}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <img
                      className="size-14 rounded-full"
                      src={doctor?.profileImg}
                      alt="User"
                    />
                    <div>
                      <div className="font-medium">
                        {doctor?.firstName + " " + doctor?.lastName}
                      </div>
                      <div className="text-slate-400">
                        {doctor?.specialization}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 h-[90%]">
              <span
                className="material-symbols-rounded text-3xl text-[#605BFF] cursor-pointer"
                onClick={handelBackToDoctors}
              >
                keyboard_backspace
              </span>
              <div className="flex-grow flex flex-col gap-2">
                <div className="w-full bg-[#efeeff] h-[200px] overflow-hidden object-cover rounded-md">
                  <img src={backDrop} alt="" className="w-full" />
                </div>
                <div className="px-8">
                  <img
                    src={doctorDetails?.profileImg}
                    alt=""
                    className="size-24 mt-[-5%] border-4 border-white bg-white rounded-full"
                  />
                </div>
                <div className="px-8 pt-2 text-3xl font-semibold text-[#605bff]">
                  {doctorDetails?.name}
                </div>
                <div className="px-8 text-2xl font-medium text-slate-500">
                  {doctorDetails?.specialization}
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text label={"Email Id"} value={doctorDetails?.email} />
                </div>
                <div className="px-8 text-lg font-medium text-slate-500">
                  <Text
                    label={"Contact"}
                    value={doctorDetails?.contactNumber}
                  />
                </div>
              </div>
              <div className="px-8">
                <button
                  onClick={handelRemoveClick}
                  className="px-8 py-2 rounded-md text-white bg-red-500"
                >
                  Remove Doctor
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {isConfirmationVisible && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#7f7f7f80]">
            <div className="flex flex-col items-center justify-center gap-6 p-4 border rounded-md bg-[#efeeff]">
              <div className="text-xl font-medium text-slate-500">
                Are sure to remove Doctor?
              </div>
              <div className="flex gap-4 w-full">
                <button
                  className="w-full px-4 py-1 bg-red-100 border-red-400 border rounded-md text-lg font-medium text-red-500"
                  onClick={handleConfirmationYes}
                >
                  Yes
                </button>
                <button
                  className="w-full px-4 py-1 bg-[#605BFF] rounded-md text-lg font-medium text-white"
                  onClick={handleConfirmationNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AllDoctors;
