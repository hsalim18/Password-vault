import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import SingleInput from "./SingleInput";
import SinglePassword from "./SinglePassword";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import CryptoJS from "crypto-js";
const CheckPasswords = ({ currentUser }) => {
  const [myPasswords, setMyPasswords] = useState([]);
  const handleChange = (e, i) => {
    let newPasswords = [...myPasswords];
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    newPasswords[i][e.target.name] = e.target.value;
    newPasswords[i]["createdAt"] = timestamp;
    setMyPasswords(newPasswords);
  };
  const handleDelete = async (i) => {
    let newPasswords = [...myPasswords];
    newPasswords.splice(i, 1);
    setMyPasswords(newPasswords);
    try {
      await updateDoc(doc(db, "passwords", currentUser.uid), {
        passwords: newPasswords,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "passwords", currentUser.uid), {
        passwords: myPasswords,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const retrievePasswords = async () => {
    try {
      const key = await getDoc(doc(db, "users", currentUser.uid)).then(
        (doc) => {
          return doc.data().key;
        }
      );
      await getDoc(doc(db, "passwords", currentUser.uid)).then((doc) => {
        if (doc.exists) {
          console.log(key);
          const passwords = doc.data().passwords;
          const decryptedPasswords = [];
          passwords.map((item) => {
            const decryptedPassword = CryptoJS.AES.decrypt(
              item.password,
              key
            ).toString(CryptoJS.enc.Utf8);
            item.password = decryptedPassword;
          });

          setMyPasswords(passwords);
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    retrievePasswords();
  }, [currentUser]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = myPasswords.filter((item) =>
    item?.website?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  if (myPasswords.length === 0) {
    return (
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        You don't have any passwords.
      </h2>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-4 sm:min-w-[750px]">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          My Saved Passwords
        </h2>
        <div
          className={` bg-gray-50 border border-gray-500 text-gray-900 
      rounded-lg  block w-[300px] p-2.5
       dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-400
        dark:text-white   `}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-transparent border-none outline-none text-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-8">
        {filteredData?.map((item, index) => {
          return (
            <SingleBox
              item={item}
              key={index}
              index={index}
              handleChange={handleChange}
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

const SingleBox = ({ item, index, handleChange, handleSave, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleClick = () => {
    handleSave();
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col gap-4 px-4 py-6 rounded-lg border border-gray-500 bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        {" "}
        <label className="text-xl font-semibold text-gray-900 dark:text-white">
          {" "}
          Account {index + 1}
        </label>
        <div className="text-gray-900 dark:text-white flex items-center gap-4">
          <button name="edit" onClick={() => setIsEditing(!isEditing)}>
            <FaRegEdit />
          </button>
          <button name="remove" onClick={() => handleDelete(index)}>
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        {" "}
        <SingleInput
          value={item.website}
          label={"Website"}
          onChange={(e) => handleChange(e, index)}
          name="website"
          readOnly={!isEditing}
          isEditing={isEditing}
        />
        <SingleInput
          value={item.login}
          label={"Login"}
          onChange={(e) => handleChange(e, index)}
          name="login"
          readOnly={!isEditing}
          isEditing={isEditing}
        />
        <SinglePassword
          value={item.password}
          label={"Password"}
          onChange={(e) => handleChange(e, index)}
          name="password"
          readOnly={!isEditing}
          isEditing={isEditing}
        />
      </div>
      {isEditing && (
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setIsEditing(false)}
            className="min-w-[150px] text-white   focus:ring-4 focus:outline-none  font-medium rounded-[10px] text-base px-6 py-3 text-center bg-gray-700 hover:bg-gray-600 transition-all duration-300  ">
            Cancel
          </button>

          <button
            onClick={() => handleClick()}
            className=" py-3 px-6 font-poppins min-w-[150px]  bg-blue-gradient rounded-[10px] font-semibold text-base text-gray-800">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckPasswords;
