import { Route, Routes } from "react-router";
import { MultipleChoiceTextPage } from "../../pages/activities/MultipleChoice/MultipleChoiceTextPage";
import MultipleChoiseImageVisualPage from "../../pages/activities/MultipleChoice/MultipleChoiceImageVisualPage";
import MultipleChoiseOnlyImagePage from "../../pages/activities/MultipleChoice/MultipleChoiceOnlyImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const MultipleChoice = () => {
  return (
    <Routes>
      <Route path="/text" element={<MultipleChoiceTextPage />} />
      <Route path="/imagen-text" element={<MultipleChoiseImageVisualPage />} />
      <Route path="/only-imagen" element={<MultipleChoiseOnlyImagePage/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
