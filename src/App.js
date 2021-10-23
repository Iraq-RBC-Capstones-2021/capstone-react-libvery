import React, { useEffect } from "react";

import { Switch, Route, useLocation } from "react-router-dom";
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
import { AnimatePresence } from "framer-motion";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { addBooks, emptyBooks } from "./store/addBooksSlice";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  const books = useSelector((state) => state.addBooks.books);

  // async function getData() {
  //   const q = query(collection(db, "books"));

  //   const querySnapshot = await getDocs(q);
  //   let data = [];
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //     data.push(doc.data());
  //   });

  //   console.log("dataaaaaaaaaaaaaa", data);
  //   dispatch(addBooks(data));
  //   // dispatch(addBookmark(bookmarks.bookmarks));
  //   // setLocalState(data);
  // }

  useEffect(() => {
    // getData();
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
        // this is to delete createdAt from redux store since it logs error in console.
        cities.forEach((book) => {
          delete book.createdAt;
        });
      });
      console.log("Current cities in CA: ", cities);
      dispatch(addBooks(cities));
    });

    // dispatch(emptyBooks());
    return unsubscribe;
    //eslint-disable-next-line
  }, []);

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
