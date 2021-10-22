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
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { addBooks } from "./store/addBooksSlice";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  const books = useSelector((state) => state.addBooks.books);

  useEffect(() => {
    async function getData() {
      const q = query(collection(db, "books"));

      const querySnapshot = await getDocs(q);
      let data = [];
      let allData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      // the console gave error due to createdAt being stored in the redux store. so I remove it in this way.
      // add all data except createdAt to the store. not sure if this is the best way to do it.
      allData.forEach((book) => {
        delete book.createdAt;
        data.push(book);
      });

      // dispatch(addBooks(allData));
      dispatch(addBooks(data));
      console.log("dataaaaaaaaaaaaaa", allData);
    }

    getData();
  }, [dispatch]);

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
