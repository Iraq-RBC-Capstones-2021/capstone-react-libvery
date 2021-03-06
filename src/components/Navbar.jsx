import React, { useState } from "react";
import Menu from "./Menu";
import MobileNav from "./MobileNav";
import { useTranslation } from "react-i18next";

import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PROFILE_ROUTE,
  FAVOURITES_ROUTE,
  BOOKS_ROUTE,
  SIGNIN_ROUTE,
} from "../routes";

import logoIcon from "../assets/logo.svg";
import userIcon from "../assets/userPlaceholder.svg";
import dropdownMenu from "../assets/dorpdownMenu.svg";
import SignoutButton from "./SignoutButton";

import { useSelector } from "react-redux";
import { selectorUser } from "../store/users/userSlice";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isOptionOpened, setIsOptionOpened] = useState(false);
  const { t } = useTranslation();

  const user = useSelector(selectorUser);
  const { userName, userPhoto } = user;

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
    <div className={navbarOpen ? "bg-white sm:bg-primary" : "bg-primary"}>
      <div className="flex sm:justify-around justify-between items-center mx-2 py-5">
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
              {t("home")}
            </NavLink>
          </div>
          <div>
            <NavLink
              to={BOOKS_ROUTE}
              activeStyle={isActive(BOOKS_ROUTE) ? styles : {}}
              className="text-xl mr-3"
            >
              {t("books")}
            </NavLink>
          </div>
          <div>
            <NavLink
              to={ABOUT_ROUTE}
              activeStyle={isActive(ABOUT_ROUTE) ? styles : {}}
              className="text-xl mr-3"
            >
              {t("about")}
            </NavLink>
          </div>
          {userName && (
            <div>
              <NavLink
                to={FAVOURITES_ROUTE}
                activeStyle={isActive(FAVOURITES_ROUTE) ? styles : {}}
                className="text-xl"
              >
                {t("favourites")}
              </NavLink>
            </div>
          )}
        </div>
        <div className="sm:flex items-center hidden">
          <img
            src={userPhoto ? userPhoto : userIcon}
            alt="user"
            className="w-10 h-10 border-2 rounded-full"
          />
          <p className="opacity-50 pl-3">
            {userName ? (
              <>
                {t("hello")}, {userName}
              </>
            ) : (
              <Link to={SIGNIN_ROUTE}> {t("sign_in")} </Link>
            )}
          </p>
          <div className="relative inline-block text-left">
            {userName && (
              <div>
                <button
                  onClick={() => setIsOptionOpened(!isOptionOpened)}
                  type="button"
                  className="font-semibold relative"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <img
                    src={dropdownMenu}
                    className="h-6 w-6 ml-3 relative top-1"
                    alt="menu"
                  />
                </button>
              </div>
            )}
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
                    to={`${PROFILE_ROUTE}/user`}
                    className="text-gray-700 block px-4 py-2 text-sm transition hover:bg-blue-600 hover:text-white"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => setIsOptionOpened(false)}
                  >
                    {t("profile")}
                  </NavLink>
                  <SignoutButton
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm transition hover:bg-blue-600 hover:text-white"
                    setIsOptionOpened={setIsOptionOpened}
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  />
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
