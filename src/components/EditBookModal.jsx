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
          //   className="bg-green-400"
          isOpen={isEditBookOpen}
          onRequestClose={() => setIsEditBookOpen(false)}
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
            className="flex flex-col justify-center items-center text-white sm:max-w-2xl bg-white rounded-lg p-10 mx-auto relative"
          >
            <CloseButton
              setIsEditBookOpen={setIsEditBookOpen}
              isEditBookOpen={isEditBookOpen}
            />
            <form className="w-full max-w-md bg-white rounded mb-4 mt-10 sm:max-w-2xl md:max-w-md">
              <h2 className="text-black font-semibold flex justify-center mb-4 text-2xl">
                Update Book Details
              </h2>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="bookTitle"
                type="text"
                placeholder="Book Title *"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="author"
                type="text"
                placeholder="Author *"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="category"
                type="text"
                placeholder="Book Category *"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="price"
                type="text"
                placeholder="Price *"
              />
              <textarea
                name="decription"
                id="decription"
                cols="22"
                rows="5"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                placeholder="Description"
              ></textarea>
              <label className="w-60 text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center">
                <span>Upload Book Cover</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <input type="file" className="hidden" />
              </label>
              <label className="flex text-black items-center">
                <p className="mr-2">Are you donating this book?</p>
                <input type="checkbox" name="yes" id="yes" />
              </label>
              <button
                className="bg-secondary text-white font-semibold py-1 px-4 rounded-sm mb-4 container mt-2"
                type="submit"
              >
                Update Book
              </button>
            </form>
          </motion.div>
        </Modal>
      )}
    </>
  );
}

export default ContactModal;
