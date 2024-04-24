import { Route, Routes } from "react-router";
import { NotFoundPage } from "../../pages/views/NotFoundPage";
import { UnscramblePage } from "../../pages/activities/Unscramble/UnscramblePage";

export const Unscramble = () => {
  return (
    <Routes>
      <Route path="/sentences" element={<UnscramblePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
