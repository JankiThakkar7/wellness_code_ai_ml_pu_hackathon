import Field from "../../../components/form/Field";
import { useForm } from "react-hook-form";
import Radio from "../../../components/form/Radio";
import { useState } from "react";
import TimeSlotSelection from "../../../components/form/TimeSlotSelection";
import Select from "../../../components/form/Select";

const ProfileForm = ({ user, checkDoctor }) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1-");
    setAadharNumber(formattedInput);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const formattedTimeSlots = Object.entries(data.timeSlots).map(
      ([day, slots]) => {
        return { day, time: slots };
      }
    );

    const profileData = {
      profileImg: user?.image,
      email: user?.email,
      ...data,
      timeSlots: formattedTimeSlots,
    };

    console.log(JSON.stringify(profileData));
    setUserProfile(profileData);

    fetch("http://localhost:8080/healthily/api/doctor/saveDoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Doctor data saved successfully");
          checkDoctor(user?.email);
        } else {
          console.error("Error saving patient data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error saving patient data:", error);
      });

    // console.log(JSON.stringify(res));
  };

  const options = [
    { value: "General", label: "General" },
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    { value: "Psychiatrist", label: "Psychiatrist" },
    { value: "Ophthalmologist", label: "Ophthalmologist" },
    { value: "Gynecologist", label: "Gynecologist" },
    { value: "Endocrinologist", label: "Endocrinologist" },
    { value: "Gastroenterologist", label: "Gastroenterologist" },
    { value: "Otolaryngplogies", label: "Otolaryngplogies" },
    { value: "Neurologist", label: "Neurologist" },
  ];

  return (
    <>
      <div className="text-xl md:text-2xl font-medium pb-4">
        Complete your profile
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 xl:grid-cols-3 gap-x-20 gap-y-12 my-8"
      >
        <div className="xl:order-1">
          <Field
            type="text"
            name="firstName"
            label="First Name"
            register={register}
            requiredMessage="Firstname required"
            errorMessage={errors?.firstName?.message}
          />
        </div>
        <div className="xl:order-2">
          <Field
            type="text"
            name="middleName"
            label="Middle Name"
            register={register}
            requiredMessage="Middlename required"
            errorMessage={errors?.middleName?.message}
          />
        </div>
        <div className="xl:order-3">
          <Field
            type="text"
            name="lastName"
            label="Last Name"
            register={register}
            requiredMessage="Lastname required"
            errorMessage={errors?.lastName?.message}
          />
        </div>
        <div className="xl:order-4">
          <div className="grid grid-cols-2">
            <div>
              <div className="mb-1 font-medium">Gender</div>
              <Radio
                name="male"
                group="gender"
                label="Male"
                register={register}
                value="male"
                requiredMessage="Please select gender"
              />
              <Radio
                name="female"
                group="gender"
                label="Female"
                register={register}
                value="female"
                requiredMessage="Please select gender"
              />
            </div>
            <Select
              label="Specialization"
              name="specialization"
              options={options}
              register={register}
              requiredMessage="specialization required"
              errorMessage={errors?.specialization?.message}
            />
          </div>

          <p className="mt-1 text-red-500">{errors.gender?.message}</p>
        </div>
        <div className="xl:order-5">
          <Field
            type="number"
            name="contactNumber"
            label="Contact Number"
            register={register}
            requiredMessage={"Phone number required"}
            errorMessage={errors?.phoneNumber?.message}
            pattern={{ value: /^\d{10}$/, message: "Enter a valid number" }}
          />
        </div>
        <div className="xl:order-6">
          <Field
            type="tel"
            name="aadhar"
            label="Aadhar Card Number"
            register={register}
            requiredMessage="Aadhar number required"
            value={aadharNumber}
            handleChange={handleChange}
            errorMessage={errors?.aadhar?.message}
          />
        </div>
        <div className="xl:order-7 col-span-full">
          <div className="grid grid-cols-2 gap-y-6 xl:grid-cols-5">
            <TimeSlotSelection
              name={"monday"}
              register={register}
              day={"Monday"}
              errors={errors}
            />{" "}
            <TimeSlotSelection
              name={"tuesday"}
              register={register}
              day={"Tuesday"}
              errors={errors}
            />
            <TimeSlotSelection
              name={"wednesday"}
              register={register}
              day={"Wednesday"}
              errors={errors}
            />
            <TimeSlotSelection
              name={"thursday"}
              register={register}
              day={"Thursday"}
              errors={errors}
            />
            <TimeSlotSelection
              name={"friday"}
              register={register}
              day={"Friday"}
              errors={errors}
            />
          </div>
        </div>
        <div className="xl:order-8 xl:col-span-3 flex justify-center">
          <button
            className=" bg-[#605bff] w-full lg:w-[300px] lg:px-20  py-2 font-medium text-xl text-white rounded-md"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
export default ProfileForm;
