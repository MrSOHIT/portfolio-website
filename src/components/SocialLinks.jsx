import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDribbble, FaMedium, FaInstagram } from 'react-icons/fa';
import social from '../data/social';

const iconMap = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
  FaTwitter: FaTwitter,
  FaEnvelope: FaEnvelope,
  FaDribbble: FaDribbble,
  FaMedium: FaMedium,
  FaInstagram: FaInstagram
};

const SocialLinks = ({ className = '', iconSize = 24 }) => {
  return (
    <div className={className}>
      {social.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label={item.name}
          >
            {Icon && <Icon size={iconSize} />}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;