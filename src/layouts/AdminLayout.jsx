import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaSignOutAlt, FaEnvelope} from 'react-icons/fa';

const AdminLayout = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Show loading state
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-dark text-white">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                <FaHome className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/about"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                <FaUser className="mr-3" />
                About
              </Link>
            </li>
            <li>
              <Link
                to="/admin/skills"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                <FaCode className="mr-3" />
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/admin/projects"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                <FaProjectDiagram className="mr-3" />
                Projects
              </Link>
            </li>
            <li>
            <li>
               <Link
                   to="/admin/contact"
                   className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                   <FaEnvelope className="mr-3" /> {/* Make sure to import FaEnvelope */}
                   Contact
               </Link>
            </li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              <Link to="/" className="text-primary hover:underline">
                View Site
              </Link>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;