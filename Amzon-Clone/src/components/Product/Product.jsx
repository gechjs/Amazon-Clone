import axios from "axios";
import React, { useEffect, useState } from "react";
import instance from "../../utils/axios";
import ProductCard from "./ProductCard";
import styles from "./ProductCard.module.css";
import Loader from "../loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added state for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await instance.get("/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products."); // Set a user-friendly error message
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.products_container}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p> // Display error message to the user
      ) : (
        products.map((item) => <ProductCard product={item} key={item.id} />)
      )}
    </section>
  );
};

export default Product;
