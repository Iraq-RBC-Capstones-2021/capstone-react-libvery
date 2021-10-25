import React, { useState } from "react";
import SignoutButton from "../components/SignoutButton";

const UserInfo = ({ userName, userEmail, userPhone }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const handleShowForm = () => {
    setShowEditForm(!showEditForm);
  };
  return (
    <div className=" w-full max-w-sm md:max-w-sm m-auto">
      <form className="rounded px-0 pt-6 pb-8 ">
        {showEditForm ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm mb-2">
                Username
              </label>
              <input
                className=" shadow appearance-none border-none rounded-lg  focus:outline-none outline-none w-full py-3 px-3 text-gray-500 font leading-tight  focus:shadow-outline font-extralight text-sm"
                id="username"
                type="text"
                placeholder="EX: Jack"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font text-sm mb-2">
                Phone Number
              </label>
              <input
                className="border-none w-full 	 shadow appearance-none border  rounded-lg  py-3 px-3 text-gray-500 font mb-3 leading-tight focus:outline-none focus:shadow-outline font-extralight text-sm"
                id="tel"
                type="tel"
                placeholder="EX: 078012345678"
              />
            </div>
          </>
        ) : (
          <div className="space-y-3 mb-10 font-bold text-lg">
            <p>Name: {userName} </p>
            <p>Email: {userEmail} </p>
            <p>
              Phone Number:{" "}
              {userPhone ? userPhone : `"🎃 👇 Add a phone number"`}{" "}
            </p>
          </div>
        )}

        <div className="flex items-center justify-center m-2 ">
          <button
            className="bg-black hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light"
            type="button"
            onClick={handleShowForm}
          >
            {showEditForm ? "Save Changes" : "Edit"}
          </button>
        </div>
        <div className="flex items-center justify-center ">
          <SignoutButton className=" bg-red-800  hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light" />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
