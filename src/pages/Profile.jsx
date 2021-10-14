import React from "react";
import { Link, NavLink } from "react-router-dom";

function Profile(props) {
  const match = props.match.url;

  console.log(match);

  //TODO: get the user info from the store
  return (
    <div className="min-h-screen space-y-5 p-10 bg-primary font-sans ">
      <img
        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        alt=""
        className="rounded-full m-auto"
        width="200em"
      />
      <p className="text-center text-xl  font-sans text-gray-500 ">@Username</p>
      <div className="flex justify-between bg-white rounded-xl items-center sm:max-w-lg mx-auto">
        <NavLink
          to={`${match}/favourites`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "10px 0 0 10px",
            padding: "0.5em",
          }}
        >
          Favourites
        </NavLink>
        <NavLink
          to={`${match}/my-books`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "10px",
            padding: "0.5em",
          }}
        >
          List of Books
        </NavLink>
        <NavLink
          to={`${match}/user`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "0 10px 10px 0",
            padding: "0.5em",
          }}
        >
          User Info
        </NavLink>
      </div>

      <div className=" w-full max-w-sm md:max-w-sm m-auto">
        <form className="rounded px-0 pt-6 pb-8 ">
          <div className="mb-4">
            <label className="block text-gray-500 text-sm mb-2">Username</label>
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
              className="  border-none w-full 	 shadow appearance-none border  rounded-lg  py-3 px-3 text-gray-500 font mb-3 leading-tight focus:outline-none focus:shadow-outline font-extralight text-sm"
              id="password"
              type="password"
              placeholder="EX: JKSmdno&297760"
            />
          </div>
          <div className="flex items-center justify-center m-2 ">
            <button
              className="bg-black hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light"
              type="button"
            >
              Edit
              {/* TODO: when the user presses on edit button the text should change to "Save Changes" */}
            </button>
          </div>
          <div className="flex items-center justify-center ">
            <button
              className=" bg-red-800  hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light"
              type="button"
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
