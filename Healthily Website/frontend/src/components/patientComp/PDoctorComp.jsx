// import dimage from "/user.png";
const PDoctorComp = ({ dname, dimage, dqualify, email, onClick }) => {
  const handleClick = () => {
    onClick({ dname, dimage, dqualify, email });
  };

  return (
    <>
      <div
        className="flex gap-4 bg-white p-2 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <img className="size-12 border-[#605bff] border rounded-full" src={dimage} alt="User" />
        <div>
          <div className="font-medium">{dname}</div>
          <div className="text-slate-400">{dqualify}</div>
        </div>
      </div>
    </>
  );
};
export default PDoctorComp;
