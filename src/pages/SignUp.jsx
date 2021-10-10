import React from "react";

import Email from "../assets/Email.svg";
import Key from "../assets/Key.svg";
import User from "../assets/User.svg";
import Phone from "../assets/Phone.svg";

const Signup = () => {
  return (
    <div className="min-h-screen flex  items-center md:space-x-44  justify-center flex-wrap  bg-primary font-sans ">
      <div className="bg-white m-5 p-10 md:p-16 rounded-xl shadow-2xl md:w-6/12 lg:w-5/12 ">
        <h1 className="md:text-3xl  font-bold font-sans	 mb-10 text-black">
          Create Your Account 📚
        </h1>

        <form className="space-y-3">
          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={User}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />

            <input
              type="text"
              className="w-full border-1 
                    border-gray-200 p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    "
              placeholder="Username"
            />
          </div>

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={Email}
              className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />

            <input
              type="email"
              className="w-full border-1 
                    border-gray-200 p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    "
              placeholder="E-mail"
            />
          </div>

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={Key}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />
            <input
              type="password"
              className="w-full border-1 
                    border-gray-200 p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    "
              placeholder="Password"
            />
          </div>

          <div className="relative text-gray-400 focus-within:text-gray-600 block">
            <img
              src={Key}
              className="pointer-events-none h-6 w-6 absolute top-1/2 transform -translate-y-1/2 left-3"
              alt=""
            />
            <input
              type="password"
              className="w-full border-1 
                    border-gray-200 p-3 rounded outline-none focus:border-black placeholder-gray-400
                    form-input border  py-3 px-4 bg-white  text-gray-500 appearance-none  block pl-14 focus:outline-none
                    "
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex items-center pb-5 text-gray-800  font-light text-sm">
            <input
              className="text-secondary w-5 h-5 mr-2 focus:ring-secondary 
                    focus:ring-opacity-25  border-gray-300 rounded-2xl"
              type="checkbox"
              id="agree"
            />
            I Accept Terms and Conditions
          </div>

          <button className="block w-full bg-secondary p-4 rounded text-white font-bold	 hover:text-black transition duration-300">
            Sign Up
          </button>
          <div className="flex items-center  text-gray-800  font-light text-sm">
            Already have an account?
            <span className="pl-2  font-bold"> Log In </span>
          </div>
        </form>
      </div>
      <div>
        <img src={Phone} className="m-2" alt="" />
      </div>
    </div>
  );
};

export default Signup;
