import { RecoverPassword } from "../../components/partials/auth/RecoverPassword";
import { SentRequestPass } from "../../components/partials/auth/SentRequestPass";
import { AuthContainer } from "../../components/containers/AuthContainer";
import { useRecoverPass } from "../../store/useRecoverPass";
import { useEffect } from "react";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";

export const RecoverPassPage = () => {
  const { isRequestSent, setIsRequestSent } = useRecoverPass();

  useEffect(() => {
    setIsRequestSent(false);
  }, []);

  return (
    <BackgroundLayout theme={"recover-password"}>
      <AuthContainer>{isRequestSent ? <SentRequestPass /> : <RecoverPassword />}</AuthContainer>
    </BackgroundLayout>
  );
};
