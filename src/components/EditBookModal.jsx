import React from "react";
import Modal from "react-modal";
import defaultImage from "../assets/team.svg";
import CloseButton from "../helpers/CloseButton";
import { motion } from "framer-motion";

const el = document.getElementById("root");
Modal.setAppElement(el);

function ContactModal({ isEditBookOpen, setIsEditBookOpen }) {
  return (
    <>
      {isEditBookOpen && (
        <Modal
          className="bg-black mx-auto mt-40 rounded-lg text-white h-2/4 w-3/4 sm:max-w-sm"
          isOpen={isEditBookOpen}
          onRequestClose={() => setIsEditBookOpen(false)}
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
              setIsEditBookOpen={setIsEditBookOpen}
              isEditBookOpen={isEditBookOpen}
            />
            <img
              src={defaultImage}
              alt="default"
              className="w-32 mx-auto mt-8"
            />
          </motion.div>
        </Modal>
      )}
    </>
  );
}

export default ContactModal;
