import dpic from "/user.png";

const PAppointComp = ({ title, date, time, doctorName, doctorImg }) => {
  return (
    <>
      <div className="border-[#605BFF] border p-3 rounded-lg divide-y-2 mb-4">
        <div className="flex gap-4 pb-3">
          <img className="size-12" src={dpic} alt="" />
          <div>
            <div className="font-medium ">Praharsh Patel</div>
            <div className="font-medium text-slate-00">ENT</div>
          </div>
        </div>
        <div className="pt-3">
          <div className="text-lg font-medium">Title : Ear checkup</div>
          <div className="flex items-center pt-3 gap-6">
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[#605BFF]">
                event
              </span>
              <span className="text-slate-500">12-03-2003</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[#605BFF]">
                schedule
              </span>
              <span className="text-slate-500">08:30 AM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PAppointComp;
