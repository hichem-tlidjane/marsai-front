import Navbar from './components/Navbar';
import Login from './components/Login';
import GaleryPage from './pages/GaleryPage';
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

function App() {
  return (
    <div className="typography">
      <Navbar />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<GaleryPage />} />
          <Route path="/submit" element={<SubmitMoviePage />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardStats />} />
          <Route path="movies" element={<MoviesManager />} />
          <Route path="jury" element={<JuryManager />} />
          <Route path="leaderboard" element={<LeaderboardManager />} />
          <Route path="events" element={<EventsManager />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
