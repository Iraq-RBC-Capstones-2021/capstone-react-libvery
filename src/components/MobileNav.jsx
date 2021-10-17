import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PROFILE_ROUTE,
  FAVOURITES_ROUTE,
  BOOKS_ROUTE,
} from "../routes";
import userIcon from "../assets/userPlaceholder.svg";

function MobileNav({ navbarOpen }) {
  const [isOptionOpened, setIsOptionOpened] = useState(false);

  const styles = {
    borderBottom: "2px solid #55b8ef",
    width: "20%",
    color: "#55b8ef",
  };

  const location = useLocation();

  const isActive = (route) => {
    return location.pathname === route ? "active" : "";
  };

  return (
    <>
      <div className={navbarOpen ? "block" : "hidden"}>
        <div className="sm:hidden flex flex-col justify-center text-black mx-3">
          <NavLink
            to={HOME_ROUTE}
            activeStyle={isActive(HOME_ROUTE) ? styles : {}}
            className="text-xl mb-2"
          >
            Home
          </NavLink>
          <NavLink
            to={BOOKS_ROUTE}
            activeStyle={isActive(BOOKS_ROUTE) ? styles : {}}
            className="text-xl mb-2"
          >
            Books
          </NavLink>
          <NavLink
            to={ABOUT_ROUTE}
            activeStyle={isActive(ABOUT_ROUTE) ? styles : {}}
            className="text-xl mb-2"
          >
            About
          </NavLink>
          <NavLink
            to={FAVOURITES_ROUTE}
            activeStyle={isActive(FAVOURITES_ROUTE) ? styles : {}}
            className="text-xl mb-2"
          >
            Favourites
          </NavLink>
          <div className="flex items-center">
            <img
              src={userIcon}
              alt="user"
              className="w-10 h-10 border-2 rounded-full"
            />
            <p className="opacity-50">Username</p>
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setIsOptionOpened(!isOptionOpened)}
                  type="button"
                  className="font-semibold relative"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <svg
                    className="w-8 absolute -bottom-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isOptionOpened ? (
                <div
                  className="origin-top-right absolute w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      to={`${PROFILE_ROUTE}/user`}
                      className="text-gray-700 block px-4 py-2 text-sm capitalize"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Profile
                    </Link>
                    <form method="POST" action="#" role="none">
                      <button
                        type="submit"
                        className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-3"
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
