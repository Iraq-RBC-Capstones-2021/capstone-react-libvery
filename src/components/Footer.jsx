import React from "react";
import logo from "../assets/logo.svg";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";

function Footer() {
  return (
    <footer>
      <div className="p-10 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-40 ">
            <div className="mb-5 flex flex-col justify-around items-center">
              <img className="mb-11 lg:mr-36" src={logo} alt="checkmark" />
              <div className="flex flex-col justify-center items-center md:items-start md:text-left">
                <p className="font-bold text-lg md:self-center lg:self-start">
                  Contact Us
                </p>
                <p>Email Address: example@example.com</p>
                <p>Phone Number: 0770 000 00 00</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center mt-2">
                <a href="/" className="mx-5">
                  Home
                </a>
                <a href="/about" className="mx-5">
                  About
                </a>
                <a href="/books" className="mx-5">
                  Books
                </a>
                <a href="/favorites" className="mx-5">
                  Favorites
                </a>
              </div>
              <div className="flex flex-col justify-end items-center mt-10 md:mt-16 mb-5">
                <p className=" pb-1 md:mr-24 ">Never miss an update</p>

                <div className="flex items-center md:mr-2">
                  <input
                    type="text"
                    className="w-52 h-7 pl-1"
                    name="newsletter"
                    id="newsletter"
                    placeholder="Subscribe to our newsletter"
                  />
                  <button className="bg-blue-500 w-8 h-7 border-8 border-solid border-blue-500 flex justify-center items-center">
                    <GiCheckMark color="white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-5 md:col-span-2 lg:col-span-1">
              <div className="flex justify-around  mb-5 mt-2 lg:mb-6">
                <FaFacebook size="1.7rem" />
                <FaInstagram size="1.7rem" />
                <FaTwitter size="1.7rem" />
                <FaGithub size="1.7rem" />
              </div>
              <select className="mt-5 lg:mt-16" id="lang-dropdown">
                <option value="english">EN</option>
                <option value="arabic">AR</option>
                <option value="arabic">KU</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
