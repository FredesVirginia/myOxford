import { Route, Routes } from "react-router";
import OpenSelectWordPage from "../../pages/activities/Open/OpenSelectWordPage";
import OpenImagePage from "../../pages/activities/Open/OpenImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const Open = () => {
  return (
    <Routes>
      <Route path="/text" element={<OpenSelectWordPage />} />
      <Route path="/imagen" element={<OpenImagePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
