import React from "react";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface Props {
  nextProps?: IButtonProps;
  saveProps?: IButtonProps;
}

export const ActivityFooter = ({ nextProps, saveProps }: Props) => {
  return (
    <center className="w-full">
      <div className="w-1/2 flex justify-evenly flex-wrap gap-4">
        <button className={`bg-primary-match-columns-300 ${saveProps?.className}`} {...saveProps}>
          Save
        </button>
        <button className={`bg-primary-match-columns-300 ${nextProps?.className}`} {...nextProps}>
          Next
        </button>
      </div>
    </center>
  );
};
