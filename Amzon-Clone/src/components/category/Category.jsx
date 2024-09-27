import React from "react";
import CategoryCard from "./CategoryCard";
import categoryInfo from "./categoryInfo";
import styles from "./css/categoryCard.module.css";
import SingleCategory from "./singleCategory";


const Category = () => {
  return (
    <div className={styles.categoryContainer}>
      {categoryInfo.map((info) =>
        info.imgs.length == 4 ? (
          <CategoryCard data={info} />
        ) : (
          <SingleCategory data={info} />
        )
      )}
    </div>
  );
};

export default Category;
