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
          <img 
            key={`carousel-image-${index}`} 
            src={image} 
            alt={`Slide ${index + 1} showcasing content`} 
          />
        ))}
      </Carousel>
      <div className={style.heroImg} style={{ backgroundImage: `url(${images[0]})` }}>
       
        <h1>Welcome to the Carousel</h1>
      </div>
    </div>
  );
};

export default CarouselEffect;
