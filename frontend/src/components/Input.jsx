import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  error = '',
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-2 mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-800">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`px-4 py-3 border-2 rounded-lg text-base transition-all outline-none bg-white
          ${error ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'}
          ${disabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default Input;
