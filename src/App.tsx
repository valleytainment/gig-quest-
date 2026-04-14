/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { ArtistDashboard } from './pages/artist/ArtistDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/artist" element={<ArtistDashboard />} />
            <Route path="/artist/notifications" element={<div className="p-8 text-center text-zinc-500 font-mono text-sm uppercase">Notifications coming soon</div>} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
        <Toaster theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}
