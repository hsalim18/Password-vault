import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import CryptoJS from "crypto-js";

const AddPassword = ({ currentUser }) => {
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState(false);
  const [value, setValue] = useState({
    website: "",
    login: "",
    password: "",
    createdAt: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    try {
      const { seconds } = Timestamp.now();
      const key = await getDoc(doc(db, "users", currentUser.uid)).then(
        (doc) => {
          return doc.data().key;
        }
      );

      const encryptedPassword = CryptoJS.AES.encrypt(
        value.password,
        key
      ).toString();

      await updateDoc(doc(db, "passwords", currentUser.uid), {
        passwords: arrayUnion({
          ...value,
          password: encryptedPassword,
          createdAt: seconds,
        }),
      });
      setMessage(true);
    } catch (error) {
      console.log(error);
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Add Your Password
        </h2>
        <p className="text-sm  text-gray-800 dark:text-gray-200"></p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {" "}
          <div className=" bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input
              type="text"
              name="website"
              placeholder="Enter website"
              onChange={(e) => handleChange(e)}
              value={value.website}
              className="bg-transparent border-none outline-none text-lg w-full"
            />
          </div>
          <div className=" bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input
              type="text"
              name="login"
              autoComplete="new-login"
              onChange={(e) => handleChange(e)}
              value={value.login}
              placeholder="Enter login"
              className="bg-transparent border-none outline-none text-lg w-full"
            />
          </div>
          <div className="relative bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <input
              type={isShown ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              onChange={(e) => handleChange(e)}
              value={value.password}
              placeholder="******"
              className="bg-transparent border-none outline-none text-lg w-full"
            />
            <button
              onClick={() => setIsShown(!isShown)}
              className="absolute top-1/2 right-4 -translate-y-1/2">
              {isShown ? <BsEyeFill /> : <BsEyeSlashFill />}
            </button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <button
            onClick={savePassword}
            disabled={
              !value.password ||
              !value.website ||
              !value.login ||
              value.password.length < 6
            }
            className="py-3 px-6 font-poppins min-w-[150px]  bg-blue-gradient rounded-[10px] font-semibold text-base text-gray-800 ">
            Save
          </button>
        </div>
        <div>
          {message && (
            <span className="text-sm font-medium text-lime-500 text-center md:text-left">
              Password Added Successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPassword;
