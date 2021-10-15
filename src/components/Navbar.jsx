import React from "react";
import { Link } from "react-router-dom";
import {
  ABOUT_ROUTE,
  BOOKS_ROUTE,
  FAVOURITES_ROUTE,
  HOME_ROUTE,
} from "../routes";

function Navbar() {
  return (
    <div>
      <Link to={HOME_ROUTE}>Home</Link>
      <Link to={ABOUT_ROUTE}>About</Link>
      <Link to={FAVOURITES_ROUTE}>Favourites</Link>
      <Link to={BOOKS_ROUTE}>Books</Link>
    </div>
  );
}

export default Navbar;
