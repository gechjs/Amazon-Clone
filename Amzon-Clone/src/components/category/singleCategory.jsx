import React from "react";
import styles from "./css/categoryCard.module.css";
import singelStyle from './css/singleCategory.module.css'
import {Link} from 'react-router-dom'
const SingleCategory = ({ data }) => {
  return (
    <div>
      <div className={styles.CategoryCard}>
        <Link to={`/category/${data.name}`}>
          <span>
            <h2>{data.title}</h2>
          </span>
          <div className={singelStyle.imgs}>
            <img src={data.imgs} alt="" />
          </div>
          <p>shop now</p>

        </Link>
      </div>
    </div>
  );
};

export default SingleCategory;
