import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import homeIllustration from "../assets/homeIllustration.svg";

import { BOOKS_ROUTE } from "../routes";
import { motion } from "framer-motion";
import { db } from "../firebase";
import {
  query,
  orderBy,
  onSnapshot,
  limit,
  collection,
} from "firebase/firestore";

const Home = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "books"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const unsub = onSnapshot(q, (snapshot) =>
      setSlides(snapshot.docs.map((doc) => doc.data().image))
    );

    return unsub;
  }, []);

  const slidesArr = slides.map((slide, index) => {
    return (
      <img
        className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-84 lg:w-84 lg:h-96"
        src={slide}
        alt={index + 1}
      />
    );
  });

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
            <Slider slides={slidesArr} />
          </div>
        </motion.div>
        <div className="absolute bottom-0 -m-8 transform translate-y-12 w-full left-0">
          <img src={homeIllustration} alt="" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Home;
