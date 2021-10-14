import React, { useState } from "react";
import Menu from "./Menu";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  PROFILE_ROUTE,
  FAVOURITES_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  BOOKS_ROUTE,
} from "../routes";
import logoIcon from "../assets/logo.svg";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  function handleShowMenu() {
    setNavbarOpen((prev) => !prev);
  }

  return (
    <div className={navbarOpen ? "bg-white" : "bg-primary"}>
      <div className="flex justify-between mx-4">
        <div>
          <img src={logoIcon} alt="logo" className="w-32" />
        </div>
        <div className="">
          <div className="hidden sm:flex">
            <Link to={HOME_ROUTE}>Home</Link>
            <Link to={BOOKS_ROUTE}>Books</Link>
            <Link to={ABOUT_ROUTE}>About</Link>
            <Link to={FAVOURITES_ROUTE}>Favourites</Link>
          </div>
        </div>
        <Menu navbarOpen={navbarOpen} onShowMenu={handleShowMenu} />
      </div>
      <MobileNav navbarOpen={navbarOpen} onShowMenu={handleShowMenu} />
    </div>
  );
}

export default Navbar;
