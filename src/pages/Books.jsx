import { motion } from "framer-motion";
import React from "react";
import BookCard from "../components/BookCard";

function Books() {
  const books = [
    {
      id: 1,
      title: "The Lord of the Rings",
      genres: ["Fantasy", "Adventure", "Drama"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },
    {
      id: 2,
      title: "The Hobbit",
      genres: ["Fantasy", "Adventure"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },
    {
      id: 3,
      title: "The Lord of the Rings",
      genres: ["Fantasy", "Adventure", "Drama"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },
    {
      id: 4,
      title: "The Hobbit",
      genres: ["Fantasy", "Adventure"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },
    {
      id: 5,
      title: "The Lord of the Rings",
      genres: ["Fantasy", "Adventure", "Drama"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },
    {
      id: 6,
      title: "The Hobbit",
      genres: ["Fantasy", "Adventure"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },

    {
      id: 7,
      title: "The Lord of the Rings",
      genres: ["Fantasy", "Adventure", "Drama"],
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX331_BO1,204,203,200_.jpg",
      rating: 5,
      price: "10.99$",
    },
  ];

  return (
    <motion.div
      exit={{ opacity: 0, x: 100 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        transition: { duration: 1, type: "spring", stiffness: 100 },
        x: 0,
      }}
      className="grid sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {books.map((book) => (
        <div key={book.id} className="m-2">
          <BookCard
            id={book.id}
            title={book.title}
            genres={book.genres}
            image={book.image}
            rating={book.rating}
            price={book.price}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default Books;
