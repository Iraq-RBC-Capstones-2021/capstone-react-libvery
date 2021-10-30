import React, { useState } from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trash.svg";
import plusIcon from "../assets/plus.svg";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../firebase";
import Loader from "./Loader";
import { useDispatch } from "react-redux";

const el = document.getElementById("root");
Modal.setAppElement(el);

function EditImageModal({ isEditImageOpen, setIsEditImageOpen, book }) {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsEditImageOpen(false);
    history.goBack();
  };

  const onFileChange = async (e) => {
    setIsLoading(true);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
      const file = e.target.files[i];
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const l = await getDownloadURL(storageRef);
      setUrls((prevState) => [...prevState, l]);
    }
    setIsLoading(false);
  };

  const handleUpdateImages = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const bookRef = doc(db, "books", `${book.id}`);
    await updateDoc(bookRef, {
      images: arrayUnion(...urls),
    });
    handleClose();
    setIsLoading(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const bookRef = doc(db, "books", `${book.id}`);

    await updateDoc(bookRef, {
      images: arrayRemove(images[0]),
    });
  };

  if (isLoading) return <Loader />;
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
          className="flex flex-col justify-center items-center bg-black sm:w-96 rounded-lg p-10 mx-auto relative w-80"
        >
          <CloseButton
            setIsEditImageOpen={setIsEditImageOpen}
            isEditImageOpen={isEditImageOpen}
          />
          <form className="font-sans" onSubmit={handleUpdateImages}>
            <h2 className="text-primary font-semibold flex justify-center mb-4 text-2xl">
              Update Images
            </h2>
            <div className="flex items-center">
              <label className="w-32 text-black flex items-center rounded-md cursor-pointer bg-primary hover:bg-secondary justify-center h-32 mx-auto mb-2">
                <img
                  src={urls[0] ? urls[0] : plusIcon}
                  alt="plus icon"
                  className={`${
                    urls === [] ? "w-10 h-10" : "h-full rounded-md"
                  }`}
                />
                <input
                  type="file"
                  name="userPhoto"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
              <div>
                <img
                  src={editIcon}
                  alt=""
                  className="w-6 mb-4 rounded-full cursor-pointer"
                />
                <img src={trashIcon} alt="" onClick={handleDelete} />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-32 text-black flex items-center rounded-md cursor-pointer bg-primary hover:bg-secondary justify-center h-32 mx-auto mb-2">
                <img
                  src={urls[1] ? urls[1] : plusIcon}
                  alt="plus icon"
                  className={`${
                    urls === [] ? "w-10 h-10" : "h-full rounded-md"
                  }`}
                />
                <input
                  type="file"
                  name="userPhoto"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
              <div>
                <img
                  src={editIcon}
                  alt=""
                  className="w-6 mb-4 rounded-full cursor-pointer"
                />
                <img src={trashIcon} alt="" />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-32 text-black flex items-center rounded-md cursor-pointer bg-primary hover:bg-secondary justify-center h-32 mx-auto mb-2">
                <img
                  src={urls[2] ? urls[2] : plusIcon}
                  alt="plus icon"
                  className={`${
                    urls === [] ? "w-10 h-10" : "h-full rounded-md"
                  }`}
                />
                <input
                  type="file"
                  name="userPhoto"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
              <div>
                <img
                  src={editIcon}
                  alt=""
                  className="w-6 mb-4 rounded-full cursor-pointer"
                />
                <img src={trashIcon} alt="" />
              </div>
            </div>
            <button
              className="bg-secondary text-white font-semibold py-2 px-10 rounded-lg mb-4 container mt-2"
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
