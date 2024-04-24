import React from "react";
import LOGO from "../../assets/logos/GEAR_WHITE.svg";

export interface IActivityBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ActivityBar = (props: IActivityBarProps) => {
  return (
    <div
    {...props}
      className={`w-full h-16 flex px-10 py-3 rounded-2xl bg-primary-match-columns-400 ${props.className}`}
    >
      <div className="min-w-10 h-full">
        <img src={LOGO} alt="logo-gear-kids" className="w-full h-full" />
      </div>
    </div>
  );
};
