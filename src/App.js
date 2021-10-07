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

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={home} />
        <Route path="/about" component={about} />
        <Route path="/books" component={books} />
        <Route path="/favourites" component={favourites} />
        <Route path="/signup" component={signup} />
        <Route path="/singin" component={signin} />
        <Route path="/error" component={error} />
        <Route path="/profile" component={profile} />
      </Switch>
    </div>
  );
}

export default App;
