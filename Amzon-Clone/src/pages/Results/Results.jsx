import React, { useEffect, useState } from "react";
import styles from "./results.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import instance from "../../utils/axios";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/loader/Loader";

const Results = () => {
  const { categoryName } = useParams();
  const [results, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error on new request
      try {
        const response = await instance.get(`products/category/${categoryName}`);
        setLoading(false);
        setData(response.data);
      } catch (err) {
        console.log("Error fetching products:", err);
        setLoading(false);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchData();
  }, [categoryName]);

  return (
    <LayOut>
      <div className={styles.result_container}>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category: {categoryName}</p>
        <hr />
        <div className={styles.product_container}>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p> // Display error message if it occurs
          ) : results.length === 0 ? (
            <p aria-live="polite" style={{ padding: "30px", color: "gray" }}>
              No products found in the "{categoryName}" category. Try exploring other categories or check back later.
            </p>
          ) : (
            results.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))
          )}
        </div>
      </div>
    </LayOut>
  );
};

export default Results;
