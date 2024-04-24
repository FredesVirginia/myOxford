import { useState } from "react";
import { useRecoverPass } from "../../../store/useRecoverPass";
import { Button } from "../../butons/Button";
import { t } from "i18next";
import GEAR_ORIGINAL from "../../../assets/logos/GEAR_ORIGINAL.svg";
import G_SAD from "../../../assets/logos/G_SAD.png";
import { Input } from "../../inputs/Input";
import { useNavigate } from "react-router";

export const RecoverPassword = () => {
  const { setIsRequestSent } = useRecoverPass();
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setIsRequestSent(true), 500); // Espera 1 segundo antes de cambiar el estado
  };

  const handleBack = () => {
    navigate("/auth/login");
  };

  return (
    <div className={`animate__animated animate__fast h-full ${animate && "animate__backOutLeft"} `}>
      <div className="flex flex-col gap-10 justify-evenly h-full w-full overflow-y-auto">
        <div className="gear-original m-auto  w-1/4">
          <img src={GEAR_ORIGINAL} alt="gear-original" className="w-full h-full " />
        </div>
        <div className="g-sad m-auto w-1/3">
          <img src={G_SAD} alt="g-sad" />
        </div>
        <div className="text-center text-my-skyBlue-500 font-bold text-xl">{t("resetPassword")}</div>
        <div className="text-center m-auto w-2/3">
          <Input type="email" placeholder={t("email")} />
        </div>
        <div className="w-2/3 flex flex-wrap gap-5 justify-between  items-center m-auto md:justify-center sm:justify-center max-sm:justify-center">
          <Button onClick={handleBack} className="bg-my-purple-500">
            {t("backToLogin")}
          </Button>
          <Button onClick={handleClick} className="bg-my-purple-500">
            {t("requestSendLink")}
          </Button>
        </div>
      </div>
    </div>
  );
};
