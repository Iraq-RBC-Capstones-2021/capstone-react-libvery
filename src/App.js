import React from "react";
import { Switch, Route } from "react-router-dom";

import About from "./pages/About";
import Books from "./pages/Books";
import Error from "./pages/Error";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";

import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  BOOKS_ROUTE,
  FAVOURITES_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  ERROR_ROUTE,
  PROFILE_ROUTE,
} from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={ABOUT_ROUTE} component={About} />
        <Route path={BOOKS_ROUTE} component={Books} />
        <Route path={FAVOURITES_ROUTE} component={Favourites} />
        <Route path={SIGNUP_ROUTE} component={SignUp} />
        <Route path={SIGNIN_ROUTE} component={SignIn} />
        <Route path={ERROR_ROUTE} component={Error} />
        <Route path={PROFILE_ROUTE} component={Profile} />
        <Route exact path={HOME_ROUTE} component={Home} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
