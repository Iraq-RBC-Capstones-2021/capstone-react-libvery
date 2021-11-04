import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PROFILE_ROUTE,
  FAVOURITES_ROUTE,
  BOOKS_ROUTE,
  SIGNIN_ROUTE,
} from "../routes";
import { useTranslation } from "react-i18next";
import SignoutButton from "./SignoutButton";
import { selectorUser } from "../store/users/userSlice";
import { useSelector } from "react-redux";
import userIcon from "../assets/User.svg";
import dropdownMenu from "../assets/dorpdownMenu.svg";

function MobileNav({ navbarOpen, onShowMenu }) {
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

  const { t } = useTranslation();

  const user = useSelector(selectorUser);

  return (
    <>
      <div className={navbarOpen ? "block" : "hidden"}>
        <div className="sm:hidden flex flex-col justify-center text-black mx-3">
          <NavLink
            to={HOME_ROUTE}
            activeStyle={isActive(HOME_ROUTE) ? styles : {}}
            className="text-xl mb-2"
            onClick={onShowMenu}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to={BOOKS_ROUTE}
            activeStyle={isActive(BOOKS_ROUTE) ? styles : {}}
            className="text-xl mb-2"
            onClick={onShowMenu}
          >
            {t("books")}
          </NavLink>
          <NavLink
            to={ABOUT_ROUTE}
            activeStyle={isActive(ABOUT_ROUTE) ? styles : {}}
            className="text-xl mb-2"
            onClick={onShowMenu}
          >
            {t("about")}
          </NavLink>
          {user.userName && (
            <NavLink
              to={FAVOURITES_ROUTE}
              activeStyle={isActive(FAVOURITES_ROUTE) ? styles : {}}
              className="text-xl mb-2"
              onClick={onShowMenu}
            >
              {t("favourites")}
            </NavLink>
          )}
          <div className="flex items-center py-2">
            <img
              src={user.userPhoto ? user.userPhoto : userIcon}
              alt="user"
              className="w-8 h-8"
            />
            {user.userName ? (
              <p className="opacity-50 ml-3">
                {t("hello")}, {user.userName}
              </p>
            ) : (
              <Link
                to={SIGNIN_ROUTE}
                className="opacity-50"
                onClick={onShowMenu}
              >
                {" "}
                {t("sign_in")}{" "}
              </Link>
            )}
            <div className="relative inline-block text-left">
              {user.userName && (
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
                      onClick={() => {
                        setIsOptionOpened(false);
                        onShowMenu();
                      }}
                    >
                      {t("profile")}
                    </NavLink>
                    <SignoutButton
                      className="text-gray-700 block w-full text-left px-4 py-2 text-sm transition hover:bg-blue-600 hover:text-white"
                      setIsOptionOpened={setIsOptionOpened}
                      onShowMenu={onShowMenu}
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
        </div>
      </div>
    </>
  );
}

export default MobileNav;
