import React from "react";
import { Switch, Route } from "react-router-dom";
import about from "./pages/about";
import books from "./pages/books";
import error from "./pages/error";
import favourites from "./pages/favourites";
import home from "./pages/home";
import profile from "./pages/profile";
import signin from "./pages/signin";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  BOOKS_ROUTE,
  FAVOURITES_ROUTE,
  SIGNIN_ROUTE,
  ERROR_ROUTE,
  PROFILE_ROUTE,
} from "./routes";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={HOME_ROUTE} component={home} />
        <Route path={ABOUT_ROUTE} component={about} />
        <Route path={BOOKS_ROUTE} component={books} />
        <Route path={FAVOURITES_ROUTE} component={favourites} />
        <Route path={SIGNIN_ROUTE} component={signup} />
        <Route path={SIGNIN_ROUTE} component={signin} />
        <Route path={ERROR_ROUTE} component={error} />
        <Route path={PROFILE_ROUTE} component={profile} />
      </Switch>
    </>
  );
}

export default App;
