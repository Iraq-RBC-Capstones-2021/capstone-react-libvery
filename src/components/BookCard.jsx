import React from "react";
import { VscHeart } from "react-icons/vsc";
import ReactStars from "react-rating-stars-component";

function BookCard() {
  return (
    <div className="bg-Cards rounded font-sans  overflow-hidden shadow-md w-full md:w-72 p-3">
      <div className="rounded-xl overflow-hidden relative h-60">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="book"
        />
        <button className="text-xs absolute top-2 left-1 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
          Action
        </button>
        <button className="text-xs absolute top-2 left-16 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
          Drama
        </button>
      </div>
      <div className="flex justify-between items-center px-1 pt-2">
        <h1 className="font-semibold">Book Title</h1>
        <VscHeart
          size={25}
          className="transform transition ease-in duration-100 hover:-translate-y-0.5 cursor-pointer"
        />
      </div>
      <div className="flex justify-start items-center">
        <ReactStars className="" size={20} isHalf={true} />
        <span className="pl-1 mt-1">2.5(5)</span>
      </div>
      <p className="font-semibold pl-1">9.99$</p>
      <button className="bg-secondary text-white rounded-xl p-1 w-full mt-3 transform transition ease-in-out duration-100 hover:-translate-y-0.5">
        Buy
      </button>
    </div>
  );
}

export default BookCard;
