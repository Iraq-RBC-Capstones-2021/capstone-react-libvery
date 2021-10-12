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
  ];

  return (
    <div>
      <h1>Books</h1>

      {books.map((book) => (
        <BookCard
          id={book.id}
          title={book.title}
          genres={book.genres}
          image={book.image}
          rating={book.rating}
          price={book.price}
        />
      ))}

      {/* <BookCard
        image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        genres={["Action", "Drama", "Romance", "Novel", "Thriller"]}
        title="Book Title"
        rating="2.5(5)"
        price="9.99$"
        id="1"
      /> */}
    </div>
  );
}

export default Books;
