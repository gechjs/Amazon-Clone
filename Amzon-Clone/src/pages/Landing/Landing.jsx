import React from "react";
import CarouselEffect from "../../components/carousel/CarouselEffect";
import Category from "../../components/category/Category";
import LayOut from "../../components/LayOut/LayOut";
import styles from "./landing.module.css";
import Product from "../../components/Product/Product";

const Landing = () => {
  return (
    <LayOut>
      <div className={styles.landing_container}>
        <div className={styles.landing}>
          <CarouselEffect />
          <Category />
          <Product />
        </div>
      </div>
    </LayOut>
  );
};

export default Landing;
