import { t } from "i18next";
import { useNavigate } from "react-router";
import { Button } from "../butons/Button";

export const Navbar = () => {
  const navigation = useNavigate();

  const handleHome = () => {
    navigation("/");
  };

  return (
    <div style={{}}>
      <Button onClick={handleHome}>{t("home")}</Button>
    </div>
  );
};
