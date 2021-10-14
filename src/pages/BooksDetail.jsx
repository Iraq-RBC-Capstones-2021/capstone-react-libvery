import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimateButton from "../customs/AnimateButton";
import ContactModal from "../components/ContactModal";
import EditBookModal from "../components/EditBookModal";
import EditImageModal from "../components/EditImageModal";
import coverImg from "../assets/cover.jpg";
import page1 from "../assets/page1.png";
import page2 from "../assets/page2.png";
import page3 from "../assets/page3.png";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Route, Link } from "react-router-dom";

const bookInfo = {
  image: "a URL",
  id: "1",
  rating: "4",
  title: "Book Title",
  author: "author name",
  genre: "Action",
  price: "3.99$",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse cupiditate amet dolor quasi eius, itaque fuga, adipisci magnam vel cumque? Ex cupiditate inventore obcaecati doloremque expedita iusto labore ipsam?",
  sellerUsername: "Seller Username",
  email: "example@example.com",
  phone: "+9647700000000",
};

function BooksDetail({ match }) {
  const [isBookmarked, setBookmarked] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [isEditImageOpen, setIsEditImageOpen] = useState(false);

  const matchURL = match.url;

  return (
    <div className="bg-primary font-sans">
      <div className="sm:flex sm:justify-center">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="relative m-4 flex"
        >
          <Zoom>
            <img
              className="flex-1 object-cover rounded-md"
              src={coverImg}
              alt="book"
            />
          </Zoom>
          <div className="absolute top-0 right-0 bg-red-50 rounded-bl-2xl rounded-br-2xl">
            <AnimateButton>
              <svg
                onClick={() => setBookmarked(!isBookmarked)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 cursor-pointer"
                viewBox="0 0 20 20"
                fill={`${isBookmarked ? "#f44336" : "#c2c2c2"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </AnimateButton>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="m-4 sm:max-w-sm lg:max-w-2xl"
        >
          <div className="flex mb-4">
            <h1 className="font-semibold flex-1 text-xl">Book Title</h1>
            <Link
              to={`${matchURL}/seller-info`}
              onClick={() => setIsContactModalOpen(true)}
            >
              <AnimateButton
                OnClickContact={() => setIsContactModalOpen(true)}
                classStyle="bg-secondary text-white rounded-sm px-2 py-1"
                text="Contact Seller"
              />
            </Link>
            <Route
              path={`${matchURL}/seller-info`}
              render={() => (
                <ContactModal
                  isContactModalOpen={isContactModalOpen}
                  setIsContactModalOpen={setIsContactModalOpen}
                  sellerUsername={bookInfo.sellerUsername}
                  email={bookInfo.email}
                  phone={bookInfo.phone}
                />
              )}
            />
          </div>
          <div className="flex mb-4">
            <p className="flex-1">
              <span className="opacity-50">Author:</span>{" "}
              <span>author name</span>
            </p>
            <Link to={`${matchURL}/edit-book`}>
              <AnimateButton
                OnClickContact={() => setIsEditBookOpen(true)}
                classStyle="bg-secondary text-white rounded-sm px-2 py-1"
                text="Edit"
              />
            </Link>
            <Route
              path={`${matchURL}/edit-book`}
              render={() => (
                <EditBookModal
                  isEditBookOpen={isEditBookOpen}
                  setIsEditBookOpen={setIsEditBookOpen}
                  {...bookInfo}
                />
              )}
            />
          </div>
          <div className="flex">
            <p className="flex-1 mb-4">
              <span className="opacity-50">Genre: </span>
              <AnimateButton
                text="Action"
                classStyle="bg-black text-white rounded-xl cursor-pointer py-1 px-1 text-sm"
              />{" "}
              -{" "}
              <AnimateButton
                text="Adventure"
                classStyle="bg-black text-white rounded-xl cursor-pointer py-1 px-1 text-sm"
              />
            </p>
            <p className="font-semibold">
              Price: <span className="">3.99$</span>
            </p>
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse
            cupiditate amet dolor quasi eius, itaque fuga, adipisci magnam vel
            cumque? Ex cupiditate inventore obcaecati doloremque expedita iusto
            labore ipsam?
          </p>
          <div className="flex relative">
            <Link to={`${matchURL}/edit-image`}>
              <AnimateButton
                OnClickContact={() => setIsEditImageOpen(true)}
                classStyle="absolute left-60 bg-secondary text-white rounded-xl -top-3 cursor-pointer"
              >
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
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </AnimateButton>
            </Link>
            <Route
              path={`${matchURL}/edit-image`}
              render={() => (
                <EditImageModal
                  isEditImageOpen={isEditImageOpen}
                  setIsEditImageOpen={setIsEditImageOpen}
                />
              )}
            />
            <Zoom>
              <img
                className="h-44 w-28 rounded-md mr-3"
                src={page1}
                alt="content preview page 1"
              />
            </Zoom>
            <Zoom>
              <img
                className="h-44 w-28 rounded-md mr-3"
                src={page2}
                alt="content preview page 2"
              />
            </Zoom>
            <img
              className="h-44 w-28 rounded-md"
              src={page3}
              alt="content preview page 3"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BooksDetail;
