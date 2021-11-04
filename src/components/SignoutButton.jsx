import { signOut } from "@firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase.js";
import { setLogOut } from "../store/users/userSlice.js";
import { useHistory } from "react-router";

const SignoutButton = ({ className, setIsOptionOpened }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogOut());
        history.replace("/");
        setIsOptionOpened(false);
      })
      .catch((error) => error.message);
  };
  return (
    <button className={className} type="button" onClick={handleSignOut}>
      Log Out
    </button>
  );
};

export default SignoutButton;
