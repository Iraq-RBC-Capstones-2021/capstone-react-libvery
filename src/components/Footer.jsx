import React from "react";
import projectLogo from "../assets/projectLogo.svg";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import checkIcon from "../assets/check.svg";
import { Link } from "react-router-dom";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  BOOKS_ROUTE,
  FAVOURITES_ROUTE,
} from "../routes";

function Footer() {
  return (
    <footer>
      <div className="px-10 py-1 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-40 ">
            <div className="mb-5 flex flex-col justify-around items-center">
              <img
                className="mb-11 lg:self-start xl:ml-5"
                src={projectLogo}
                alt="checkmark"
              />
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
                <Link
                  to={HOME_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  Home
                </Link>
                <Link
                  to={ABOUT_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  About
                </Link>
                <Link
                  to={BOOKS_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  Books
                </Link>
                <Link
                  to={FAVOURITES_ROUTE}
                  className="mx-5 hover:text-secondary transform hover:scale-105"
                >
                  Favorites
                </Link>
              </div>
              <div className="flex flex-col justify-end items-center mt-10 md:mt-16 mb-5">
                <div className="flex items-center md:mr-2">
                  <div className="m-3 relative">
                    <label className="block text-gray-700 text-sm font-bold">
                      Never miss an update
                    </label>
                    <input
                      className="shadow border rounded w-72 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-1"
                      id="username"
                      type="text"
                      placeholder="Subscribe"
                    />
                    <img
                      src={checkIcon}
                      alt="checkmark icon"
                      className="cursor-pointer absolute top-5 right-0 bg-blue-400 h-3/5 w-8 rounded-tl-none rounded-bl-none rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 md:col-span-2 lg:col-span-1 flex flex-col">
              <div className="flex justify-around  mb-5 mt-2 lg:mb-6">
                <a href="/facebook" target="_blank">
                  <FaFacebook size="1.7rem" />
                </a>
                <a href="/instagram" target="_blank">
                  <FaInstagram size="1.7rem" />
                </a>
                <a href="/twitter" target="_blank">
                  <FaTwitter size="1.7rem" />
                </a>
                <a href="/github" target="_blank">
                  <FaGithub size="1.7rem" />
                </a>
              </div>
              <select className="my-5 lg:mt-16 w-32 mx-auto border-gray-300 rounded-md">
                <option value="english">English</option>
                <option value="arabic">Arabic</option>
                <option value="kurdish">Kurdish</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
