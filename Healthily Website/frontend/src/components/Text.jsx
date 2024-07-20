const Text = ({ label, value }) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="text-lg font-medium text-[#605BFF] w-[150px]">{label}</div>
        <div className="text-lg font-medium text-slate-500">: {value}</div>
      </div>
    </>
  );
};
export default Text;

