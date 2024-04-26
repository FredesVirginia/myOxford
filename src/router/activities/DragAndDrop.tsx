import { Route, Routes } from "react-router";
import DrangAImagePage from "../../pages/activities/DrangAndDrop/DrangAImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

import DrangAWordPage from "../../pages/activities/DrangAndDrop/DrangAWorfPage";
import DrangManyWordsPage from "../../pages/activities/DrangAndDrop/DrangManyWordsPage";
export const DragAndDrop = () => {
  return (
    <Routes>
      <Route path="/image" element={<DrangAImagePage />} />
      <Route path="/a-word" element={<DrangAWordPage />} />
      <Route path="/many-words" element={<DrangManyWordsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
