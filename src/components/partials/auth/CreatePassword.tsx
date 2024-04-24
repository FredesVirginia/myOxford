import { t } from "i18next";
import React, { useState } from "react";
import GEAR_ORIGINAL from "../../../assets/logos/GEAR_ORIGINAL.svg";
import G_LUPA from "../../../assets/logos/g_lupa.png";
import { Button } from "../../butons/Button";
import { FormContainer } from "../../containers/FormContainer";
import { DialogSentResetPass } from "../../dialogs/DialogSentResetPass";
import { Input } from "../../inputs/Input";

export const CreatePassword = () => {
  const [open, setOpen] = useState(false);

  const handleResetPassword = () => {
    setOpen(true);
    // navigate("/auth/login");
  };

  return (
    <div className={`animate__animated animate__fast h-full`}>
      <DialogSentResetPass open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-10 justify-evenly h-full w-full overflow-y-auto">
        <div className="gear-original m-auto  w-1/4">
          <img src={GEAR_ORIGINAL} alt="gear-original" className="w-full h-full " />
        </div>
        <div className="g-sad m-auto w-1/3">
          <img src={G_LUPA} alt="g-sad" className="w-full h-full bg-contain" />
        </div>
        <div className="text-center text-my-skyBlue-500 font-bold text-xl">{t("changePassword")}</div>
        <div className="m-auto w-2/3">
          <FormContainer className="gap-5">
            <FormControl>
              <Label>{t("newPassword")}</Label>
              <Input
                type="password"
                placeholder={t("password")}
                name="password"
                helperText="Your password must be at least 8 characters including 1 numeber."
              />
            </FormControl>
            <FormControl>
              <Label>{t("confirmPassword")}</Label>
              <Input type="password" placeholder={t("password")} name="confirmPassword" />
            </FormControl>
          </FormContainer>
        </div>
        <div className="w-2/3 m-auto">
          <center>
            <Button onClick={handleResetPassword} className="bg-my-skyBlue-500">
              {t("resetPassword")}
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
};

interface IProps {
  children?: React.ReactNode;
}

const FormControl = ({ children }: IProps) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const Label = ({ children }: IProps) => {
  return <label className="text-xs text-my-purple-900 ml-2">{children}</label>;
};
