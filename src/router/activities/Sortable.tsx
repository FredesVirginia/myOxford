import { Route, Routes } from "react-router";
import { NotFoundPage } from "../../pages/views/NotFoundPage";
import SortableImgPage from "../../pages/activities/Sortable/SortableImgPage";

export const Sortable = () => {
  return (
    <Routes>
      <Route path="/image" element={<SortableImgPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
