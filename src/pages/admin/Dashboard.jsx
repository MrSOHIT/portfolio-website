import { FaUser, FaCode, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Dashboard = () => {
  const { about, skills, projects } = useData();

  const dashboardItems = [

    {
      title: 'Contact',
      count: 1, 
      icon: FaEnvelope,
      color: '#ec4899',
      link: '/admin/contact'
    },
    {
      title: 'About',
      count: 1,
      icon: FaUser,
      color: '#3b82f6',
      link: '/admin/about'
    },


    {
      title: 'Skills',
      count: skills.length,
      icon: FaCode,
      color: '#10b981',
      link: '/admin/skills'
    },
    {
      title: 'Projects',
      count: projects.length,
      icon: FaProjectDiagram,
      color: '#f59e0b',
      link: '/admin/projects'
    }
    
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <p className="text-gray-600">
          Welcome to your portfolio admin panel. Here you can manage your about information, skills, and projects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.count} {item.count === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <div className="text-primary font-medium">Manage {item.title}</div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/projects"
            className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
          >
            <span className="font-medium">Add New Project</span>
            <p className="text-sm text-gray-500 mt-1">Create a new project to showcase your work</p>
          </Link>
          
          <Link
            to="/admin/skills"
            className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
          >
            <span className="font-medium">Add New Skill</span>
            <p className="text-sm text-gray-500 mt-1">Add a new technology or tool to your skills</p>
          </Link>
          
          <Link
            to="/admin/about"
            className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
          >
            <span className="font-medium">Update Profile</span>
            <p className="text-sm text-gray-500 mt-1">Update your information and credentials</p>
          </Link>
          
          <Link
            to="/"
            className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
            target="_blank"
          >
            <span className="font-medium">View Website</span>
            <p className="text-sm text-gray-500 mt-1">See how your portfolio looks to visitors</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
