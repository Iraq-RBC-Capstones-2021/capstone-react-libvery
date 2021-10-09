import React from "react";
import { motion } from "framer-motion";

function AnimateButton({ text, classStyle, children, OnClick }) {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        type="button"
        className={classStyle}
        onClick={() => {
          OnClick();
        }}
      >
        {text}
        {children}
      </motion.button>
    </>
  );
}

export default AnimateButton;
