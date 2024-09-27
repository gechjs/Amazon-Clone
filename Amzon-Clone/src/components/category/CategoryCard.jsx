import React from "react";
import styles from "./css/categoryCard.module.css";
import { Link } from "react-router-dom";
const CategoryCard = ({ data }) => {
  return (
    <div className={styles.CategoryCard}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <div className={styles.imgContainer}>
          {data.imgs.map((item, index) => (
            <div className={`${styles.box} ${styles.multi}`}>
              <img key={index} src={item.img} alt="" />
              <span className={styles.name}>{item.name}</span>
            </div>
          ))}
        </div>
        <p>shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
