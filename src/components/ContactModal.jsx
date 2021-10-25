import React, { useState, useEffect } from "react";

import { SIGNIN_ROUTE } from "../routes";
import { Link, useHistory } from "react-router-dom";

import Modal from "react-modal";
import { motion } from "framer-motion";

import CloseButton from "../customs/CloseButton";
import defaultImage from "../assets/team.svg";

import { useSelector } from "react-redux";
import { selectorUserName } from "../store/counter/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const el = document.getElementById("root");
Modal.setAppElement(el);

function ContactModal({
  isContactModalOpen,
  setIsContactModalOpen,
  phone,
  email,
  sellerUsername,
  matchURL,
  paramID,
}) {
  const history = useHistory();
  const userName = useSelector(selectorUserName);

  const [sellerUID, setSellerUID] = useState([]);
  const [sellerInfo, setSellerInfo] = useState([
    {
      username: "",
      email: "",
      phone: "",
      image: "",
    },
  ]);

  const books = useSelector((state) => state.addBooks.books);
  const auth = useSelector((state) => state.user);

  const booksUID = books.flat().map((book) => book.uid);

  const handleClose = () => {
    setIsContactModalOpen(false);
    history.goBack();
  };

  console.log("paramID: ", paramID);
  console.log("matchURL: ", matchURL);

  console.log("bookUID: ", booksUID);
  useEffect(() => {
    async function getBook() {
      const qb = query(
        collection(db, "books"),
        where("id", "==", Number(paramID))
      );
      const querySnapshotb = await getDocs(qb);
      querySnapshotb.forEach((doc) => {
        console.log("book doc: ", doc.data());
        setSellerUID(doc.data().uid);
      });

      const q = query(collection(db, "users"), where("uid", "==", sellerUID));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(`doc: ${JSON.stringify(doc.data(), null, 2)}`);
        setSellerInfo([
          {
            username: doc.data().username,
            email: doc.data().email,
            phone: doc.data().phone,
            image: doc.data().photo,
          },
        ]);
        // setSellerUID(doc.data().uid);
      });
    }

    getBook();
  }, [paramID, sellerUID]);

  console.log("seller uid: ", sellerUID);

  // const books = useSelector((state) => state.addBooks.books);

  // console.log(`books: ${JSON.stringify(books.flat(), null, 2)}`);
  // console.log(books.flat().map((book) => book.uid));

  const sellerUserName = sellerInfo.map((info) => info.username);
  const sellerEmail = sellerInfo.map((info) => info.email);
  const sellerPhone = sellerInfo.map((info) => info.phone);
  const sellerImage = sellerInfo.map((info) => info.image);

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
                src={sellerImage}
                alt="seller profile"
                className="w-32 mx-auto mt-2"
              />
              <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 rounded-md w-4/5">
                {sellerUserName}
              </p>
              <p className="bg-gray-300 bg-opacity-25 py-1 px-3 mb-2 ms:w-1/3 rounded-md w-4/5">
                <a href={`mailto:${sellerEmail}`}>{sellerEmail}</a>
              </p>
              <p className="bg-gray-300 bg-opacity-25 py-1 px-3 ms:w-1/3 rounded-md w-4/5">
                <a href={`tel:${sellerPhone}`}>{sellerPhone}</a>
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
