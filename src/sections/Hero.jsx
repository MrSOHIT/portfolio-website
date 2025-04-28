import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';

const Hero = () => {
  const { about } = useData();

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="block">
                Hello, I'm <span className="text-primary">{about.name.split(' ')[0]}</span>
              </span>
              <span className="block mt-2">{about.title}</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              {about.shortDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button to="/projects" variant="primary" size="lg">
                View Projects
              </Button>
              <Button 
                href={about.resume} 
                variant="outline" 
                size="lg"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Download Resume
              </Button>
            </div>
            
            <div className="mt-8">
              <SocialLinks className="flex justify-center md:justify-start space-x-6" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/5 md:p-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full opacity-10 transform translate-x-4 translate-y-4"></div>
              <div className="relative z-10 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <img 
                  src={about.profileImage} 
                  alt={about.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
