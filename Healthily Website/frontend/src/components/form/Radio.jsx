import "./form.css";
const Radio = ({
  name,
  group,
  label,
  register,
  value,
  requiredMessage,
  checked,
}) => {
  return (
    <div>
      <input
        checked={checked}
        type="radio"
        name={group}
        id={name}
        value={value}
        className="hidden"
        {...register(group, { required: requiredMessage })}
      />
      <label htmlFor={name} className="radio-label">
        {label}
      </label>
    </div>
  );
};
export default Radio;
