import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../routes";
import ErrorImg from "../assets/error";

function Error() {
  return (
    <div className="bg-primary h-screen font-sans flex flex-col justify-center">
      <h1 className="text-4xl font-semibold mr-28 text-center">Ooops,</h1>
      <p className="text-xl text-center">There is no such a page</p>
      <ErrorImg />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-secondary text-Cards px-3 py-1 rounded-md mx-auto mt-8 text-2xl transform bg-opacity-90 hover:bg-opacity-100 focus:outline-none focus:ring-4 focus:ring-secondary focus:ring-opacity-50"
      >
        <Link to={HOME_ROUTE} className="text-center">
          Back
        </Link>
      </motion.button>
    </div>
  );
}

export default Error;
