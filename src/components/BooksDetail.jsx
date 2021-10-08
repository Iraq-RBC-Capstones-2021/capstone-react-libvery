import React from "react";
import book from "./book.jpg";

function BooksDetail() {
  return (
    <div className="bg-primary min-h-screen font-sans">
      <div className="sm:flex">
        <div className="relative m-4 flex">
          <img className="flex-1 object-cover" src={book} alt="book" />
          <div className="drop-shadow-xl absolute bottom-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              viewBox="0 0 20 20"
              fill="#b6b6b6"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="m-4">
          <div className="flex mb-4">
            <h1 className="font-semibold flex-1">Book Title</h1>
            <button
              type="button"
              className="bg-secondary text-white rounded-sm px-2 py-1"
            >
              Contact Seller
            </button>
          </div>
          <div className="flex mb-4">
            <p className="flex-1">
              Author: <span>author name</span>
            </p>
            <button
              type="button"
              className="bg-secondary text-white rounded-sm px-2 py-1"
            >
              Edit
            </button>
          </div>
          <div className="flex">
            <p className="flex-1 mb-4">
              Genre:{" "}
              <span className="bg-black text-white rounded-sm cursor-pointer py-1">
                Action
              </span>{" "}
              -{" "}
              <span className="bg-black text-white rounded-sm cursor-pointer py-1">
                Adventure
              </span>
            </p>
            <p className="col-start-3">
              Price: <span>3.99$</span>
            </p>
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse
            cupiditate amet dolor quasi eius, itaque fuga, adipisci magnam vel
            cumque? Ex cupiditate inventore obcaecati doloremque expedita iusto
            labore ipsam?
          </p>
          <div className="flex relative">
            <div className="absolute left-72 bg-secondary text-white rounded-xl -top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <img className="h-24 w-24 rounded-md mr-2" src={book} alt="book" />
            <img className="h-24 w-24 rounded-md mr-2" src={book} alt="book" />
            <img className="h-24 w-24 rounded-md" src={book} alt="book" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksDetail;
