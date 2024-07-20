import profile from "/user.png";
import Branding from "../branding/Branding";
import { Link } from "react-router-dom";
const Navbar = ({ user, logoColor }) => {
  const googleAuth = () => {
    window.open("http://localhost:3000/auth/api/login", "_self");
  };
  return (
    <>
      {/* <div>{JSON.stringify(user)}</div> */}
      <nav className="flex px-6 md:px-16 lg:px-[200px] py-6 md:py-8 justify-between items-center">
        <Branding logoColor={logoColor} />
        {user ? (
          <Link to={"profile"}>
            <div className="flex gap-5 items-center">
              <div className="hidden sm:block">
                <div className="md:text-lg font-semibold text-black">{user?.name}</div>
                <div className="text-[#808080] font-medium">
                  {user.role === "PATIENT"
                    ? "Patient"
                    : user.role === "DOCTOR"
                    ? "Doctor"
                    : user.role === "ADMIN"
                    ? "Admin"
                    : ""}
                </div>
              </div>
              <img
                src={user.image}
                alt="user profile image"
                className="w-8 sm:w-12 rounded-full"
              />
            </div>
          </Link>
        ) : (
          <span
            className="font-medium text-white text-xl md:text-2xl cursor-pointer"
            onClick={googleAuth}
          >
            Login
          </span>
        )}
      </nav>
    </>
  );
};
export default Navbar;
