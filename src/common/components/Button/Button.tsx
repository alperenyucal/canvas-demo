interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  active,
  ...props
}) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded ${
        active ? "bg-blue-700" : ""
      } ${className}`}
      {...props}
    />
  );
};
