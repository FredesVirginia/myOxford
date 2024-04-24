import { Route, Routes } from "react-router";
import DrangAImagePage from "../../pages/activities/DrangAndDrop/DrangAImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";
import DrangAWord from "../../components/Activities/DrangAndDrop/DrangAWord";
export const DragAndDrop = () => {
  return (
    <Routes>
      <Route path="/image" element={<DrangAImagePage />} />
      <Route path="/text" element={<DrangAWord />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
