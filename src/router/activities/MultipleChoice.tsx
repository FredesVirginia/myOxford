import { Route, Routes } from "react-router";
import { MultipleChoiceTextPage } from "../../pages/activities/MultipleChoice/MultipleChoiceTextPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const MultipleChoice = () => {
  return (
    <Routes>
      <Route path="/text" element={<MultipleChoiceTextPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
