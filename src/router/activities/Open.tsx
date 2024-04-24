import { Route, Routes } from "react-router";
import OpenSelectWordPage from "../../pages/activities/Open/OpenSelectWordPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const Open = () => {
  return (
    <Routes>
      <Route path="/text" element={<OpenSelectWordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
