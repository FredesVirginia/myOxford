import { Route, Routes } from "react-router";
import PickListTextoPage from "../../pages/activities/PickList/PickListTextoPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const Picklist = () => {
  return (
    <Routes>
      <Route path="/text" element={<PickListTextoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
