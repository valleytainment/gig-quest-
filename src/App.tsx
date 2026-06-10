import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/sonner';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ArtistDashboard } from './pages/artist/ArtistDashboard';
import { LegalLayout } from './pages/legal/LegalLayout';
import { LegalTerms } from './pages/legal/Terms';
import { LegalPrivacy } from './pages/legal/Privacy';
import { LegalWaiver } from './pages/legal/Waiver';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/legal" element={<LegalLayout />}>
            <Route path="terms" element={<LegalTerms />} />
            <Route path="privacy" element={<LegalPrivacy />} />
            <Route path="waiver" element={<LegalWaiver />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/artist/*" element={<ArtistDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  );
}
