import React from 'react';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaPython, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiFastapi, SiDjango} from 'react-icons/si';
import { motion } from 'framer-motion';

const iconMap = {
  FaReact: FaReact,
  FaJs: FaJs,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  SiTailwindcss: SiTailwindcss,
  SiFastapi: SiFastapi,
  SiDjango: SiDjango,
  FaGitAlt: FaGitAlt,
  FaPython: FaPython,
  FaFigma: FaFigma
};

const SkillCard = ({ skill, index }) => {
  const Icon = iconMap[skill.icon];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center">
        {Icon && (
          <div 
            className="w-16 h-16 flex items-center justify-center rounded-full mb-4"
            style={{ backgroundColor: `${skill.color}20` }}
          >
            <Icon size={32} color={skill.color} />
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
        
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="h-full rounded-full"
            style={{ 
              width: `${skill.level}%`,
              backgroundColor: skill.color
            }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 mt-1">{skill.level}%</span>
      </div>
    </motion.div>
  );
};

export default SkillCard;