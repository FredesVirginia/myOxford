import { Route, Routes } from "react-router";
import SpeakingTextPage  from "../../pages/activities/Speaking/SpeakingTextPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const Speaking = () => {
  return (
    <Routes>
      <Route path="/by-text" element={<SpeakingTextPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};