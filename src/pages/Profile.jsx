import React from "react";

function Profile() {
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
      <div className="flex justify-center"></div>

      <div class=" w-full max-w-sm md:max-w-sm m-auto">
        <form class="rounded px-0 pt-6 pb-8 ">
          <div class="mb-4">
            <label class="block text-gray-500 text-sm mb-2" for="username">
              Username
            </label>
            <input
              class=" shadow appearance-none border-none rounded-lg  focus:outline-none outline-none w-full py-3 px-3 text-gray-500 font leading-tight  focus:shadow-outline font-extralight text-sm"
              id="username"
              type="text"
              placeholder="EX: Jack"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-500 font text-sm mb-2" for="password">
              Phone Number
            </label>
            <input
              class="  border-none w-full 	 shadow appearance-none border  rounded-lg  py-3 px-3 text-gray-500 font mb-3 leading-tight focus:outline-none focus:shadow-outline font-extralight text-sm"
              id="password"
              type="password"
              placeholder="EX: JKSmdno&297760"
            />
          </div>
          <div class="flex items-center justify-center m-2 ">
            <button
              class="bg-black hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light"
              type="button"
            >
              Edit
              {/* TODO: when the user presses on edit button the text should change to "Save Changes" */}
            </button>
          </div>
          <div class="flex items-center justify-center ">
            <button
              class=" bg-red-800  hover:bg-blue-700 text-white py-2 px-4 w-44 rounded-lg focus:outline-none focus:shadow-outline font-light"
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
