import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import AboutManager from '../pages/admin/AboutManager';
import SkillsManager from '../pages/admin/SkillsManager';
import ProjectsManager from '../pages/admin/ProjectsManager';
import ContactManager from '../pages/admin/ContactManager';
import { useAuth } from '../context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <Home scrollTo="about" />,
      },
      {
        path: '/contact',
        element: <Home scrollTo="contact" />,
      },
      {
        path: 'skills',
        element: <Home scrollTo="skills" />,
      },
      {
        path: 'projects',
        element: <Home scrollTo="projects" />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <AboutManager />
          </ProtectedRoute>
        ),
      },
      {
        path: 'skills',
        element: (
          <ProtectedRoute>
            <SkillsManager />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact',
        element: (
          <ProtectedRoute>
            <ContactManager />
          </ProtectedRoute>
        ),
      },
      {
        path: 'projects',
        element: (
          <ProtectedRoute>
            <ProjectsManager />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;