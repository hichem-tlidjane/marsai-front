import Navbar from './components/Navbar';
import Login from './components/Login';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import SubmitMoviePage from './pages/SubmitMoviePage';
import AdminPage from './pages/AdminPage';
import DashboardStats from './components/admin/DashboardStats';
import MoviesManager from './components/admin/MoviesManager';
import JuryManager from './components/admin/JuryManager';
import LeaderboardManager from './components/admin/LeaderboardManager';
import EventsManager from './components/admin/EventsManager';
import PublicLayout from './components/PublicLayout';
import Newsletter from './components/admin/Newsletter';
import EventsPage from './pages/EventsPage';
import EventBookingPage from './pages/EventBookingPage';
import { useApi } from './hooks/useApi';
import { useAuthStore } from './hooks/useAuth';
import { useEffect } from 'react';
import marsaiLogo from './assets/marsai-logo.svg';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const api = useApi();
  const { setUser, isInit } = useAuthStore();

  useEffect(() => {
    const refresh = async () => {
      const res = await api('/auth/me', null, false);
      if (res?.ok) {
        const user = await res.json();
        setUser(user);
      } else {
        setUser(null);
      }
    };
    refresh();
  }, []);

  if (!isInit) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-12 text-neutral-300">
        <img src={marsaiLogo} alt="Marsai logo" />
        <p>Please wait</p>
        <AiOutlineLoading3Quarters className="animate-spin size-24" />
      </div>
    );
  }

  return (
    <div className="typography">
      <Navbar />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<GalleryPage />} />
          <Route path="/submit" element={<SubmitMoviePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventBookingPage />} />
          <Route element={<ProtectedRoute mustBeUnlogged={true} />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="movies" element={<MoviesManager />} />
            <Route path="jury" element={<JuryManager />} />
            <Route path="leaderboard" element={<LeaderboardManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="newsletter" element={<Newsletter />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
