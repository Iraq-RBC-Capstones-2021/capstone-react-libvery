import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addBooks, emptyBooks } from "../store/addBooksSlice";
import { serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
  id: Yup.string().required("Required"),
});

const initialValues = {
  bookTitle: "",
  author: "",
  genres: "",
  price: "",
  description: "",
  image: "",
  isChecked: false,
  id: "",
};

function AddBookModal({ isAddBookModalOpen, setIsAddBookModalOpen }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2));
      //   actions.setSubmitting(false);
      // }, 1000);
    },
  });

  const [fileUrl, setFileUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [uniqueID, setUniqueID] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const books = useSelector((state) => state.addBooks);
  const auth = useSelector((state) => state.user.uid);

  console.log(`user: ${JSON.stringify(auth, null, 2)}`);

  // console.log(`books: ${JSON.stringify(books, null, 2)}`);

  async function addItemsToList() {
    // Add a new document with a generated id.
    console.log(`fileUrl: ${fileUrl}`);
    await addDoc(collection(db, "books"), {
      bookTitle: formik.values.bookTitle,
      author: formik.values.author,
      genres: formik.values.genres.split(","),
      price: formik.values.price,
      description: formik.values.description,
      image: fileUrl,
      isChecked: formik.values.isChecked,
      id: uniqueID,
      createdAt: serverTimestamp(),
      rating: 0,
    });

    // const id = Date.now();
    // setUniqueID(Date.now());

    dispatch(addBooks({ ...formik.values, id: uniqueID }));
    if (uniqueID !== 0 || uniqueID !== "") {
      history.push(`/books/${uniqueID}`);
      // this is to empty the books array after adding a book to render realtime data.
      dispatch(emptyBooks());
    } else {
      return;
    }
  }

  useEffect(() => {
    if (formik.values.id === "" && isAddBookModalOpen) {
      const newID = Date.now();
      setUniqueID(newID);
    }

    // add dependency when the form is submitted
  }, [formik.values.id, isAddBookModalOpen]);

  console.log(`uniqueID: ${uniqueID}`);

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

  function handleGenerateUniqueId() {
    // const id = Date.now();
    // setUniqueID(id);
  }

  return (
    <>
      {auth ? (
        <Modal
          isOpen={isAddBookModalOpen}
          onRequestClose={() => setIsAddBookModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
          className=" text-sm flex justify-center mt-10"
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
            className="flex flex-col justify-center items-center text-white bg-white rounded-lg relative  "
          >
            <CloseButton
              setIsAddBookModalOpen={setIsAddBookModalOpen}
              isAddBookModalOpen={isAddBookModalOpen}
            />
            <form
              onSubmit={formik.handleSubmit}
              className="w-full space-y-4 max-w-lg bg-black rounded p-14 sm:max-w-3xl md:max-w-lg font-sans"
            >
              <p className="text-primary font-extrabold flex justify-center mb-4 sm:text-3xl text-4xl">
                Add a book
              </p>
              <div className="relative">
                <input
                  type="text"
                  name="id"
                  value={uniqueID}
                  // onChange={formik.handleChange}
                  disabled
                  className="shadow bg-transparent border-primary appearance-none border rounded py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  placeholder="Book id *"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateUniqueId}
                  className="absolute left-40 text-white hover:bg-primary hover:bg-opacity-30 p-2 rounded-md font-semibold"
                >
                  Auto-ID
                </button>
              </div>
              {formik.touched.bookTitle && formik.errors.bookTitle ? (
                <div>
                  <input
                    className="shadow bg-transparent appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                  className="shadow bg-transparent border-primary  appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                    className="shadow bg-transparent  appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                  className="shadow bg-transparent border-primary  appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
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
              <div className="md:flex md:justify-between space-x-3">
                {formik.touched.genres && formik.errors.genres ? (
                  <div>
                    <input
                      className="shadow bg-transparent   appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                      id="category"
                      type="text"
                      placeholder="Book Category *"
                      onChange={formik.handleChange}
                      value={formik.values.genres}
                      name="genres"
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <p className="text-xs text-red-400 -mt-2 mb-2">
                      {formik.errors.genres}
                    </p>
                  </div>
                ) : (
                  <input
                    className="shadow bg-transparent border-primary  appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                    id="category"
                    type="text"
                    placeholder="Book Category *"
                    onChange={formik.handleChange}
                    value={formik.values.genres}
                    name="genres"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                )}
                {formik.touched.price && formik.errors.price ? (
                  <div>
                    <input
                      className="shadow bg-transparent   text-primary appearance-none border border-red-400 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                    className="shadow bg-transparent   appearance-none border-primary  rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
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
              </div>
              {formik.touched.description && formik.errors.description ? (
                <div>
                  <textarea
                    name="description"
                    id="description"
                    cols="22"
                    rows="5"
                    className="shadow bg-transparent   appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                  className="shadow bg-transparent  appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  placeholder="Description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  autoComplete="off"
                ></textarea>
              )}
              <label className="w-full text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center ">
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
              {progress > 0 ? <p>Upload is {progress}% done</p> : null}
              <label className="flex text-black items-center">
                <p className="mr-2 text-primary">Are you donating this book?</p>
                <input
                  type="checkbox"
                  name="checkbox"
                  id="check"
                  className="rounded-full"
                  value={formik.values.isChecked}
                  checked={formik.values.isChecked}
                  onChange={() => {
                    formik.setFieldValue("isChecked", !formik.values.isChecked);
                  }}
                />
              </label>
              <button
                className="bg-secondary rounded-md text-white font-semibold py-2 px-4  container "
                type="submit"
                onClick={() => {
                  addItemsToList();
                  toast.success("Book added successfully");
                  // setUniqueID(Date.now());
                }}
                disabled={uniqueID === ""}
              >
                Add Book
              </button>
            </form>
          </motion.div>
        </Modal>
      ) : (
        <Modal
          isOpen={isAddBookModalOpen}
          onRequestClose={() => setIsAddBookModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
          className=" text-sm flex justify-center mt-10"
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
            className="flex flex-col justify-center items-center text-white bg-white rounded-lg relative  "
          >
            <CloseButton
              setIsAddBookModalOpen={setIsAddBookModalOpen}
              isAddBookModalOpen={isAddBookModalOpen}
            />
            <div
              onSubmit={formik.handleSubmit}
              className="w-full space-y-4 max-w-lg bg-black rounded p-14 sm:max-w-3xl md:max-w-lg font-sans"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  You are not signed in.
                </h2>
                <p className="text-lg mb-2">
                  Make sure to create an account or sign in to add a book.
                </p>
                <Link
                  to="/signin"
                  className="p-2 rounded-md cursor-pointer mr-2 bg-primary text-black hover:bg-indigo-400 hover:text-white transition-all"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-secondary p-2 text-white rounded-md cursor-pointer hover:bg-indigo-400 hover:text-white transition-all"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}

export default AddBookModal;
