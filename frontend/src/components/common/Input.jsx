import React from 'react';

const Input = ({ id, name, type = 'text', value, onChange, label, required = false, autoComplete }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-zinc-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;