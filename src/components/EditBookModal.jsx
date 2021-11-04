import React, { useState } from "react";
import Modal from "react-modal";
import CloseButton from "../customs/CloseButton";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { Genres } from "../service/genres";
import Select from "react-select";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
  genres: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .required("Required"),
  price: Yup.number().required("Required"),
});

function EditBookModal({
  isEditBookOpen,
  setIsEditBookOpen,
  author,
  bookTitle,
  genres,
  price,
  description,
  paramID,
  image,
}) {
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  const initialValues = {
    bookTitle: bookTitle,
    author: author,
    genres: genres,
    price: price,
    description: description,
    image: image,
    isChecked: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      history.goBack();
      toast.success("Book Updated Successfully");
    },
  });

  const history = useHistory();
  const { t } = useTranslation();

  const handleClose = () => {
    setIsEditBookOpen(false);
    history.goBack();
  };
  const Genres = [
    { value: "action", label: `${t("action")}` },
    { value: "adventure", label: `${t("adventure")}` },
    { value: "drama", label: `${t("drama")}` },
    { value: "comedy", label: `${t("comedy")}` },
    { value: "horror", label: `${t("horror")}` },
    { value: "romance", label: `${t("romance")}` },
  ];
  async function updateBook() {
    if (
      formik.values.bookTitle === "" ||
      formik.values.author === "" ||
      formik.values.genres.length === 0
    ) {
      toast.error("Please fill the form");
    } else {
      const bookRef = doc(db, "books", `${paramID}`);
      await updateDoc(bookRef, {
        bookTitle: formik.values.bookTitle,
        author: formik.values.author,
        genres: formik.values.genres,
        price: !formik.values.isChecked ? formik.values.price : 0,
        description: formik.values.description,
        image: fileUrl || image,
        isChecked: formik.values.isChecked,
      });
    }
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
              {t("update_book_detail")}
            </h2>
            <div>
              <input
                className={`w-full
                  ${
                    formik.errors.bookTitle
                      ? `border-red-700`
                      : `border-gray-200`
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
              } bg-transparent shadow appearance-none border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline
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
            <Select
              isMulti
              id="genres"
              name="genres"
              options={Genres}
              className="basic-multi-select bg-green-300"
              classNamePrefix="select"
              placeholder={t("select_genre")}
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
            <input
              className="bg-transparent shadow appearance-none border border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline mb-2"
              id="price"
              type="number"
              placeholder="Price *"
              onChange={formik.handleChange}
              value={!formik.values.isChecked ? formik.values.price : 0}
              name="price"
              onBlur={formik.handleBlur}
              autoComplete="off"
              min="0"
            />
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
            <label className="text-white flex items-center py-1 rounded-md cursor-pointer bg-secondary bg-opacity-50 hover:bg-secondary container justify-center">
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
            <label className="flex text-primary items-center">
              <p className="mr-2">{t("are_you_donating_this_book")}</p>
              <input
                type="checkbox"
                name="yes"
                id="yes"
                className="rounded-full"
                value={formik.values.isChecked}
                checked={formik.values.isChecked}
                onChange={() => {
                  formik.setFieldValue("isChecked", !formik.values.isChecked);
                }}
              />
            </label>
            <button
              className="bg-secondary text-white font-semibold py-2 px-4 rounded-lg mb-4 container mt-2"
              type="submit"
              onClick={updateBook}
            >
              {t("update_book")}
            </button>
          </form>
        </motion.div>
      </Modal>
    </>
  );
}

export default EditBookModal;
