import _ from "lodash";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({
  onChange,
  ...props
}: InputProps) => (
  <input
    type="text"
    onChange={_.debounce((e)=>onChange?.(e), 1)}
    {...props}
    className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm w-20"
  />
);
