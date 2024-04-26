import { Route, Routes } from "react-router";
import { MultipleChoiceTextPage } from "../../pages/activities/MultipleChoice/MultipleChoiceTextPage";
import MultipleChoiseImageVisualPage from "../../pages/activities/MultipleChoice/MultipleChoiceImageVisualPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const MultipleChoice = () => {
  return (
    <Routes>
      <Route path="/text" element={<MultipleChoiceTextPage />} />
      <Route path="/imagen-text" element={<MultipleChoiseImageVisualPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
