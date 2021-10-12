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
import Footer from "./components/Footer";
import BookCard from "./components/BookCard";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={HOME_ROUTE} component={Home} />
        <Route path={ABOUT_ROUTE} component={About} />
        <Route path={BOOKS_ROUTE} component={Books} />
        <Route path={FAVOURITES_ROUTE} component={Favourites} />
        <Route path={SIGNUP_ROUTE} component={SignUp} />
        <Route path={SIGNIN_ROUTE} component={SignIn} />
        <Route path={ERROR_ROUTE} component={Error} />
        <Route path={PROFILE_ROUTE} component={Profile} />
        <Route component={Error} />
      </Switch>
      {/* to showcase the BookCard, Will be removed before merge */}
      <BookCard
        image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        genres={["Action", "Drama", "Romance", "Novel", "Thriller"]}
        title="Book Title"
        rating="2.5(5)"
        price="9.99$"
      />
      <Footer />
    </>
  );
}

export default App;
