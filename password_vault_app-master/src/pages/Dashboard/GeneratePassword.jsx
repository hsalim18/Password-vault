import React, { useState, useEffect } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { MdOutlineContentCopy } from 'react-icons/md';
import Generator from 'generate-password-browser';
import { passwordStrength } from 'check-password-strength';
import logo from '../../assets/logo-sm.svg';
const GeneratePassword = () => {
  const [isShown, setIsShown] = useState(true);
  const [passwords, setPasswords] = useState();
  const [passwordCheck, setPasswordCheck] = useState('');

  const [characters, setCharacters] = useState({
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    length: 15,
  });

  const charactersHandler = (e) => {
    setCharacters({
      ...characters,
      [e.target.name]: !characters[e.target.name],
    });
    setErrorMessage('');
  };

  const [message, setMessage] = useState(false);
  const generatorHandler = () => {
    if (
      !characters.numbers &&
      !characters.symbols &&
      !characters.lowercase &&
      !characters.uppercase
    ) {
    } else {
      const genPassword = Generator.generateMultiple(1, {
        numbers: characters.numbers,
        symbols: characters.symbols,
        lowercase: characters.lowercase,
        uppercase: characters.uppercase,
        length: characters.length,
      });
      setPasswords(genPassword[0]);
    }
  };
  const charactersLengthHandler = (e) => {
    if (e.target.value >= 5 && e.target.value <= 100) {
      setCharacters({ ...characters, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [message]);
  useEffect(() => {
    setPasswordCheck(passwordStrength(passwords).value);
  }, [passwords]);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(passwords);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);
  useEffect(() => {
    generatorHandler();
  }, []);
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <img src={logo} alt='logo' className='w-10' />
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
            Password Generator
          </h2>
        </div>
        <p className='text-sm font-medium  text-gray-700 dark:text-gray-300'>
          <p>Generate randomized, strong, secure passwords</p>
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row items-center justify-center  gap-4 max-w-[600px]'>
          {' '}
          <div className=' relative bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            <input
              type={isShown ? 'text' : 'password'}
              name='newPassword'
              autoComplete='new-password'
              onChange={(e) => setPasswords(e.target.value)}
              value={passwords}
              placeholder='******'
              className='bg-transparent border-none outline-none text-lg w-[300px]  '
            />
            <button
              onClick={() => handleCopy()}
              className='absolute top-1/2 right-10 -translate-y-1/2'>
              {isCopied ? 'Copied!' : <MdOutlineContentCopy />}
            </button>
            <button
              onClick={() => setIsShown(!isShown)}
              className='absolute top-1/2 right-4 -translate-y-1/2'>
              {isShown ? <BsEyeFill /> : <BsEyeSlashFill />}
            </button>
          </div>
          <p
            className={`text-xl text-center font-semibold whitespace-nowrap ${
              (passwordCheck === 'Too weak' && 'text-red-600') ||
              (passwordCheck === 'Weak' && 'text-red-500') ||
              (passwordCheck === 'Medium' && 'text-yellow-300') ||
              (passwordCheck === 'Strong' && 'text-green-600')
            }`}>
            {passwordCheck}
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center flex-wrap gap-4'>
            <div className='flex items-center'>
              <input
                name='lowercase'
                checked={characters.lowercase}
                onChange={charactersHandler}
                type='checkbox'
                class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='checked-checkbox'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Lowercase Letters
              </label>
            </div>
            <div className='flex items-center'>
              <input
                name='uppercase'
                checked={characters.uppercase}
                onChange={charactersHandler}
                type='checkbox'
                class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='checked-checkbox'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Uppercase Letters
              </label>
            </div>
            <div className='flex items-center'>
              <input
                name='numbers'
                checked={characters.numbers}
                onChange={charactersHandler}
                type='checkbox'
                class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='checked-checkbox'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Numbers
              </label>
            </div>
            <div className='flex items-center'>
              <input
                name='symbols'
                checked={characters.symbols}
                onChange={charactersHandler}
                type='checkbox'
                class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='checked-checkbox'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Symbols
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor='length'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Password Length
            </label>
            <div className='flex items-center gap-2'>
              <input
                id='length'
                name='length'
                type='range'
                defaultValue={characters.length}
                onChange={charactersLengthHandler}
                min={6}
                max={40}
                value={characters.length}
                className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 max-w-[600px]'
              />
              <span className='text-gray-800 dark:text-white font-medium text-sm'>
                {characters.length}
              </span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 flex-wrap justify-center md:justify-start'>
          <button
            className=' py-3 px-6 font-poppins min-w-[150px]  bg-blue-gradient rounded-[10px] font-semibold text-base text-gray-800  '
            onClick={generatorHandler}
            disabled={
              !characters.lowercase &&
              !characters.uppercase &&
              !characters.symbols &&
              !characters.numbers
            }>
            Generate
          </button>
        </div>
        <div>
          {message && (
            <span className='text-sm font-medium text-lime-500'>
              Password generated Successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePassword;
