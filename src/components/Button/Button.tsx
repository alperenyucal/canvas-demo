interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded ${className}`}
      {...props}
    />
  );
};
