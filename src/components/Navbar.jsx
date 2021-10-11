import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen bg-primary items-center md:justify-around justify-between relative z-30">
      <div
        className={
          isOpen
            ? "drawer drawer-end w-full h-screen absolute top-0"
            : "drawer drawer-end w-full h-16"
        }
      >
        <input
          id="my-drawer-3"
          type="checkbox"
          onChange={() => setIsOpen(!isOpen)}
          class="drawer-toggle"
        />
        <div class="flex flex-col drawer-content">
          <div class="w-full navbar md:justify-around justify-between  bg-primary h-16">
            <div className="flex w-auto items-center md:px-6 px-4">
              <img className="lg:w-10 w-8" src="./logo.svg" alt="logo" />
              <h1 className="lg:text-2xl text-xl font-bold">Libvery</h1>
            </div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" class="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div class="flex-none hidden lg:block md:justify-around md:flex">
              <ul class="menu horizontal">
                <li className="border-b-2 mx-4 border-blue-400">
                  <a href="#" className="text-base text-blue-400 px-4">
                    Home
                  </a>
                </li>
                <li className="border-b-2 mx-4 border-white">
                  <a href="#" className="text-base px-4">
                    Books
                  </a>
                </li>
                <li className="border-b-2 mx-4 border-white">
                  <a href="#" className="text-base px-4">
                    About
                  </a>
                </li>
                <li className="border-b-2 mx-4 border-white">
                  <a href="#" className="text-base px-4">
                    Favorites
                  </a>
                </li>
              </ul>
            </div>
            <div className=" border border-white hidden md:flex  items-center max-h-8">
              <h1 className="p-1 text-xs">EN</h1>
              <img
                className="h-full bg-secondary rounded-md"
                src="./dropdown white.svg"
                alt="dropdown"
              />
            </div>
            <div className="hidden md:flex  ml-3 items-baseline">
              <img className="w-8" src="./user.svg" alt="avatar" />
              <h1 className="mx-2 text-black"> username</h1>
              <img className="w-5 " src="./dropdown.svg" alt="dropdown" />
            </div>
          </div>
        </div>
        <div class="drawer-side">
          <label
            for="my-drawer-3"
            class="w-1/2 h-screen drawer-overlay"
          ></label>
          <ul class="p-4 overflow-y-auto menu justify-start align-middle w-1/2 h-screen bg-black">
            <li className="border-b-2 m-4 border-white">
              <a href="#" className="text-base p-4 text-white self-center">
                Home
              </a>
            </li>
            <li className="border-b-2 m-4 border-white">
              <a href="#" className="text-base p-4 text-white self-center">
                Books
              </a>
            </li>
            <li className="border-b-2 m-4 border-white">
              <a href="#" className="text-base p-4 text-white self-center">
                About
              </a>
            </li>
            <li className="border-b-2 m-4 border-white">
              <a href="#" className="text-base p-4 text-white self-center">
                Favorites
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
