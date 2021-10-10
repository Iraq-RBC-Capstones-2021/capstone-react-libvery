import React from "react";

function Navbar() {
  return (
    <div className="container flex w-screen h-14 px-8 py-2 bg-primary items-center justify-around">
      <div className="flex w-auto items-center">
        <img className="w-10" src="./logo.svg" alt="logo" />
        <h1 className="text-2xl font-bold">Libvery</h1>
      </div>
      <div className="flex items-center mx-3">
        <div className="border-b-2 mx-4 border-blue-400">
          <h1 className="text-base text-blue-400 px-4">Home</h1>
        </div>
        <div className="border-b-2 mx-4 border-white">
          <h1 className="text-base px-4">Books</h1>
        </div>
        <div className="border-b-2 mx-4 border-white">
          <h1 className="text-base px-4">About</h1>
        </div>
        <div className="border-b-2 mx-4 border-white">
          <h1 className="text-base px-4">Favorites</h1>
        </div>
      </div>
      <div className="border border-white flex items-center max-h-8">
        <h1 className="p-1 text-xs">EN</h1>
        <img
          className="h-full bg-secondary rounded-md"
          src="./dropdown white.svg"
          alt="dropdown"
        />
      </div>
      <div className="flex ml-16 items-baseline">
        <img className="w-8" src="./user.svg" alt="avatar" />
        <h1 className="mx-2 text-black"> username</h1>
        <img className="w-5 " src="./dropdown.svg" alt="dropdown" />
      </div>
    </div>
  );
}

export default Navbar;
