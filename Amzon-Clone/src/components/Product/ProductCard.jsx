import React, { useContext } from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { type } from "../../utils/action.type.js";

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  const { image, title, rating, id, price, description } = product;
  const [state, dispatch] = useContext(DataContext);
  
  const addToCart = () => {
    if (!id) {
      console.log("Product ID is undefined.");
      return; 
    }
    
    dispatch({
      type: type.ADD_TO_BASKET,
      item: { image, title, rating, id, price, description },
    });
  };
  

  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`} className={styles.images}>
        <img
          width={150}
          src={image}
          className={styles.img_container}
          alt={title}
        />
      </Link>
      <div>
        <h3>{title}</h3>
        <div style={{ maxWidth: "700px" }}>{renderDesc && description}</div>
        <div className={`${styles.rating}`}>
          <StarRatings
            rating={rating?.rate}
            starRatedColor="gold"
            starDimension="20px"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
            editing={false}
          />
          <small>{rating?.count}</small>
        </div>
        <div className={`${styles?.price}`}>${price}</div>
        {!renderAdd && (
          <button
            className={styles?.button}
            onClick={() => {
              addToCart();
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
