import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import { useData } from '../context/DataContext';

const Contact = () => {
  const { about } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const contactInfo = [
    { 
      icon: FaMapMarkerAlt, 
      title: 'Location', 
      value: about.location,
      color: 'bg-blue-100 text-blue-500'
    },
    { 
      icon: FaEnvelope, 
      title: 'Email', 
      value: about.email,
      link: `mailto:${about.email}`,
      color: 'bg-green-100 text-green-500'
    },
    { 
      icon: FaPhoneAlt, 
      title: 'Phone', 
      value: about.phone,
      link: `tel:${about.phone}`,
      color: 'bg-purple-100 text-purple-500'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission - in a real app, you'd send this to your backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Get In Touch
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              {item.link ? (
                <a href={item.link} className="text-gray-600 hover:text-primary">
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-600">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 bg-primary text-white">
              <h3 className="text-2xl font-bold mb-4">Let's talk about your project</h3>
              <p className="mb-4">
                Fill out the form and I'll get back to you as soon as possible. I'm looking forward to hearing from you!
              </p>
              <p className="mb-4">
                Whether you need a website, web application, or consultation - I'm here to help you achieve your goals.
              </p>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-2">Follow me</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-gray-200 transition-colors">
                    <FaEnvelope size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-gray-200 transition-colors">
                    <FaEnvelope size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-gray-200 transition-colors">
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
              
              {submitMessage && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <FaPaperPlane className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;