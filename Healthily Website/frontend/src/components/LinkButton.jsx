import { Link } from "react-router-dom";

const LinkButton = ({ to, icon, name, bg }) => {
  return (
    <Link to={to} className="text-black">
      <div
        className={`flex gap-2 items-center px-3 py-2 font-medium text-lg rounded-xl ${bg}`}
      >
        <span className="material-symbols-rounded pe-3 text-[#605BFF]">
          {icon}
        </span>
        {name}
      </div>
    </Link>
  );
};
export default LinkButton;
