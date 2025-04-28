import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProjectsManager = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [editProject, setEditProject] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    liveUrl: '',
    sourceUrl: '',
    featured: false
  });

  const handleEditClick = (project) => {
    setEditProject(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags,
      liveUrl: project.liveUrl,
      sourceUrl: project.sourceUrl,
      featured: project.featured
    });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setEditProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: [],
      liveUrl: '',
      sourceUrl: '',
      featured: false
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editProject) {
      updateProject(editProject, formData);
      setEditProject(null);
    } else if (isAdding) {
      addProject(formData);
      setIsAdding(false);
    }
    
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: [],
      liveUrl: '',
      sourceUrl: '',
      featured: false
    });
  };

  const handleCancel = () => {
    setEditProject(null);
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: [],
      liveUrl: '',
      sourceUrl: '',
      featured: false
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Project
        </button>
      </div>

      {(isAdding || editProject) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Project Preview"
                      className="h-40 w-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="React, TailwindCSS, JavaScript"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Source Code URL
                </label>
                <input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Featured Project</span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                {editProject ? 'Save Changes' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/4 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex mt-4 text-sm">
                  <div className="mr-6">
                    <span className="font-medium">Live URL:</span>{' '}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Source URL:</span>{' '}
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {project.sourceUrl}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;