import { Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import { ActivityResultPage } from "../pages/views/ActivityResultPage";
import { NotFoundPage } from "../pages/views/NotFoundPage";
import { ActivityRouter } from "./ActivityRouter";


export const LevelRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/activity-result" element={<ActivityResultPage />} />
      <Route path="/activities/*" element={<ActivityRouter />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
