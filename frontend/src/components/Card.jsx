import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '',
  onClick,
  hoverable = false 
}) => {
  const hoverClass = hoverable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl' : '';
  
  return (
    <div 
      className={`bg-white rounded-xl p-6 shadow-md transition-all duration-300 ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>}
      <div className="text-slate-600">
        {children}
      </div>
    </div>
  );
};

export default Card;
