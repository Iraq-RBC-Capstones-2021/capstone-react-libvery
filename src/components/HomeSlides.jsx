import React from "react";
import { Carousel } from "3d-react-carousal";
import "./style.css";
const HomeSlides = () => {
  // TODO: get the books images as a prop from the parent (Home)
  let slides = [
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/000/217/193/small_2x/motivational-book-cover-with-hand-lettering.jpg"
      alt="1"
    />,
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/002/110/581/small_2x/abstract-geometric-cover-design-free-vector.jpg"
      alt="2"
    />,
    <img
      src="https://target.scene7.com/is/image/Target/GUEST_f0a2a9ed-bfab-45c3-abd2-083d2dc5eeb9"
      alt="3"
    />,
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/000/216/149/small_2x/MOTIVATIONAL_BOOK_COVER_MAY_18_EEZY_01.jpg"
      alt="4"
    />,
    <img
      src="https://i.pinimg.com/originals/47/e2/ac/47e2ac4acd0fbda6f28cf2fe67f60835.jpg"
      alt="5"
    />,
  ];
  return (
    <>
      <Carousel slides={slides} autoplay={false} interval={1000} />
    </>
  );
};

export default HomeSlides;
