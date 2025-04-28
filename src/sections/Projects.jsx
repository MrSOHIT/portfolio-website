import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          My Projects
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Check out some of my recent work. Each project showcases different skills and technologies.
        </motion.p>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full ${
                filter === 'featured' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              } transition-colors`}
            >
              Featured
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;