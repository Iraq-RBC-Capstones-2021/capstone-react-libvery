import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Books from "./pages/Books";
import Error from "./pages/Error";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Navbar from "./components/Navbar.jsx";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  BOOKS_ROUTE,
  FAVOURITES_ROUTE,
  SIGNIN_ROUTE,
  PROFILE_ROUTE,
} from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={HOME_ROUTE} component={Home} />
        <Route path={ABOUT_ROUTE} component={About} />
        <Route path={BOOKS_ROUTE} component={Books} />
        <Route path={FAVOURITES_ROUTE} component={Favourites} />
        <Route path={SIGNIN_ROUTE} component={Signup} />
        <Route path={SIGNIN_ROUTE} component={Signin} />
        <Route path={PROFILE_ROUTE} component={Profile} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
