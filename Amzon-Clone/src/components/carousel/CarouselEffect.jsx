import React from "react";
import images from "./data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './css/carousel.module.css'
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        infiniteLoop={true}
        showIndicators = {false}
        autoPlay={true}
        showThumbs = {false}
      >
        <img src={images[0]} alt="" />
        <img src={images[1]} alt="" />
        <img src={images[2]} alt="" />
        <img src={images[3]} alt="" />
        <img src={images[4]} alt="" />
      </Carousel>
      <div className={style.heroImg}></div>
    </div>
  );
};

export default CarouselEffect;
