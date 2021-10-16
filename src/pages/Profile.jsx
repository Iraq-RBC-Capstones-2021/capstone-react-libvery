import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Components
import UserInfo from "./UserInfo";
import Favourites from "./Favourites";
import Books from "./Books";

function Profile(props) {
  const match = props.match.url;
  const location = useLocation();

  // TODO: get the user info from the store and pass it to the UserInfo component
  // TODO: get the books list from the store, filter them to get the books that belong to this user only, and pass the list to the books component to display them
  // TODO: get the books from the store and filter them to get the books that their "isBookmarked" === true and pass it to the favorites component to display them

  return (
    <div className="min-h-screen space-y-5 p-10 bg-primary font-sans ">
      <img
        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        alt=""
        className="rounded-full m-auto"
        width="200em"
      />
      <p className="text-center text-xl  font-sans text-gray-500 ">@Username</p>
      <div className="flex justify-between bg-white rounded-xl items-center sm:max-w-sm mx-auto">
        <NavLink
          to={`${match}/favourites`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "10px 0 0 10px",
            padding: "0.5em",
          }}
        >
          Favourites
        </NavLink>
        <NavLink
          to={`${match}/my-books`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "10px",
            padding: "0.5em",
          }}
        >
          My Books
        </NavLink>
        <NavLink
          to={`${match}/user`}
          activeStyle={{
            backgroundColor: "#BE856A",
            color: "#fff",
            borderRadius: "0 10px 10px 0",
            padding: "0.5em",
          }}
        >
          User Info
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
