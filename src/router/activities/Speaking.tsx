import { Route, Routes } from "react-router";
import SpeakingTextPage from "../../pages/activities/Speaking/SpeakingTextPage";
import SpeakingImagePage from "../../pages/activities/Speaking/SpeakingImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const Speaking = () => {
  return (
    <Routes>
      <Route path="/by-text" element={<SpeakingTextPage />} />
      <Route path="/img" element={<SpeakingImagePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};