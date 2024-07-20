import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const AddDoctor = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

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
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:8080/healthily/api/admin/addDoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
         
          handleSnackbar();
          setError(true);
          throw new Error("Network response was not ok");
        }
        handleSnackbar();
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="h-full overflow-auto flex flex-col">
      <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
        Add Doctor
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grow flex flex-col justify-center items-center xl:px-[200px] px-2"
      >
        <div className="w-full flex gap-3 justify-center items-center">
          <input
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter valid email address",
              },
            })}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Doctor Email id..."
            className="w-full rounded px-4 py-2 outline outline-1 outline-slate-300 focus:outline-[#605BFF] focus:outline-2 focus:bg-[#EFEEFF]"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#605BFF] text-white text-lg font-medium rounded-md"
          >
            Add
          </button>
        </div>
        <p className="mt-1 text-red-500">{errors?.email?.message}</p>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={error ? "error" : "success"}>
          {error
            ? "Doctor with this email already exists!"
            : "Doctor Added and Email Sent Successfully."}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default AddDoctor;
