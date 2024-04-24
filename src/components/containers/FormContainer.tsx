import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const FormContainer: React.FC<Props> = ({ children, className, ...props }) => {
  return <div className={`flex flex-col gap-4 ${className}`} {...props}>{children}</div>;
};
