import React, { useEffect } from "react";
import Modal from "react-modal";
import defaultImage from "../assets/team.svg";
import CloseButton from "../helpers/CloseButton";
import { motion } from "framer-motion";

const el = document.getElementById("root");
Modal.setAppElement(el);

function ContactModal({
  isContactModalOpen,
  setIsContactModalOpen,
  phone,
  email,
  sellerUsername,
}) {
  useEffect(() => {
    if (isContactModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("bg-green-400");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isContactModalOpen]);

  if (!isContactModalOpen) return null;

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-75 w-full h-screen z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: "-100vh" }}
          animate={{
            opacity: 1,
            y: "0",
            transition: {
              duration: 0.5,
            },
          }}
          className="flex flex-col justify-center items-center text-black bg-white sm:w-96 rounded-lg p-10 mx-auto relative w-80 font-sans text-sm sm:text-lg"
        >
          <CloseButton
            setIsContactModalOpen={setIsContactModalOpen}
            isContactModalOpen={isContactModalOpen}
          />
          <img src={defaultImage} alt="default" className="w-32 mx-auto mt-2" />
          <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 rounded-md w-4/5">
            {sellerUsername}
          </p>
          <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 ms:w-1/3 rounded-md w-4/5">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="bg-gray-300 bg-opacity-25 py-1 px-3 ms:w-1/3 rounded-md w-4/5">
            <a href={`tel:${phone}`}>{phone}</a>
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default ContactModal;
