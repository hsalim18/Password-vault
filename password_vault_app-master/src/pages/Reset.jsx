import React, { useState, useEffect } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { logo2 } from '../assets';
const Reset = () => {
  const [email, setEmail] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('something went wrong.');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const [message, setMessage] = useState('A reset link was sent to your email address.');
  const [showMessage, setShowMessage] = useState(false);
  const handleClick = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setShowMessage(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isError]);
  return (
    <div className='min-h-screen w-screen flex justify-center items-center bg-gray-200 dark:bg-gray-900'>
      <section className='bg-gray-200 dark:bg-gray-900 w-full h-full'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <Link
            to='/'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img className='w-[200px]' src={logo2} alt='logo' />
          </Link>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              {isError && (
                <p className='text-red-700 font-medium text-sm text-center'>{errorMessage}</p>
              )}
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Reset your password
              </h1>
              <div className='space-y-2'>
                <div className='space-y-4 md:space-y-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Your email
                    </label>
                    <input
                      onChange={handleChange}
                      type='email'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@gmail.com'
                      required=''
                    />
                  </div>
                </div>

                <div className='space-y-4 md:space-y-6 '>
                  <button
                    onClick={() => handleClick()}
                    className='w-full mt-4 py-3 px-6 font-poppins  bg-blue-gradient rounded-[10px] font-semibold text-base text-gray-800'>
                    Submit
                  </button>
                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Don't have an account?{' '}
                    <Link
                      to='/register'
                      className='font-medium text-blue-600 hover:underline dark:text-primary-500'>
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showMessage && (
            <div className='flex flex-col gap-2 text-center mt-2'>
              <p className='text-lime-300'>{message}</p>
              <p className='text-lime-300'>Redirecting...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reset;
