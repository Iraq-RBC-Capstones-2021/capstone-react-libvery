import { signOut } from "@firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase.js";
import { setLogOut } from "../store/users/userSlice.js";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const SignoutButton = ({ className, setIsOptionOpened, onShowMenu }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogOut());
        history.replace("/");
        setIsOptionOpened(false);
        onShowMenu();
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <button className={className} type="button" onClick={handleSignOut}>
      {t("sign_out")}
    </button>
  );
};

export default SignoutButton;
