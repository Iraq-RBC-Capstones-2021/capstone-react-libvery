import React, { useState, useEffect } from "react";
import { SIGNIN_ROUTE } from "../routes";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import { motion } from "framer-motion";
import CloseButton from "../customs/CloseButton";
import { useSelector } from "react-redux";
import { selectorUser } from "../store/users/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";

const el = document.getElementById("root");
Modal.setAppElement(el);

function ContactModal({ isContactModalOpen, setIsContactModalOpen, paramID }) {
  const history = useHistory();
  const userName = useSelector(selectorUser).userName;

  const [sellerUID, setSellerUID] = useState([]);
  const [sellerInfo, setSellerInfo] = useState([
    {
      username: "",
      email: "",
      phone: "",
      image: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsContactModalOpen(false);
    history.goBack();
  };

  useEffect(() => {
    async function getBook() {
      const qb = query(
        collection(db, "books"),
        where("id", "==", Number(paramID))
      );
      const querySnapshotb = await getDocs(qb);
      querySnapshotb.forEach((doc) => {
        setIsLoading(true);
        setSellerUID(doc.data().uid);
      });

      const q = query(collection(db, "users"), where("uid", "==", sellerUID));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setSellerInfo([
          {
            username: doc.data().username,
            email: doc.data().email,
            phone: doc.data().phone,
            image: doc.data().photo,
          },
        ]);
        setIsLoading(false);
      });
    }

    getBook();
  }, [paramID, sellerUID]);

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
              {isLoading ? (
                <Loader color="#fff" />
              ) : (
                <>
                  <img
                    src={sellerImage}
                    alt="seller profile"
                    className="w-32 h-32 object-cover mx-auto mt-2 rounded-full mb-4"
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
              )}
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
