import { createContext, useContext, useState } from 'react';
import aboutData from '../data/about';
import skillsData from '../data/skills';
import projectsData from '../data/projects';
import contactData from '../data/contact';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [about, setAbout] = useState(aboutData);
  const [skills, setSkills] = useState(skillsData);
  const [projects, setProjects] = useState(projectsData);
  const [contact, setContact] = useState(contactData);

  // About data operations
  const updateAbout = (newAbout) => {
    setAbout({ ...about, ...newAbout });
  };

  // Skills CRUD operations
  const addSkill = (skill) => {
    const newSkill = {
      id: skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1,
      ...skill
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id, updatedSkill) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, ...updatedSkill } : skill
    ));
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  // Projects CRUD operations
  const addProject = (project) => {
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      ...project
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    ));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Contact data operations
  const updateContact = (newContact) => {
    setContact({ ...contact, ...newContact });
  };

  const value = {
    about,
    skills,
    projects,
    contact,
    updateAbout,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    updateContact
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};