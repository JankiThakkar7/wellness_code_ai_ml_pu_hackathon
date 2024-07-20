import google from "/google.png";
import logo from "/pills.png";
import { closePage } from "../register/RegisterSlice";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
const Register = () => {
  const { isOpen } = useSelector((store) => store.registerPage);
  const dispacth = useDispatch();
  const googleAuth = () => {
    window.open("http://localhost:3000/auth/api/login", "_self");
  };
  return (
    <>
      <aside
        className={
          isOpen
            ? "absolute top-0 left-0 flex flex-col justify-center items-center w-[500px] h-screen  bg-white shadow-[#605bff] shadow-2xl transition-all duration-500 ease-in-out"
            : "absolute top-0 left-[-100%] flex flex-col justify-center items-center w-[500px] h-screen  bg-white shadow-[#605bff] shadow-2xl transition-all duration-500 ease-in-out"
        }
        onClick={() => {
          dispacth(closePage());
        }}
      >
        <span
          className="material-icons-round absolute right-8 top-8 text-3xl cursor-pointer text-[#605BFF]"
          onClick={() => {
            dispacth(closePage());
          }}
        >
          close
        </span>
        <img className="w-16" src={logo} alt="health hub logo" />
        <span className="text-2xl font-medium mt-2">Healthily</span>
        <span className="text-lg">Building a Healthier Tomorrow, Today</span>
        <span className="mt-6 text-xl">Register with us</span>
        <button className="flex gap-5 items-center py-2 px-4 mt-[50px] border-2 border-[#605BFF] bg-[#DFDEFF] rounded-lg">
          <img className="w-8" src={google} alt="google logo" />
          <span className="font-medium" onClick={googleAuth}>
            Continue with Google
          </span>
        </button>
      </aside>
    </>
  );
};
export default Register;
