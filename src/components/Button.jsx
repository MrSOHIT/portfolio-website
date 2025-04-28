import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-colors duration-300';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-secondary',
    secondary: 'bg-gray-200 text-dark hover:bg-gray-300',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    dark: 'bg-dark text-white hover:bg-gray-800'
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'py-3 px-6',
    lg: 'text-lg py-4 px-8'
  };
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={allClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={allClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;