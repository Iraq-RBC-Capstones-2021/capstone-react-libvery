import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { addBooks, emptyBooks } from "../store/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Genres } from "../service/genres";
import Select from "react-select";

const el = document.getElementById("root");
Modal.setAppElement(el);

const validationSchema = Yup.object().shape({
  bookTitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  author: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  genres: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});

function EditBookModal({
  isEditBookOpen,
  setIsEditBookOpen,
  id,
  author,
  bookTitle,
  genres,
  price,
  description,
  paramID,
  matchURL,
}) {
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  const initialValues = {
    bookTitle: bookTitle,
    author: author,
    genres: genres,
    price: price,
    description: description,
    image: fileUrl,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    },
  });

  const history = useHistory();

  const handleClose = () => {
    setIsEditBookOpen(false);
    history.goBack();
  };

  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  console.log(books.books.flat().find((book) => book.id === Number(paramID)));

  async function updateBook() {
    const bookRef = doc(db, "books", `${paramID}`);
    console.log(bookRef);
    await updateDoc(bookRef, {
      bookTitle: formik.values.bookTitle,
      author: formik.values.author,
      genres: formik.values.genres,
      price: formik.values.price,
      description: formik.values.description,
      image: fileUrl,
    });
    // dispatch(emptyBooks());
    dispatch(
      addBooks(books.books.flat().filter((book) => book.id !== Number(paramID)))
    );
  }

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    });
    setFileUrl(await getDownloadURL(storageRef));
  };

  console.log("edit book modal genres: ", formik.values.genres);

  return (
    <>
      <Modal
        isOpen={isEditBookOpen}
        onRequestClose={() => handleClose()}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
        className="mx-auto text-sm flex justify-center mt-10"
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
          className="flex flex-col justify-center items-center text-white bg-black rounded-lg relative  "
        >
          <CloseButton
            setIsEditBookOpen={setIsEditBookOpen}
            isEditBookOpen={isEditBookOpen}
          />
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-lg bg-black rounded space-y-4  sm:max-w-2xl md:max-w-md font-sans p-8"
          >
            <h2 className="text-primary font-semibold flex justify-center mb-4 text-sm sm:text-xl">
              Update Book Details
            </h2>
            {formik.touched.bookTitle && formik.errors.bookTitle ? (
              <div>
                <input
                  className="bg-transparent shadow appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="bookTitle"
                  type="text"
                  placeholder="Book Title *"
                  onChange={formik.handleChange}
                  value={formik.values.bookTitle}
                  name="bookTitle"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.bookTitle}
                </p>
              </div>
            ) : (
              <input
                className="bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="bookTitle"
                type="text"
                placeholder="Book Title *"
                onChange={formik.handleChange}
                value={formik.values.bookTitle}
                name="bookTitle"
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            )}
            {formik.touched.author && formik.errors.author ? (
              <div>
                <input
                  className="bg-transparent shadow appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="author"
                  type="text"
                  placeholder="Author *"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                  name="author"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.author}
                </p>
              </div>
            ) : (
              <input
                className="bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="author"
                type="text"
                placeholder="Author *"
                onChange={formik.handleChange}
                value={formik.values.author}
                name="author"
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            )}
            <Select
              isMulti
              id="genres"
              name="genres"
              options={Genres}
              className="basic-multi-select bg-green-300"
              classNamePrefix="select"
              placeholder="Select genre(s) *"
              onChange={(e) => {
                formik.setFieldValue("genres", e);
              }}
              onBlur={formik.handleBlur}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "black",
                  danger: "black",
                  neutral10: "#e07a5f",
                  neutral0: "#3F3B3B",
                  neutral80: "white",
                },
              })}
              value={formik.values.genres.map((genre) => genre)}
            />
            {formik.touched.price && formik.errors.price ? (
              <div>
                <input
                  className="bg-transparent shadow appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="price"
                  type="number"
                  placeholder="Price *"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  name="price"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  min="0"
                />
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.price}
                </p>
              </div>
            ) : (
              <input
                className="bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="price"
                type="number"
                placeholder="Price *"
                onChange={formik.handleChange}
                value={formik.values.price}
                name="price"
                onBlur={formik.handleBlur}
                autoComplete="off"
                min="0"
              />
            )}
            {formik.touched.description && formik.errors.description ? (
              <div>
                <textarea
                  name="description"
                  id="description"
                  cols="22"
                  rows="5"
                  className="bg-transparent shadow appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  placeholder="Description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  autoComplete="off"
                ></textarea>
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.description}
                </p>
              </div>
            ) : (
              <textarea
                name="description"
                id="description"
                cols="22"
                rows="5"
                className="bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                placeholder="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                autoComplete="off"
              ></textarea>
            )}
            <label className="text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary container justify-center">
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
              <input type="file" className="hidden" onChange={onFileChange} />
            </label>
            <label className="flex text-primary items-center">
              <p className="mr-2">Are you donating this book?</p>
              <input
                type="checkbox"
                name="yes"
                id="yes"
                className="rounded-full"
              />
            </label>
            <button
              className="bg-secondary text-white font-semibold py-2 px-4 rounded-lg mb-4 container mt-2"
              type="submit"
              onClick={updateBook}
            >
              Update Book
            </button>
          </form>
        </motion.div>
      </Modal>
    </>
  );
}

export default EditBookModal;
