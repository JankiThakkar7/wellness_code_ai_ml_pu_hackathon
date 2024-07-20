const Field = ({
  type,
  name,
  label,
  register,
  requiredMessage,
  pattern,
  errorMessage,
  value,
  handleChange,
}) => {
  return (
    <>
      <div>
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        <div>
          <input
            {...register(name, { required: requiredMessage, pattern })}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            className="mt-2 w-full rounded px-4 py-2 outline outline-1 outline-slate-300 focus:outline-[#605BFF] focus:outline-2 focus:bg-[#EFEEFF]"
          />
          <p className="mt-1 text-red-500">{errorMessage}</p>
        </div>
      </div>
    </>
  );
};
export default Field;
