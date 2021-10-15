import React, { useState } from "react";
import Menu from "./Menu";
import MobileNav from "./MobileNav";
import { NavLink, useLocation } from "react-router-dom";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PROFILE_ROUTE,
  FAVOURITES_ROUTE,
  BOOKS_ROUTE,
} from "../routes";
import logoIcon from "../assets/logo.svg";
import userIcon from "../assets/userPlaceholder.svg";

// TODO check if user is logged in so it will show signout option else it will show login and sign up

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isOptionOpened, setIsOptionOpened] = useState(false);

  function handleShowMenu() {
    setNavbarOpen((prev) => !prev);
  }

  const styles = {
    borderBottom: "2px solid #55b8ef",
    color: "#55b8ef",
  };

  const location = useLocation();

  const isActive = (route) => {
    return location.pathname === route ? "active" : "";
  };

  return (
    <div className={navbarOpen ? "bg-white" : "bg-primary"}>
      <div className="flex justify-around">
        <NavLink to={HOME_ROUTE}>
          <img src={logoIcon} alt="logo" />
        </NavLink>

        <div className="hidden sm:flex">
          <div>
            <NavLink
              to={HOME_ROUTE}
              activeStyle={isActive(HOME_ROUTE) ? styles : {}}
              className="text-xl mr-3"
            >
              Home
            </NavLink>
          </div>
          <div>
            <NavLink
              to={BOOKS_ROUTE}
              activeStyle={isActive(BOOKS_ROUTE) ? styles : {}}
              className="text-xl mr-3"
            >
              Books
            </NavLink>
          </div>
          <div>
            <NavLink
              to={ABOUT_ROUTE}
              activeStyle={isActive(ABOUT_ROUTE) ? styles : {}}
              className="text-xl mr-3"
            >
              About
            </NavLink>
          </div>
          <div>
            <NavLink
              to={FAVOURITES_ROUTE}
              activeStyle={isActive(FAVOURITES_ROUTE) ? styles : {}}
              className="text-xl"
            >
              Favourites
            </NavLink>
          </div>
        </div>
        <div className="sm:flex items-end hidden">
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
                className="origin-top-right absolute -right-8 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <NavLink
                    to={PROFILE_ROUTE}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Profile
                  </NavLink>
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
        <Menu navbarOpen={navbarOpen} onShowMenu={handleShowMenu} />
      </div>
      <MobileNav navbarOpen={navbarOpen} onShowMenu={handleShowMenu} />
    </div>
  );
}

export default Navbar;
