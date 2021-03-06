import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../store/users/userSlice";

import Google from "../assets/Google.svg";

import { auth, db, googleProvider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setDoc(doc(db, "users", result.user.uid), {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          books: [],
          favorites: [],
        });
        dispatch(
          setActiveUser({
            userName: result.user.displayName,
            userEmail: result.user.email,
            userPhoto: result.user.photoURL,
          })
        );
        history.push("/profile");
      })
      .catch((error) => {});
  };

  return (
    <>
      <button onClick={handleSignIn}>
        {" "}
        <img src={Google} alt="" />
      </button>
    </>
  );
};

export default GoogleAuth;
