import axios from "axios";
import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import ProductCard from "./ProductCard";
import styles from "./ProductCard.module.css";
import Loader from "../loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]); // Changed from empty object to empty array for better data handling
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    instance
      .get("/products")
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <section className={styles.products_container}>
      {isLoading ? (
        <Loader />
      ) : (
        products.map((item) => <ProductCard product={item} key={item.id} />)
      )}
    </section>
  );
};


export default Product;
