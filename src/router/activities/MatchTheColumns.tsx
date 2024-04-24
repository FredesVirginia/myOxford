import { Route, Routes } from 'react-router'
import { MTC_ImageTextPage } from '../../pages/activities/MatchTheColumns/MTC_ImageTextPage'
import { MTC_TextImageTextPage } from '../../pages/activities/MatchTheColumns/MTC_TextImageTextPage'
import { MTC_TextTextPage } from '../../pages/activities/MatchTheColumns/MTC_TextTextPage'
import { NotFoundPage } from '../../pages/views/NotFoundPage'

export const MatchTheColumns = () => {
  return (
    <Routes>
      <Route path="/text-text" element={<MTC_TextTextPage />} />
      <Route path="/image-text" element={<MTC_ImageTextPage />} />
      <Route path="/text-image-text" element={<MTC_TextImageTextPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
