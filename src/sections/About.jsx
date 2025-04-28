import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import Button from '../components/Button';

const About = () => {
  const { about } = useData();

  const contactInfo = [
    { icon: FaMapMarkerAlt, label: 'Location', value: about.location },
    { icon: FaEnvelope, label: 'Email', value: about.email },
    { icon: FaPhoneAlt, label: 'Phone', value: about.phone }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12 mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-2/5"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-lg opacity-10 transform translate-x-4 translate-y-4"></div>
              <div className="relative z-10 overflow-hidden rounded-lg border-4 border-white shadow-xl">
                <img 
                  src={about.profileImage} 
                  alt={about.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-3/5"
          >
            <h3 className="text-2xl font-bold mb-4">{about.name}</h3>
            <h4 className="text-xl text-primary mb-6">{about.title}</h4>
            
            <div className="text-gray-600 space-y-4 mb-8">
              {about.detailedBio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <info.icon />
                  </div>
                  <div>
                    <h5 className="font-semibold">{info.label}</h5>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              href={about.resume} 
              variant="primary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Download Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
