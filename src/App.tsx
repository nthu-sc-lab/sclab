import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { ArchivePage } from './pages/ArchivePage'
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
        <Route path="people" element={<PeoplePage />} />
        <Route path="awards" element={<AwardsPage />} />
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
