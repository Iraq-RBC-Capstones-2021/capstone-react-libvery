import React from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { addBooks } from "../store/addBooksSlice";

const el = document.getElementById("root");
Modal.setAppElement(el);

const validationSchema = Yup.object().shape({
  BookName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Author: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  Genre: Yup.string().required("Required"),
  Price: Yup.number().required("Required"),
});

const initialValues = {
  BookName: "",
  Author: "",
  Genre: "",
  Price: "",
  Description: "",
  Image: "",
};

function AddBookModal({ isAddBookModalOpen, setIsAddBookModalOpen }) {
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

  const dispatch = useDispatch();

  async function addItemsToList() {
    // Add a new document with a generated id.
    await addDoc(collection(db, "books"), {
      BookName: formik.values.BookName,
      Author: formik.values.Author,
      Genre: formik.values.Genre.split(","),
      Price: formik.values.Price,
      Description: formik.values.Description,
      Image: formik.values.Image,
    });
    dispatch(addBooks(formik.values));
  }

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   formik.setFieldValue(name, value);
  // }

  return (
    <>
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
            {formik.touched.BookName && formik.errors.BookName ? (
              <div>
                <input
                  className="shadow bg-transparent appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="BookName"
                  type="text"
                  placeholder="Book Title *"
                  onChange={formik.handleChange}
                  value={formik.values.BookName}
                  name="BookName"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.BookName}
                </p>
              </div>
            ) : (
              <input
                className="shadow bg-transparent border-primary  appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="BookName"
                type="text"
                placeholder="Book Title *"
                onChange={formik.handleChange}
                value={formik.values.BookName}
                name="BookName"
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            )}

            {formik.touched.Author && formik.errors.Author ? (
              <div>
                <input
                  className="shadow bg-transparent  appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="author"
                  type="text"
                  placeholder="Author *"
                  onChange={formik.handleChange}
                  value={formik.values.Author}
                  name="Author"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.Author}
                </p>
              </div>
            ) : (
              <input
                className="shadow bg-transparent border-primary  appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="author"
                type="text"
                placeholder="Author *"
                onChange={formik.handleChange}
                value={formik.values.Author}
                name="Author"
                onBlur={formik.handleBlur}
                autoComplete="off"
              />
            )}
            <div className="md:flex md:justify-between space-x-3">
              {formik.touched.Genre && formik.errors.Genre ? (
                <div>
                  <input
                    className="shadow bg-transparent   appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                    id="category"
                    type="text"
                    placeholder="Book Category *"
                    onChange={formik.handleChange}
                    value={formik.values.Genre}
                    name="Genre"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  <p className="text-xs text-red-400 -mt-2 mb-2">
                    {formik.errors.Genre}
                  </p>
                </div>
              ) : (
                <input
                  className="shadow bg-transparent border-primary  appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="category"
                  type="text"
                  placeholder="Book Category *"
                  onChange={formik.handleChange}
                  value={formik.values.Genre}
                  name="Genre"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
              )}
              {formik.touched.Price && formik.errors.Price ? (
                <div>
                  <input
                    className="shadow bg-transparent   text-primary appearance-none border border-red-400 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-2"
                    id="price"
                    type="number"
                    placeholder="Price *"
                    onChange={formik.handleChange}
                    value={formik.values.Price}
                    name="Price"
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    min="0"
                  />
                  <p className="text-xs text-red-400 -mt-2 mb-2">
                    {formik.errors.Price}
                  </p>
                </div>
              ) : (
                <input
                  className="shadow bg-transparent   appearance-none border-primary  rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="price"
                  type="number"
                  placeholder="Price *"
                  onChange={formik.handleChange}
                  value={formik.values.Price}
                  name="Price"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  min="0"
                />
              )}
            </div>
            {formik.touched.Description && formik.errors.Description ? (
              <div>
                <textarea
                  name="Description"
                  id="Description"
                  cols="22"
                  rows="5"
                  className="shadow bg-transparent   appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                  placeholder="Description"
                  onChange={formik.handleChange}
                  value={formik.values.Description}
                  autoComplete="off"
                ></textarea>
                <p className="text-xs text-red-400 -mt-2 mb-2">
                  {formik.errors.Description}
                </p>
              </div>
            ) : (
              <textarea
                name="Description"
                id="Description"
                cols="22"
                rows="5"
                className="shadow bg-transparent  appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                placeholder="Short Description"
                onChange={formik.handleChange}
                value={formik.values.Description}
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
              <input type="file" className="hidden" />
            </label>
            <label className="flex text-black items-center">
              <p className="mr-2 text-primary">Are you donating this book?</p>
              <input
                type="checkbox"
                name="yes"
                id="yes"
                className="rounded-full"
              />
            </label>
            <button
              className="bg-secondary rounded-md text-white font-semibold py-2 px-4  container "
              type="submit"
              onClick={addItemsToList}
            >
              Add Book
            </button>
          </form>
        </motion.div>
      </Modal>
    </>
  );
}

export default AddBookModal;
