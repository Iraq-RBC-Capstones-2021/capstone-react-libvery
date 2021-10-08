import React from "react";
import error from "../assets/error.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../routes";

function Error() {
  return (
    <div className="bg-primary h-screen font-sans flex flex-col justify-center">
      <h1 className="text-4xl font-semibold mr-28 text-center">Ooops,</h1>
      <p className="text-xl text-center">There is no such a page</p>
      <img className="mx-auto sm:max-w-xl" src={error} alt="error" />
      <Link to={HOME_ROUTE} className="text-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-secondary text-Cards px-3 py-1 rounded-md mx-auto mt-8 text-2xl transform bg-opacity-90 hover:bg-opacity-100 focus:outline-none focus:ring-4 focus:ring-secondary focus:ring-opacity-50"
        >
          Back
        </motion.button>
      </Link>
    </div>
  );
}

export default Error;
