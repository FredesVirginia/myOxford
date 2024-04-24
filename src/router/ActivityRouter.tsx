import { Route, Routes } from "react-router";
import { PageLayout } from "../components/layouts/PageLayout";
import { NotFoundPage } from "../pages/views/NotFoundPage";
import {
  DragAndDrop,
  FillInTheBlanks,
  MatchTheColumns,
  MultipleChoice,
  Open,
  Picklist,
  Sortable,
  TrueOrFalse,
  Unscramble,
} from "./activities";

export const ActivityRouter = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/match-the-columns/*" element={<MatchTheColumns />} />
        <Route path="/unscramble/*" element={<Unscramble />} />
        <Route path="/open/*" element={<Open />} />
        <Route path="/fill-in-the-blanks/*" element={<FillInTheBlanks />} />
        <Route path="/multiple-choice/*" element={<MultipleChoice />} />
        <Route path="/true-or-false/*" element={<TrueOrFalse />} />
        <Route path="/picklist/*" element={<Picklist />} />
        <Route path="/sortable/*" element={<Sortable />} />
        <Route path="/drag-and-drop/*" element={<DragAndDrop />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
