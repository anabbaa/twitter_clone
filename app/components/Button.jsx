
import { radii, shadows, sizes, variants } from "@/style/globalStyles";

const Button = ({
  children,
  variant = "twitter",
  size = "sm",
  rounded = "md",
  shadow = "md",
  width,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
    className={`${variants[variant]} ${sizes[size]} ${radii[rounded]} ${shadows[shadow]} px-2 py-1 rounded ${
  disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-green-600'
}`}
    style={width ? { width } : undefined}
      disabled={disabled}
         {...props} //all properties of a button    
        onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;