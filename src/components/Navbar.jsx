import React from "react";
import { Link } from "react-router-dom";
import { ABOUT_ROUTE, FAVOURITES_ROUTE, HOME_ROUTE } from "../routes";

function Navbar() {
  return (
    <div>
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={ABOUT_ROUTE}>About</Link>
      <Link to={FAVOURITES_ROUTE}>Favourites</Link>
    </div>
  );
}

export default Navbar;
