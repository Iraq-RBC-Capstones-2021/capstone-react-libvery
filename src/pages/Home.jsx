import React from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import homeIllustration from "../assets/homeIllustration.svg";

import { BOOKS_ROUTE } from "../routes";
import { motion } from "framer-motion";

let slides = [
  <img
    src="https://static.vecteezy.com/system/resources/thumbnails/000/217/193/small_2x/motivational-book-cover-with-hand-lettering.jpg"
    alt="1"
  />,
  <img
    src="https://static.vecteezy.com/system/resources/thumbnails/002/110/581/small_2x/abstract-geometric-cover-design-free-vector.jpg"
    alt="2"
  />,
  <img
    src="https://target.scene7.com/is/image/Target/GUEST_f0a2a9ed-bfab-45c3-abd2-083d2dc5eeb9"
    alt="3"
  />,
  <img
    src="https://static.vecteezy.com/system/resources/thumbnails/000/216/149/small_2x/MOTIVATIONAL_BOOK_COVER_MAY_18_EEZY_01.jpg"
    alt="4"
  />,
  <img
    src="https://i.pinimg.com/originals/47/e2/ac/47e2ac4acd0fbda6f28cf2fe67f60835.jpg"
    alt="5"
  />,
];

const Home = () => {
  return (
    <div className="overflow-y-hidden">
      <div className="min-h-screen bg-primary font-sans overflow-x-hidden">
        <motion.div
          exit={{ opacity: 0, x: 100 }}
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, type: "spring", stiffness: 100 },
            x: 0,
          }}
          className="lg:flex items-center justify-center h-screen flex-wrap overflow-hidden"
        >
          <div className="w-12/12 lg:w-4/12 ">
            <p className="text-xl font-light pt-10 text-center lg:text-left mb-10 font-sans">
              Deliver, Browse and Buy books <br /> All from{" "}
              <span className="font-bold text-2xl text-gray-800 ">Libvery</span>
            </p>
            <Link
              to={BOOKS_ROUTE}
              className="border-2 p-2 rounded-md flex justify-center w-44 mx-auto border-gray-800 hover:bg-gray-900 hover:text-white transition duration-300 lg:inline-block lg:text-center"
            >
              Browse Books{" "}
            </Link>
          </div>
          <div className="rounded-xl md:w-12/12 lg:w-7/12 mt-20 md:mb-28 overflow-hidden">
            <Slider slides={slides} />
          </div>
        </motion.div>
        <div className="absolute bottom-2 transform translate-y-8 w-full left-0">
          <img src={homeIllustration} alt="" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Home;
