import { t } from "i18next";
import { useEffect, useState } from "react";
import GEAR_ORIGINAL from "../../../assets/logos/GEAR_ORIGINAL.svg";
import RABBIT_ARROW from "../../../assets/logos/rabbit-arrow.svg";

export const SentRequestPass = () => {

  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, []);

  return (
    <div
      className={`animate__animated animate__faster w-full h-full overflow-y-auto ${
        animate && "animate__backInRight"
      } `}
    >
      <div className="flex flex-col gap-16 justify-center items-center  w-full ">
        <div className="gear-original m-auto w-1/4 h-auto ">
          <img src={GEAR_ORIGINAL} alt="gear-original" className="w-full h-full bg-contain border border-red-500" />
        </div>
        <div className="flex flex-col gap-10 ">
          <div className="g-sad m-auto w-2/3 ">
            <img src={RABBIT_ARROW} alt="g-sad" className="w-full h-full bg-contain" />
          </div>
          <div className="text-center text-my-skyBlue-500 font-bold text-xl">{t("reqResetPasswordSent")}</div>
          <div className="text-center m-auto w-3/4">
            <p className="text-sm">{t("msg1ResetPasswordSent")}</p>
            <p className="text-sm text-my-purple-300">{t("msg2ResetPasswordSent")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
