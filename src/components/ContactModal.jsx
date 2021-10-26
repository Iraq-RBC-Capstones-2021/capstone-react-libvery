import React from "react";

import { SIGNIN_ROUTE } from "../routes";
import { Link, useHistory } from "react-router-dom";

import Modal from "react-modal";
import { motion } from "framer-motion";

import CloseButton from "../customs/CloseButton";
import defaultImage from "../assets/team.svg";

import { useSelector } from "react-redux";
import { selectorUserName } from "../store/counter/userSlice";

const el = document.getElementById("root");
Modal.setAppElement(el);

function ContactModal({
  isContactModalOpen,
  setIsContactModalOpen,
  phone,
  email,
  sellerUsername,
}) {
  const history = useHistory();
  const userName = useSelector(selectorUserName);

  const handleClose = () => {
    setIsContactModalOpen(false);
    history.goBack();
  };

  return (
    <>
      <Modal
        isOpen={isContactModalOpen}
        onRequestClose={() => handleClose()}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            border: "none",
            borderRadius: "0",
            backgroundColor: "transparent",
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
          className="flex flex-col items-center text-primary bg-black rounded-lg p-10 relative font-sans md:w-96 text-sm sm:text-lg"
        >
          <CloseButton
            setIsContactModalOpen={setIsContactModalOpen}
            isContactModalOpen={isContactModalOpen}
          />
          {userName ? (
            <>
              <img
                src={defaultImage}
                alt="default"
                className="w-32 mx-auto mt-2"
              />
              <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 rounded-md w-4/5">
                {sellerUsername}
              </p>
              <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 ms:w-1/3 rounded-md w-4/5">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="bg-gray-300 bg-opacity-25 py-1 px-3 ms:w-1/3 rounded-md w-4/5">
                <a href={`tel:${phone}`}>{phone}</a>
              </p>
            </>
          ) : (
            <>
              you have to{" "}
              <Link to={SIGNIN_ROUTE} className="font-bold text-primary">
                {" "}
                Sign In{" "}
              </Link>{" "}
              to see the seller contacts
            </>
          )}
        </motion.div>
      </Modal>
    </>
  );
}

export default ContactModal;
