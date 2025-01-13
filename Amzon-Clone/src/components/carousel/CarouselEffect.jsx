import React from "react";
import images from "./data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './css/carousel.module.css';

const CarouselEffect = () => {
  // Check if images are available, if not use a placeholder image
  const imageList = images.length > 0 ? images : ['https://via.placeholder.com/600x400'];

  return (
    <div>
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        autoPlay={true}
        showThumbs={false}
      >
        {imageList.map((image, index) => (
          <img key={index} src={image} alt={`Carousel image ${index + 1}`} />
        ))}
      </Carousel>
      <div className={style.heroImg}>
        {/* Added background color or placeholder content */}
        <div className={style.overlay}></div>
      </div>
    </div>
  );
};

export default CarouselEffect;
