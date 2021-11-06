import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addBooks } from "../store/books/booksSlice";
import { serverTimestamp } from "firebase/firestore";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { selectorUser } from "../store/users/userSlice";
import Select from "react-select";
// import { Genres } from "../service/genres";
import { useTranslation } from "react-i18next";
import { storeImage } from "../service/utls";

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
  id: Yup.string().required("Required"),
  genres: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required("Required"),
        value: Yup.string().required("Required"),
      })
    )
    .required("Required"),
});

const initialValues = {
  bookTitle: "",
  author: "",
  price: "",
  description: "",
  image: "",
  isChecked: false,
  id: "",
  uid: "",
  genres: [],
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const Genres = [
    { value: "action", label: `${t("action")}` },
    { value: "adventure", label: `${t("adventure")}` },
    { value: "drama", label: `${t("drama")}` },
    { value: "comedy", label: `${t("comedy")}` },
    { value: "horror", label: `${t("horror")}` },
    { value: "romance", label: `${t("romance")}` },
  ];
  const userUID = useSelector(selectorUser).uid;

  async function addItemsToList() {
    if (
      formik.values.bookTitle === "" ||
      formik.values.author === "" ||
      formik.values.genres.length === 0
    ) {
      toast.error("Please fill the form");
    } else {
      await setDoc(doc(db, "books", `${uniqueID}`), {
        bookTitle: formik.values.bookTitle,
        author: formik.values.author,
        genres: formik.values.genres,
        price: !formik.values.isChecked ? formik.values.price : 0,
        description: formik.values.description,
        image: fileUrl,
        isChecked: formik.values.isChecked,
        id: uniqueID,
        createdAt: serverTimestamp(),
        // rating: 0,
        uid: userUID,
        images: [],
      });

      dispatch(addBooks({ ...formik.values, id: uniqueID, uid: userUID }));
      history.push(`/books/${uniqueID}`);
      // this will add the toast message to the books detail when it is submitted and redirected to the book detail page.
      if (history.location.pathname === `/books/${uniqueID}`) {
        setTimeout(() => {
          toast.success("Book added successfully");
        }, 500);
      }
    }
  }

  useEffect(() => {
    if (formik.values.id === "" && isAddBookModalOpen) {
      const newID = Date.now();
      setUniqueID(newID);
    }

    // add dependency when the form is submitted
  }, [formik.values.id, isAddBookModalOpen]);

  const onFileChange = async (e) => {
    storeImage(e, { setFileUrl, setProgress });
  };

  return (
    <>
      {userUID ? (
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
                {t("add_a_book")}
              </p>
              <div>
                <input
                  className={`w-full
              ${
                formik.errors.bookTitle ? `border-red-700` : `border-gray-200`
              } bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mt-2
              `}
                  id="bookTitle"
                  type="text"
                  placeholder={t("book_title")}
                  onChange={formik.handleChange}
                  value={formik.values.bookTitle}
                  name="bookTitle"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                <p
                  className={
                    formik.touched.bookTitle
                      ? "block text-xs text-red-400"
                      : "hidden"
                  }
                >
                  {formik.errors.bookTitle}
                </p>
              </div>
              <div>
                <input
                  className={`w-full
                  ${
                    formik.errors.author ? `border-red-700` : `border-gray-200`
                  } bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mt-2
                  `}
                  id="author"
                  type="text"
                  placeholder={t("author")}
                  onChange={formik.handleChange}
                  value={formik.values.author}
                  name="author"
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                <p
                  className={
                    formik.touched.author
                      ? "block text-xs text-red-400"
                      : "hidden"
                  }
                >
                  {formik.errors.author}
                </p>
              </div>
              {formik.touched.genres && formik.errors.genres ? (
                <div>
                  <Select
                    isMulti
                    id="genres"
                    name="genres"
                    options={Genres}
                    className="basic-multi-select bg-green-300"
                    classNamePrefix="select"
                    placeholder={t("select_genres")}
                    onChange={(e) => {
                      formik.setFieldValue("genres", e);
                    }}
                    onBlur={formik.handleBlur}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        text: "orangered",
                        primary25: "hotpink",
                        primary: "black",
                      },
                    })}
                    value={formik.values.genres}
                  />
                  <p className="text-xs text-red-400 -mt-2 mb-2">
                    {formik.errors.genres}
                  </p>
                </div>
              ) : (
                <Select
                  isMulti
                  id="genres"
                  name="genres"
                  options={Genres}
                  className="basic-multi-select bg-green-300"
                  classNamePrefix="select"
                  placeholder={t("select_genres")}
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
                  value={formik.values.genres}
                />
              )}
              <input
                className="shadow bg-transparent   appearance-none border-primary  rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                id="price"
                type="number"
                placeholder={t("price")}
                onChange={formik.handleChange}
                value={!formik.values.isChecked ? formik.values.price : 0}
                name="price"
                onBlur={formik.handleBlur}
                autoComplete="off"
                min="0"
              />
              {formik.touched.description && formik.errors.description ? (
                <div>
                  <textarea
                    name="description"
                    id="description"
                    cols="22"
                    rows="5"
                    className="shadow bg-transparent   appearance-none border border-red-400 rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
                    placeholder={t("description")}
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
                  placeholder={t("description")}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  autoComplete="off"
                ></textarea>
              )}
              <label className="w-full text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary justify-center ">
                <span>{t("upload_book_cover")}</span>
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
                <p className="mr-2 text-primary">
                  {t("are_you_donating_this_book")}
                </p>
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
                }}
                disabled={uniqueID === ""}
              >
                {t("add_book")}
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
