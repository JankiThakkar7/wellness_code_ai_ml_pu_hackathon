import TimeSelect from "../../../components/form/TimeSelect";
import PDoctorComp from "../../../components/patientComp/PDoctorComp";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewAppoint = ({ user }) => {
  const [appointment, setAppointment] = useState(false);
  const [open, setOpen] = useState(false);
  const [availableDoctor, setAvailableDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSnackbar = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (selectedDoctor) {
      const body = {
        ...data,
        doctorEmail: selectedDoctor?.email,
        doctorName: selectedDoctor?.dname,
        patientEmail: user?.email,
        patientName: user?.name,
        specialization: selectedDoctor?.dqualify,
      };
      console.log(body);

      fetch("http://localhost:8080/healthily/api/appointment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            setAppointment(true);
            handleSnackbar();
            console.log("Appointment booked successfully!");
          } else {
            console.error("Error booking appointment.");
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
      reset();
      setSelectedDoctor(null);
      setAvailableDoctor([]);
    } else {
      const date = new Date(data.date);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const body = {
        day: days[date.getDay()],
        ...data,
      };

      fetch("http://localhost:8080/healthily/api/doctor/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error("Error checking availability.");
          }
        })
        .then((data) => {
          setAvailableDoctor(data);
          if (data.length === 0) {
            console.log(availableDoctor);
            console.log("too foo");
            handleSnackbar();
            return;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
        New Appointment
      </div>
      <div className="h-[88%] overflow-auto my-4">
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:w-[500px] w-full gap-4"
          >
            <div>
              <input
                {...register("title", { required: "Title is required" })}
                className="my-2 border-b-2 border-[#605BFF] text-2xl focus:outline-none px-1 w-full"
                type="text"
                placeholder="Title..."
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>
            <div>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="my-2 border-b-2 border-[#605BFF] text-xl focus:outline-none px-1 w-full"
                type="text"
                rows={1}
                placeholder="Description"
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <input
                {...register("date", { required: "Date is required" })}
                type="date"
                className="my-2 border-b-2 border-[#605BFF] focus:outline-none px-1 w-full"
              />
              {errors.date && (
                <span className="text-red-500">{errors.date.message}</span>
              )}
            </div>
            <TimeSelect register={register} errors={errors} />
            {availableDoctor.length > 0 ? (
              <>
                <div className="h-[200px] bg-[#EFEEFF] p-3 overflow-auto grid grid-cols-1 md:grid-cols-1 gap-4">
                  {availableDoctor.map((doctor, index) => (
                    <PDoctorComp
                      onClick={setSelectedDoctor}
                      dname={doctor?.name}
                      dqualify={doctor?.specialization}
                      dimage={doctor?.image}
                      email={doctor?.email}
                      key={index}
                    />
                  ))}
                </div>
                {selectedDoctor ? (
                  <div className="my-2 flex gap-4 bg-white p-2 rounded-md border border-[#605BFF]">
                    <img
                      className="size-12 border-[#605bff] border rounded-full"
                      src={selectedDoctor?.dimage}
                      alt=""
                    />
                    <div>
                      <div className="font-medium">{selectedDoctor?.dname}</div>
                      <div className="text-slate-400">
                        {selectedDoctor?.dqualify}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="my-4 bg-[#605BFF] text-white p-2 rounded-md"
            >
              {selectedDoctor ? "Book Appointment" : "Check Availability"}
            </button>
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={!appointment ? "error" : "success"}>
          {!appointment ? "No Slot" : "Appoint booked"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewAppoint;
