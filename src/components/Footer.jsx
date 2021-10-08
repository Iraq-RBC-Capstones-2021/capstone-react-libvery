import React from "react";
import logo from "../assets/logo.svg";

function Footer() {
  return (
    <footer>
      <div className="p-10 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-40 ">
            <div className="mb-5 flex flex-col justify-around items-center">
              <img className="mb-5" src={logo} alt="checkmark" />
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-lg">Contact Us</p>
                <p>Email Address:Example@gmail.com</p>
                <p>Phone Number: 750 794 43 23</p>
              </div>
            </div>
            <div className="mb-5 border-red border-solid border-2 flex flex-col">
              <div className="flex justify-center mb-3">
                <a href="/" className="mx-5">
                  Home
                </a>
                <a href="/about" className="mx-5">
                  About
                </a>
                <a href="/books" className="mx-5">
                  Books
                </a>
                <a href="/favorites" className="mx-5">
                  Favorites
                </a>
              </div>
              <div className="flex flex-col justify-end items-center">
                <p className="text-left">never miss an update</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-52 h-7"
                    name="newsletter"
                    id="newsletter"
                    placeholder="Subscribe to our newsletter"
                  />
                  <button className="bg-blue-500 w-8 h-7 border-8 border-solid border-blue-500 flex justify-center items-center"></button>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <div></div>
              <select id="lang-dropdown">
                <option value="english">EN</option>
                <option value="arabic">AR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
