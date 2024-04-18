import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

const CustomSelect = ({
  options,
  name,
  control,
  isMulti = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReactSelect
          classNamePrefix="custom-select"
          {...field}
          {...props}
          options={options}
          isMulti={isMulti}
        />
      )}
    />
  );
};

export default CustomSelect;
