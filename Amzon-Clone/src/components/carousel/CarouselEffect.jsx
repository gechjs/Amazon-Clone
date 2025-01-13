import React from "react";
import images from "./data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './css/carousel.module.css';

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        autoPlay={true}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Carousel image ${index + 1}`} />
        ))}
      </Carousel>
      <div className={style.heroImg}>
      
      </div>
    </div>
  );
};

export default CarouselEffect;
