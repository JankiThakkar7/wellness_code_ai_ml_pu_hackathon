import CountUp from "react-countup";
import { openPage } from "../register/RegisterSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Register from "../register/Register";
import Navbar from "../../components/navbar/Navbar";
const Home = () => {
  const dispatch = useDispatch();
  const [counts, setCounts] = useState([]);
  useEffect(() => {
    const getCount = async () => {
      const data = await fetch("http://localhost:8080/healthily/api/home/count");
      const res = await data.json();
      // console.log(res);
      setCounts(res);
    };
    getCount();
  }, []);
  return (
    <>
      <Register />
      <section className="flex flex-col h-[500px] sm:h-[700px] bg-hero bg-[#01001f80] bg-blend-overlay bg-no-repeat  bg-bottom ">
        <Navbar logoColor={"text-white"} />
        <section className="flex flex-col justify-center grow px-8 lg:px-[200px] text-white">
          <div className="text-2xl  md:text-5xl md:leading-t font-semibold mb-4">
            Empowering Health: Your Comprehensive <br /> E-Healthcare Solution
          </div>
          <div className="text-lg md:text-3xl font-medium">
            Your Health, Our Priority: <br /> Accessible Care, Anytime, Anywhere
          </div>
          <div className="pt-4 md:mt-6 mt-2">
            <button
              className="bg-[#605BFF] md:px-20 px-12 py-2 md:text-xl rounded-md"
              onClick={() => {
                dispatch(openPage());
              }}
            >
              Get Started
            </button>
          </div>
        </section>
      </section>
      <div className="flex justify-center py-6 my-8 divide-x divide-[#ababab] text-center bg-gradient-to-r from-white via-[#DFDEFF] to-white rounded-xl">
        <div className="md:py-6 py-2 md:px-[60px] lg:px-[120px] px-4">
          <div className="text-[#605BFF] md:text-4xl font-medium">
            <CountUp end={counts?.patientCount} duration={1} />+
          </div>
          <div className="md:text-2xl">Patient</div>
        </div>
        <div className="md:py-6 py-2 md:px-[60px] lg:px-[120px] px-4">
          <div className="text-[#605BFF] md:text-4xl font-medium">
            <CountUp end={counts?.doctorCount} duration={1} />+
          </div>
          <div className="md:text-2xl">Doctor</div>
        </div>
        <div className="md:py-6 py-2 md:px-[60px] lg:px-[120px] px-4">
          <div className="text-[#605BFF] md:text-4xl font-medium">
            <CountUp end={counts?.appointmentCount} duration={1} />+
          </div>
          <div className="md:text-2xl">Appointments</div>
        </div>
      </div>
    </>
  );
};
export default Home;
