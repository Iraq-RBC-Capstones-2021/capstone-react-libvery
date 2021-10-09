import React, { useState } from "react";
import Modal from "react-modal";
import defaultImage from "../assets/team.svg";

const el = document.getElementById("root");

Modal.setAppElement(el);
function ContactModal({ isContactModalOpen, setIsContactModalOpen }) {
  return (
    <div>
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
        <div className="flex flex-col justify-center items-center text-white sm:max-w-sm mx-auto relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 bg-red-500 rounded-lg absolute top-0 right-0 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => setIsContactModalOpen(false)}
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <img src={defaultImage} alt="default" className="w-32 mx-auto mt-8" />
          <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 rounded-md w-3/4">
            User name
          </p>
          <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 ms:w-1/3 rounded-md w-3/4">
            <a href="mailto:example@example.com">example@example.com</a>
          </p>
          <p className="bg-gray-300 bg-opacity-25 py-1 px-3 ms:w-1/3 rounded-md w-3/4">
            <a href="tel:+9647700000000">+964770 000 00 00</a>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default ContactModal;
