import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/favourites">Favourites</Link>
      <Link to="/favourites">Favourites</Link>
    </div>
  );
}

export default Navbar;
