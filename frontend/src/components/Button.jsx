import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  fullWidth = false,
  className = ''
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-slate-500 text-white hover:bg-slate-600',
    outline: 'bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
