import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorUser } from "../store/users/userSlice";

import UserInfo from "./UserInfo";
import Favourites from "./Favourites";
import Books from "./Books";
import { useTranslation } from "react-i18next";

function Profile(props) {
  const match = props.match.url;

  const { t } = useTranslation();
  const location = useLocation();

  const user = useSelector(selectorUser);
  const { userName, userPhoto } = user;

  // TODO: get the books list from the store, filter them to get the books that belong to this user only, and pass the list to the books component to display them
  // TODO: get the books from the store and filter them to get the books that their "isBookmarked" === true and pass it to the favorites component to display them

  return (
    <div className="min-h-screen space-y-5 p-10 bg-primary font-sans ">
      <img
        src={
          userPhoto
            ? userPhoto
            : `https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg`
        }
        alt=""
        className="rounded-full m-auto"
        width="200em"
      />
      <p className="text-center text-xl  font-sans text-gray-500 ">
        @{userName}
      </p>
      <div className="flex justify-between bg-white rounded-xl items-center sm:max-w-sm mx-auto">
        <NavLink
          to={`${match}/favourites`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "10px 0 0 10px",
            padding: "0.5em",
            width: "100px",
            textAlign: "center",
          }}
          className="pl-5"
        >
          {t("favourites")}
        </NavLink>
        <NavLink
          to={`${match}/my-books`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "10px 0px 10px 0px",
            padding: "0.5em",
            width: "120px",
            textAlign: "center",
          }}
        >
          {t("my_books")}
        </NavLink>
        <NavLink
          to={`${match}/user`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "0 10px 10px 0",
            padding: "0.5em",
            width: "100px",
            textAlign: "center",
          }}
          className="  pr-5"
        >
          {t("user_info")}
        </NavLink>
      </div>

      {location.pathname === "/profile/user" ? (
        <UserInfo />
      ) : location.pathname === "/profile/favourites" ? (
        <Favourites />
      ) : (
        <Books />
      )}
    </div>
  );
}

export default Profile;
