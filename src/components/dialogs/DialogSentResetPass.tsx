import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { t } from "i18next";
import { useNavigate } from "react-router";
import HAPPY_VAMPIRE from "../../assets/logos/happy_vampire.png";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const DialogSentResetPass = ({ handleClose, open }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleClose();
    navigate("/auth/login");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px", // Ajusta este valor según sea necesario para hacer los bordes más redondos
          width: "350px",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <div className="w-1/2 m-auto">
          <img src={HAPPY_VAMPIRE} alt="happy_vampire" />
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="flex gap-8 flex-col justify-center py-2 [&>p]:text-center">
            <p className="text-green-500">{t("successResetPassword")}</p>
            <p className="text-my-purple-900">{t("heperTextResetPassword")}</p>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <center className="w-full pb-5">
          <button onClick={handleClick} className="bg-my-purple-300">
            {t("login")}
          </button>
        </center>
      </DialogActions>
    </Dialog>
  );
};
