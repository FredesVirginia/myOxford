import { Route, Routes } from "react-router";
import DrangAImagePage from "../../pages/activities/DrangAndDrop/DrangAImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const DragAndDrop = () => {
  return (
    <Routes>
      <Route path="/image" element={<DrangAImagePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
