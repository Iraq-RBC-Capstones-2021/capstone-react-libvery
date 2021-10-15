import React from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trash.svg";
import plusIcon from "../assets/plus.svg";

const el = document.getElementById("root");
Modal.setAppElement(el);

function EditImageModal({ isEditImageOpen, setIsEditImageOpen }) {
  const history = useHistory();

  const handleClose = () => {
    setIsEditImageOpen(false);
    history.goBack();
  };

  return (
    <>
      <Modal
        isOpen={isEditImageOpen}
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
          className="flex flex-col justify-center items-center text-white bg-white sm:w-96 rounded-lg p-10 mx-auto relative w-80"
        >
          <CloseButton
            setIsEditImageOpen={setIsEditImageOpen}
            isEditImageOpen={isEditImageOpen}
          />
          <form className="font-sans">
            <h2 className="text-black font-semibold flex justify-center mb-4 text-2xl">
              Update Images
            </h2>
            <div className="flex items-center">
              <label className="w-32 text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center h-32 mx-auto mb-2">
                <img src={plusIcon} alt="plus icon" className="w-10 h-10" />
                <input type="file" className="hidden" />
              </label>
              <div>
                <img
                  src={editIcon}
                  alt=""
                  className="bg-black w-6 mb-4 rounded-full cursor-pointer"
                />
                <img
                  src={trashIcon}
                  alt=""
                  className="bg-black rounded-full cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center h-32 mx-auto mb-2">
                <img src={plusIcon} alt="plus icon" className="w-10 h-10" />
                <input type="file" className="hidden" />
              </label>
              <div>
                <img
                  src={editIcon}
                  alt=""
                  className="bg-black w-6 mb-4 rounded-full cursor-pointer"
                />
                <img
                  src={trashIcon}
                  alt=""
                  className="bg-black rounded-full cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-32 text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center h-32 mx-auto mb-2">
                <img src={plusIcon} alt="plus icon" className="w-10 h-10" />
                <input type="file" className="hidden" />
              </label>
              <div>
                <img
                  src={editIcon}
                  alt=""
                  className="bg-black w-6 mb-4 rounded-full cursor-pointer"
                />
                <img
                  src={trashIcon}
                  alt=""
                  className="bg-black rounded-full cursor-pointer"
                />
              </div>
            </div>
            <button
              className="bg-secondary text-white font-semibold py-1 px-4 rounded-sm mb-4 container mt-2"
              type="submit"
            >
              Update Images
            </button>
          </form>
        </motion.div>
      </Modal>
    </>
  );
}

export default EditImageModal;