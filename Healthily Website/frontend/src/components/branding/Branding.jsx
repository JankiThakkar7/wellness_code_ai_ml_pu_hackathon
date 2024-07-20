import { Link } from "react-router-dom";
import logo from "/pills.png";
const Branding = ({ logoColor }) => {
  return (
    <>
      <Link to={"/"}>
        <div className="flex gap-2 md:gap-5 items-center">
          <img src={logo} alt="health hub logo" className="w-8 sm:w-12" />
          <span className={" shrink-0 text-lg sm:text-2xl font-medium " + logoColor}>
            Healthily
          </span>
        </div>
      </Link>
    </>
  );
};
export default Branding;
