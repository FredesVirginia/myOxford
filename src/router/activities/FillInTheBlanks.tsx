import { Route, Routes } from "react-router";
import { FB_byWordPage } from "../../pages/activities/FillInTheBlanks/FB_byWordPage";
import { FB_byWordsPage } from "../../pages/activities/FillInTheBlanks/FB_byWordsPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const FillInTheBlanks = () => {
  return (
    <Routes>
      <Route path="/word" element={<FB_byWordPage />} />
      <Route path="/words" element={<FB_byWordsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
