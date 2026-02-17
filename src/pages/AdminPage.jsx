import { NavLink, Outlet } from 'react-router-dom';
import { RiDashboard3Line } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';

function AdminPage() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-md transition-colors uppercase text-sm ${isActive ? 'bg-accent text-white' : 'hover:bg-neutral-700 text-neutral-200'}`;

  return (
    <div className="pt-17 min-h-screen flex">
      <div className="mt-3 w-70">
        <nav className="flex flex-col mx-2 gap-2 ">
          <NavLink className={linkClass} to="/admin/dashboard">
            <RiDashboard3Line className="size-5" />
            Dashboard
          </NavLink>
          <NavLink className={linkClass} to="/admin/movies">
            <BiMoviePlay className="size-5" />
            Gestion de films
          </NavLink>
          <NavLink className={linkClass} to="/admin/jury">
            <FaUser className="size-5" />
            Jury
          </NavLink>
          <NavLink className={linkClass} to="/admin/leaderboard">
            <FaRankingStar className="size-5" />
            Résultats & classement
          </NavLink>
          <NavLink className={linkClass} to="/admin/events">
            <FaCalendarAlt className="size-5" />
            évènements
          </NavLink>
        </nav>
      </div>
      <div className="w-full bg-primary">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
