import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiRedux } from 'react-icons/si';

const iconMap = {
  FaReact: FaReact,
  FaJs: FaJs,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  SiTailwindcss: SiTailwindcss,
  SiTypescript: SiTypescript,
  FaNodeJs: FaNodeJs,
  FaGitAlt: FaGitAlt,
  SiRedux: SiRedux,
  FaFigma: FaFigma
};

const SkillsManager = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [editSkill, setEditSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'FaReact',
    level: 50,
    color: '#3b82f6'
  });

  const handleEditClick = (skill) => {
    setEditSkill(skill.id);
    setFormData({
      name: skill.name,
      icon: skill.icon,
      level: skill.level,
      color: skill.color
    });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setEditSkill(null);
    setFormData({
      name: '',
      icon: 'FaReact',
      level: 50,
      color: '#3b82f6'
    });
    setIsAdding(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editSkill) {
      updateSkill(editSkill, formData);
      setEditSkill(null);
    } else if (isAdding) {
      addSkill(formData);
      setIsAdding(false);
    }
    
    setFormData({
      name: '',
      icon: 'FaReact',
      level: 50,
      color: '#3b82f6'
    });
  };

  const handleCancel = () => {
    setEditSkill(null);
    setIsAdding(false);
    setFormData({
      name: '',
      icon: 'FaReact',
      level: 50,
      color: '#3b82f6'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        
        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Skill
        </button>
      </div>

      {(isAdding || editSkill) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editSkill ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Icon
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {Object.keys(iconMap).map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Skill Level (%)
                </label>
                <input
                  type="range"
                  name="level"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="text-center mt-1">{formData.level}%</div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Color
                </label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full p-1 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
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
                {editSkill ? 'Save Changes' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {skills.map((skill, index) => {
              const Icon = iconMap[skill.icon];
              return (
                <tr key={skill.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Icon && (
                      <div className="inline-flex items-center justify-center">
                        <Icon size={24} color={skill.color} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {skill.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: skill.color
                        }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1 inline-block">{skill.level}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(skill)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillsManager;
