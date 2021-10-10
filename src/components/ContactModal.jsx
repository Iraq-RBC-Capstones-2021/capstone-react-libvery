import React from "react";
import Modal from "react-modal";
import defaultImage from "../assets/team.svg";
import CloseButton from "../helpers/CloseButton";
import { motion } from "framer-motion";

const el = document.getElementById("root");
Modal.setAppElement(el);

function ContactModal({ isContactModalOpen, setIsContactModalOpen }) {
  return (
    <>
      {isContactModalOpen && (
        <Modal
          className="bg-black mx-auto mt-40 rounded-lg text-white h-2/4 w-3/4 sm:max-w-sm"
          isOpen={isContactModalOpen}
          onRequestClose={() => setIsContactModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{
              opacity: 1,
              y: "0",
              transition: {
                duration: 0.5,
              },
            }}
            className="flex flex-col justify-center items-center text-white sm:max-w-sm mx-auto relative"
          >
            <CloseButton
              setIsContactModalOpen={setIsContactModalOpen}
              isContactModalOpen={isContactModalOpen}
            />
            <img
              src={defaultImage}
              alt="default"
              className="w-32 mx-auto mt-8"
            />
            <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 rounded-md w-3/4">
              User name
            </p>
            <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 ms:w-1/3 rounded-md w-3/4">
              <a href="mailto:example@example.com">example@example.com</a>
            </p>
            <p className="bg-gray-300 bg-opacity-25 py-1 px-3 ms:w-1/3 rounded-md w-3/4">
              <a href="tel:+9647700000000">+964770 000 00 00</a>
            </p>
          </motion.div>
        </Modal>
      )}
    </>
  );
}

export default ContactModal;
