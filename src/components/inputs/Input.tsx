import React, { useState } from "react";
import { Eye } from "../../assets/icons/Eye";
import { EyeSlash } from "../../assets/icons/EyeSlash";
import { Mail } from "../../assets/icons/Mail";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showLabel?: boolean;
  error?: string;
  helperText?: string;
  endIcon?: React.ReactNode;
}

export const Input: React.FC<Props> = ({
  label,
  type = "text",
  showLabel = true,
  error,
  helperText,
  endIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (endIcon) {
      return endIcon;
    } else if (type === "password") {
      return showPassword ? <Eye /> : <EyeSlash />;
    } else if (type === "email") {
      return <Mail />;
    }
  };

  return (
    <div className="">
      {showLabel && <label htmlFor={props.name}>{label}</label>}
      <div className="flex relative items-center">
        <input {...props} type={type === "password" && showPassword ? "text" : type} id={props.name} />
        {type === "password" || type === "email" || endIcon ? (
          <div
            className="absolute right-2 cursor-pointer stroke-yellow opacity-70 
            transition-colors hover:opacity-100"
            onClick={() => setShowPassword(!showPassword)}
          >
            {getIcon()}
          </div>
        ) : null}
      </div>
      {error && <p className="form-error">{error}</p>}
      {helperText && (
        <div className="w-full">
          <p className="helper-text">{helperText}</p>
        </div>
      )}
    </div>
  );
};
