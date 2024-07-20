const Select = ({
  label,
  name,
  options,
  register,
  requiredMessage,
  errorMessage,
}) => {
  return (
    <div>
      <label htmlFor={name} className="font-medium">{label}</label>
      <div>
        <select
          name={name}
          id={name}
          {...register(name, { required: requiredMessage })}
          className="mt-2 w-full rounded ps-4 py-2 outline outline-1 outline-slate-300 focus:outline-[#605BFF] focus:outline-2 focus:bg-[#EFEEFF]"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    </div>
  );
};
export default Select;
