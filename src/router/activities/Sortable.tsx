import { Route, Routes } from "react-router";
import { NotFoundPage } from "../../pages/views/NotFoundPage";
import SortableImgPage from "../../pages/activities/Sortable/SortableImgPage";
import SortableTextPage from "../../pages/activities/Sortable/SortableTextPage";
import SortableWordPage from "../../pages/activities/Sortable/SortableWordPage";

export const Sortable = () => {
  return (
    <Routes>
      <Route path="/image" element={<SortableImgPage />} />
      <Route path="/word" element={<SortableWordPage />} />
      <Route path="/text" element={<SortableTextPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
