import { Route, Routes } from "react-router";
import { CreatePasspage } from "../pages/auth/CreatePassPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RecoverPassPage } from "../pages/auth/RecoverPassPage";
import { NotFoundPage } from "../pages/views/NotFoundPage";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recover-password" element={<RecoverPassPage />} />
      <Route path="/create-password" element={<CreatePasspage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
