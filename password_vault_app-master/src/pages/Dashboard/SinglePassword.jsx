import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
const SinglePassword = ({ value, name, label, onChange, readOnly = true, isEditing = false }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-gray-900 dark:text-white'> {label}</label>
      <div
        className={`relative bg-gray-50 border border-gray-500 text-gray-900 
      rounded-lg
     w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
      dark:placeholder-gray-400 dark:text-white ${
        isEditing && 'border-lime-600 dark:border-lime-600'
      }`}>
        <input
          type={isShown ? 'text' : 'password'}
          value={value}
          className='bg-transparent border-none outline-none text-lg w-full'
          onChange={onChange}
          name={name}
          readOnly={readOnly}
        />
        <button
          onClick={() => setIsShown(!isShown)}
          className='absolute top-1/2 right-4 -translate-y-1/2'>
          {isShown ? <BsEyeFill /> : <BsEyeSlashFill />}
        </button>
      </div>
    </div>
  );
};
export default SinglePassword;
