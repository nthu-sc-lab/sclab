import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { AdvisorPage } from './pages/AdvisorPage'
import { AwardsPage } from './pages/AwardsPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PeoplePage } from './pages/PeoplePage'
import { PublicationsPage } from './pages/PublicationsPage'
import { ResearchPage } from './pages/ResearchPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="about" element={<Navigate to="/about/advisor" replace />} />
        <Route path="about/advisor" element={<AdvisorPage />} />
        <Route path="about/members" element={<PeoplePage />} />
        <Route path="advisor" element={<Navigate to="/about/advisor" replace />} />
        <Route path="members" element={<Navigate to="/about/members" replace />} />
        <Route path="people" element={<Navigate to="/about/members" replace />} />
        <Route path="awards" element={<AwardsPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
