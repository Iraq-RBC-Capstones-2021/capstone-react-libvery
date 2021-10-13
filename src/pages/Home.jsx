import React from "react";
import { Link } from "react-router-dom";
import HomeSlides from "../components/HomeSlides";
import homeIllustration from "../assets/homeIllustration.svg";

import { BOOKS_ROUTE } from "../routes";

const Home = () => {
  return (
    <>
      <div className="min-h-screen  bg-primary font-sans">
        <div className="lg:flex items-center justify-center h-screen flex-wrap">
          <div className="w-12/12 lg:w-4/12 ">
            <p className="text-xl font-light pt-10 text-center lg:text-left mb-10 font-sans">
              Deliver, Browse and Buy books <br /> All from{" "}
              <span className="font-bold text-2xl text-gray-800 ">Libvery</span>
            </p>
            <Link
              to={BOOKS_ROUTE}
              className="border-2 lg:inline-block font-light block w-44 m-auto lg:m-0 rounded-xl px-8 py-2 text-gray-700 border-gray-700 hover:text-primary hover:bg-gray-800 transition duration-500"
            >
              Browse Books{" "}
            </Link>
          </div>
          <div className="rounded-xl md:w-12/12 lg:w-7/12 mt-20 md:mb-28">
            <HomeSlides />
          </div>
        </div>
        <div
          className="
                absolute bottom-2 transform translate-y-8  w-full left-0 "
        >
          <img src={homeIllustration} alt="" width="100%" />
        </div>
      </div>
    </>
  );
};

export default Home;
