import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AuthContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid place-content-center h-screen w-full  overflow-hidden">
      <div
        className="flex rounded-2xl shadow-lg px-5 py-8 bg-slate-50 
        items-center
      max-sm:w-screen max-md:w-[60vw] md:w-[60vw] max-w-[600px] h-[85vh] overflow-hidden
      "
      >
        {children}
      </div>
    </div>
  );
};
