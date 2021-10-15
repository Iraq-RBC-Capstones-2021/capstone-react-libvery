import React from "react";
import { Carousel } from "3d-react-carousal";
import "../pages/HomeStyle.css";

const HomeSlides = ({ slides }) => {
  const slidesList = slides.map((homeSlide) => homeSlide);

  return (
    <>
      <Carousel slides={slidesList} autoplay={false} interval={1000} />
    </>
  );
};

export default HomeSlides;
