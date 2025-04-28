import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const { about } = useData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{about.name}</h3>
            <p className="mb-4 text-gray-300">{about.shortDescription}</p>
            <SocialLinks className="flex space-x-4 text-gray-300" iconSize={20} />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-300 hover:text-white transition-colors">Skills</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{about.location}</li>
              <li>{about.email}</li>
              <li>{about.phone}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {about.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;