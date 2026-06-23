import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/applications', label: 'Applications' },
    { to: '/add', label: '+ Add Job' },
    { to: '/transactions', label: 'Activity Log' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          JobTrack
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === link.to
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200">
            <span className="text-sm text-gray-500 hidden sm:inline">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
