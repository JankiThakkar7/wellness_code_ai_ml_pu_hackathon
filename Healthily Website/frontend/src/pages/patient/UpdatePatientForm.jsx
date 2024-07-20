import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "../../components/form/Select";
import Field from "../../components/form/Field";
import Radio from "../../components/form/Radio";
import "../patient/patient.css";
import "../../components/form/form.css";
const UpdatePatientForm = ({ user, onClickSet }) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [existingData, setExistingData] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [gender, setGender] = useState();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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

  const countryOptions = [
    { value: "ind", label: "India" },
    { value: "ca", label: "Canada" },
    { value: "us", label: "United States" },
  ];

  const stateOptions = [
    { value: "gujarat", label: "Gujarat" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "rajeshthan", label: "Rajeshthan" },
  ];

  const fetchExistingData = () => {
    fetch("", {
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
        setExistingData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  useEffect(() => {
    fetchExistingData();
  }, []);

  const updatePatientData = () => {
    const body = { ...updatedData, email: user?.email };
    fetch("", {
      method: "PUT",
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
      .catch((errors) => {
        console.error(errors);
      });
  };

  const onSubmit = (data) => {
    console.log(data);
    // updatePatientData();
  };

  return (
    <>
      <div className="text-center p-2 mb-2 text-2xl text-[#605BFF] font-medium border-b-2">
        Update Profile
      </div>
      <form className="h-[90%] overflow-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-x-12 gap-y-8 p-4">
          <div className="xl:order-1">
            <Field
              type="text"
              name="firstName"
              label="First Name"
              register={register}
              requiredMessage="First Name Required"
              errorMessage={errors?.firstName?.message}
            />
          </div>
          <div className="xl:order-2">
            <Field
              type="text"
              name="middleName"
              label="Middle Name"
              register={register}
              requiredMessage="Middle Name Required"
              errorMessage={errors?.middleName?.message}
            />
          </div>
          <div className="xl:order-3">
            <Field
              type="text"
              name="lastName"
              label="Last Name"
              register={register}
              requiredMessage="Last Name Required"
              errorMessage={errors?.lastName?.message}
            />
          </div>
          <div className="xl:order-4">
            <Field
              type="number"
              name="phoneNumber"
              label="Phone Number"
              register={register}
              requiredMessage={"Phone number required"}
              errorMessage={errors?.phoneNumber?.message}
              pattern={{ value: /^\d{10}$/, message: "Enter a valid number" }}
            />
          </div>
          <div className="xl:order-6">
            <Field
              type="date"
              name="birthDate"
              label="Birth Date"
              register={register}
              requiredMessage="Required"
              errorMessage={errors?.birthDate?.message}
            />
          </div>
          <div className="xl:order-7">
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
        </div>
        <div className="xl:order-5 xl:col-span-2 row-span-3 grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8 p-4">
          <div>
            <div className="mb-1 font-medium">Gender</div>
            <div>
              <input
                type="radio"
                name="gender"
                id={"male"}
                value={"male"}
                className="hidden"
                checked={gender === "male"}
                onChange={handleGenderChange}
                {...register("gender", { required: "Gender" })}
              />
              <label htmlFor={"male"} className="radio-label">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id={"female"}
                value={"female"}
                className="hidden"
                checked={gender === "female"}
                onChange={handleGenderChange}
                {...register("gender", { required: "Gender" })}
              />
              <label htmlFor={"female"} className="radio-label">
                Female
              </label>
            </div>
            {/* <Radio
              name="male"
              group="gender"
              label="Male"
              register={register}
              value="male"
              requiredMessage="Please select gender"
              checked={true}
            /> */}
            {/* <Radio
              name="female"
              group="gender"
              label="Female"
              register={register}
              value="female"
              requiredMessage="Please select gender"
            /> */}
            <p className="mt-1 text-red-500">{errors.gender?.message}</p>
          </div>
          <div>
            <Select
              name="country"
              label="Country"
              register={register}
              requiredMessage="Please select country"
              errorMessage={errors?.country?.message}
              options={countryOptions}
            />
          </div>
          <div>
            <Select
              name="state"
              label="State"
              register={register}
              requiredMessage="Please select state"
              errorMessage={errors?.state?.message}
              options={stateOptions}
            />
          </div>
          <div className="row-span-2">
            <div className="mb-1 font-medium">Blood Group</div>
            <div className="grid grid-cols-2">
              <div>
                <Radio
                  name="A"
                  group="blood"
                  label="A"
                  register={register}
                  value="A"
                  requiredMessage="Please select blood group"
                />
                <Radio
                  name="B"
                  group="blood"
                  label="B"
                  register={register}
                  value="B"
                  requiredMessage="Please select blood group"
                />
                <Radio
                  name="AB"
                  group="blood"
                  label="AB"
                  register={register}
                  value="AB"
                  requiredMessage="Please select blood group"
                />
                <Radio
                  name="O"
                  group="blood"
                  label="O"
                  register={register}
                  value="O"
                  requiredMessage="Please select blood group"
                />
              </div>
              <div>
                <Radio
                  name="+ve"
                  group="bloodGroup"
                  label="+ve"
                  register={register}
                  value="+ve"
                  requiredMessage="Please select blood group"
                />
                <Radio
                  name="-ve"
                  group="bloodGroup"
                  label="-ve"
                  register={register}
                  value="-ve"
                  requiredMessage="Please select blood group"
                />
              </div>
            </div>
            <p className="mt-1 text-red-500">{errors.blood?.message}</p>
          </div>
          <Field
            type="text"
            name="city"
            label="Clity/Village"
            register={register}
            requiredMessage="Required is"
            errorMessage={errors?.city?.message}
          />
          <Field
            type="number"
            name="pincode"
            label="Pincode"
            register={register}
            requiredMessage="Required"
            errorMessage={errors?.pincode?.message}
            pattern={{
              value: /^\d{6}$/,
              message: "Please enter a valid 6-digit pincode",
            }}
          />
          <Field
            type="text"
            name="house"
            label="House/Flat No"
            register={register}
            requiredMessage="required"
            errorMessage={errors?.house?.message}
          />
          <Field
            type="text"
            name="building"
            label="Building/Landmark"
            register={register}
            requiredMessage="required"
            errorMessage={errors?.building?.message}
          />
        </div>
        <div className="xl:mt-8 xl:order-8 xl:col-span-3 flex justify-center">
          <button
            className=" bg-[#605bff] w-full lg:w-[300px] lg:px-20  py-2 font-medium text-xl text-white rounded-md"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};
export default UpdatePatientForm;
