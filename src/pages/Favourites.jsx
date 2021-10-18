import { motion } from "framer-motion";
import React from "react";

function Favourites() {
  return (
    <motion.div
      exit={{ opacity: 0, x: 100 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        transition: { duration: 1, type: "spring", stiffness: 100 },
        x: 0,
      }}
    >
      <h1>Favourites</h1>
    </motion.div>
  );
}

export default Favourites;
