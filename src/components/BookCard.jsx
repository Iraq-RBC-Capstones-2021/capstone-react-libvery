import React from "react";
import { VscHeart } from "react-icons/vsc";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { BOOKS_ROUTE, HOME_ROUTE } from "../routes";

function BookCard({ image, genres, title, price, rating, id }) {
  function createGenreButton(genre, index) {
    switch (index) {
      case 0:
        return (
          <button className="text-xs absolute top-2 left-1 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
            {genre}
          </button>
        );
      case 1:
        return (
          <button className="text-xs absolute top-2 left-16 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
            {genre}
          </button>
        );
      case 2:
        return (
          <button className="text-xs absolute top-2 left-32 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
            {genre}
          </button>
        );
      case 3:
        return (
          <button className="text-xs absolute top-9 left-1 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
            {genre}
          </button>
        );
      case 4:
        return (
          <button className="text-xs absolute top-9 left-16 bg-Cards rounded-2xl px-2.5 py-0.5 transform transition ease-in duration-100 hover:-translate-y-0.5 opacity-80">
            {genre}
          </button>
        );
      default:
        return;
    }
  }

  const genreButtons = genres.map((genre, index) => {
    return createGenreButton(genre, index);
  });

  return (
    <div className="bg-Cards rounded font-sans  overflow-hidden shadow-md w-full md:w-72 p-3">
      <div className="rounded-xl overflow-hidden relative h-60">
        <img className="w-full h-full object-cover" src={image} alt="book" />
        {genreButtons}
      </div>
      <div className="flex justify-between items-center px-1 pt-2">
        <h1 className="font-semibold">{title}</h1>
        <VscHeart
          size={25}
          className="transform transition ease-in duration-100 hover:-translate-y-0.5 cursor-pointer"
        />
      </div>
      <div className="flex justify-start items-center">
        <ReactStars className="" size={20} isHalf={true} />
        <span className="pl-1 mt-1">{rating}</span>
      </div>
      <p className="font-semibold pl-1">{price}</p>
      <Link to={`${BOOKS_ROUTE}/${id}`} className="text-white font-semibold">
        <button className="bg-secondary text-white rounded-xl p-1 w-full mt-3 transform transition ease-in-out duration-100 hover:-translate-y-0.5">
          Buy
        </button>
      </Link>
    </div>
  );
}

export default BookCard;
