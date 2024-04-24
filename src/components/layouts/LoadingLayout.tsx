
import { t } from "i18next";
import { ring2 } from "ldrs";
import GEAR_WHITE from "../../assets/logos/GEAR_WHITE.svg";
import { BackgroundLayout } from "./BackgroundLayout";

ring2.register();

export const LoadingLayout = () => {
  return (
    <BackgroundLayout
      mask={
        <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 m-auto">
          <div className="w-full text-center absolute -translate-y-52">
            <div className="w-1/12 min-w-[100px] max-w-[200px] m-auto">
              <img src={GEAR_WHITE} alt="logo-gear-white" />
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center justify-center gap-4">
              <svg className="container-loader" viewBox="0 0 40 40" height="40" width="40">
                <circle className="track" cx="20" cy="20" r="17.5" strokeWidth="3px" fill="none" />
                <circle className="car" cx="20" cy="20" r="17.5" strokeWidth="3px" fill="none" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white absolute mt-4">{t("loading")}</div>
          </div>
        </div>
      }
    />
  );
};
<div className="w-24 h-24 border-8 absolute rounded-full"></div>;
