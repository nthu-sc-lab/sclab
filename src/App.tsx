import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { ArchivePage } from './pages/ArchivePage'
import { ContactPage } from './pages/ContactPage'
import { HighlightsPage } from './pages/HighlightsPage'
import { HomePage } from './pages/HomePage'
import { JoinPage } from './pages/JoinPage'
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
        <Route path="publications" element={<PublicationsPage />} />
        <Route path="highlights" element={<HighlightsPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
