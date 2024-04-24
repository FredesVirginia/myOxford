import { Route, Routes } from "react-router";
import { TrueOrFalsePage } from "../../pages/activities/TrueOrFalse/TrueOrFalsePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const TrueOrFalse = () => {
  return (
    <Routes>
      <Route path="/by-text" element={<TrueOrFalsePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
