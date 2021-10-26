import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
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
import BooksDetail from "./pages/BooksDetail.jsx";
import Loader from "./components/Loader";

import { AnimatePresence } from "framer-motion";

import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "./firebase";

import { useDispatch } from "react-redux";
import { setActiveUser, setLogOut } from "./store/counter/userSlice";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoading(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(
          setActiveUser({
            userName:
              docSnap._document.data.value.mapValue.fields.username.stringValue,
            userEmail: user.email,
            uid: user.uid,
            userPhone:
              docSnap._document.data.value.mapValue.fields.phone.stringValue,
            userPhoto:
              docSnap._document.data.value.mapValue.fields.photo.stringValue,
          })
        );
        setIsLoading(false);
      } else {
        dispatch(setLogOut());
      }
    });
  }, [dispatch]);

  if (isLoading) return <Loader />;
  return (
    <div className="bg-primary overflow-x-hidden">
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location}>
          <Route path={ABOUT_ROUTE} component={About} />
          <Route path={`${BOOKS_ROUTE}/:id`} component={BooksDetail} />
          <Route path={BOOKS_ROUTE} component={Books} />
          <Route path={FAVOURITES_ROUTE} component={Favourites} />
          <Route path={SIGNUP_ROUTE} component={SignUp} />
          <Route path={SIGNIN_ROUTE} component={SignIn} />
          <Route path={ERROR_ROUTE} component={Error} />
          <Route path={PROFILE_ROUTE} component={Profile} />
          <Route exact path={HOME_ROUTE} component={Home} />
          <Route component={Error} />
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
