import { AuthContainer } from "../../components/containers/AuthContainer";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";
import { CreatePassword } from "../../components/partials/auth/CreatePassword";

export const CreatePasspage = () => {
  return (
    <BackgroundLayout theme="change-password">
      <AuthContainer>
        <CreatePassword />
      </AuthContainer>
    </BackgroundLayout>
  );
};
