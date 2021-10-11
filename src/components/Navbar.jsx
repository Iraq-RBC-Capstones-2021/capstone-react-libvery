import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HOME_ROUTE,
  BOOKS_ROUTE,
  ABOUT_ROUTE,
  FAVOURITES_ROUTE,
} from "../routes";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen bg-primary items-center md:justify-around justify-between relative z-30">
      <div
        className={
          isOpen
            ? "drawer drawer-end w-full h-screen absolute top-0"
            : "drawer drawer-end w-full h-16"
        }
      >
        <input
          id="my-drawer-3"
          type="checkbox"
          onChange={() => setIsOpen(!isOpen)}
          className="drawer-toggle"
        />
        <div className="flex flex-col drawer-content">
          <div className="w-full navbar md:justify-around justify-between  bg-primary h-16">
            <div className="flex w-auto items-center md:px-6 px-4">
              <img className="lg:w-10 w-8" src="./logo.svg" alt="logo" />
              <h1 className="lg:text-2xl text-xl font-bold">Libvery</h1>
            </div>
            <div className="flex-none lg:hidden">
              <label for="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-none hidden lg:block md:justify-around md:flex">
              <ul className="menu horizontal">
                <li className="border-b-2 mx-4 border-blue-400">
                  <Link
                    to={HOME_ROUTE}
                    className="text-base text-blue-400 px-4"
                  >
                    Home
                  </Link>
                </li>
                <li className="border-b-2 mx-4 border-white">
                  <Link to={BOOKS_ROUTE} className="text-base px-4">
                    Books
                  </Link>
                </li>
                <li className="border-b-2 mx-4 border-white">
                  <Link to={ABOUT_ROUTE} className="text-base px-4">
                    About
                  </Link>
                </li>
                <li className="border-b-2 mx-4 border-white">
                  <Link to={FAVOURITES_ROUTE} className="text-base px-4">
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
            <div className=" border border-white hidden md:flex  items-center max-h-8">
              <h1 className="p-1 text-xs">EN</h1>
              <img
                className="h-full bg-secondary rounded-md"
                src="./dropdown white.svg"
                alt="dropdown"
              />
            </div>
            <div className="hidden md:flex  ml-3 items-baseline">
              <img className="w-8" src="./user.svg" alt="avatar" />
              <h1 className="mx-2 text-black"> username</h1>
              <img className="w-5 " src="./dropdown.svg" alt="dropdown" />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            for="my-drawer-3"
            className="w-1/2 h-screen drawer-overlay"
          ></label>
          <ul className="p-4 overflow-y-auto menu justify-start align-middle w-1/2 h-screen bg-black">
            <li className="border-b-2 m-4 border-white">
              <Link
                to={HOME_ROUTE}
                className="text-base p-4 text-white self-center"
              >
                Home
              </Link>
            </li>
            <li className="border-b-2 m-4 border-white">
              <Link
                to={BOOKS_ROUTE}
                className="text-base p-4 text-white self-center"
              >
                Books
              </Link>
            </li>
            <li className="border-b-2 m-4 border-white">
              <Link
                to={ABOUT_ROUTE}
                className="text-base p-4 text-white self-center"
              >
                About
              </Link>
            </li>
            <li className="border-b-2 m-4 border-white">
              <Link
                to={FAVOURITES_ROUTE}
                className="text-base p-4 text-white self-center"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
