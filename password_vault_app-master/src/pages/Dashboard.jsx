import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import GeneratePassword from './Dashboard/GeneratePassword';
import AddPassword from './Dashboard/AddPassword';
import CheckPasswords from './Dashboard/CheckPasswords';

const dashboard = () => {
  const [sideOption, setSideOption] = useState(0);
  const { currentUser } = useAuthContext();
  return (
    <section className='bg-gray-100 dark:bg-gray-900  min-h-screen   '>
      <div className='flex justify-between items-center bg-gray-300 dark:bg-gray-800 py-2 px-4 border-b  border-gray-200 dark:border-gray-700'>
        <span className='text-xl text-gray-900 dark:text-white font-semibold capitalize'>
          {' '}
          Password Vault
        </span>
        <button
          onClick={() => signOut(auth)}
          className=' py-3 px-6 font-poppins  bg-blue-gradient rounded-[10px] font-semibold text-base text-gray-800'>
          Logout
        </button>
      </div>
      <div className='flex flex-col md:flex-row bg-gray-200 dark:bg-gray-700 min-h-[calc(100vh-64px)]'>
        <aside className='bg-gray-300 dark:bg-gray-800  min-w-[200px]'>
          <div className='flex flex-row md:flex-col '>
            <button
              onClick={() => setSideOption(0)}
              className={`text-sm md:text-base  flex-1 text-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-600  py-4 px-2 border-b border-gray-200 dark:border-gray-700
              ${sideOption === 0 && 'bg-gray-200 dark:bg-gray-700'}
              `}>
              My Passwords
            </button>

            <button
              onClick={() => setSideOption(1)}
              className={`text-sm md:text-base  flex-1 md:whitespace-nowrap text-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-600   py-4 px-2 border-b border-gray-200 dark:border-gray-700
              ${sideOption === 1 && 'bg-gray-200 dark:bg-gray-700'}
              `}>
              Add Password
            </button>
            <button
              onClick={() => setSideOption(2)}
              className={`text-sm md:text-base flex-1 md:whitespace-nowrap text-gray-900 dark:text-white hover:bg-gray-600  py-4 px-2 border-b border-gray-200 dark:border-gray-700
              ${sideOption === 2 && 'bg-gray-200 dark:bg-gray-700'}
              `}>
              Generate Password
            </button>
          </div>
        </aside>
        <div className='p-4 md:p-6 '>
          {sideOption === 0 ? (
            <CheckPasswords currentUser={currentUser} />
          ) : sideOption === 1 ? (
            <AddPassword currentUser={currentUser} />
          ) : (
            <GeneratePassword currentUser={currentUser} />
          )}
        </div>
      </div>
    </section>
  );
};

export default dashboard;
