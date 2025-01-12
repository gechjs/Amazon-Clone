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
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await instance.get(`products/category/${categoryName}`, {
          params: {
            _page: currentPage,
            _limit: itemsPerPage,
          },
        });
        setLoading(false);
        setData(response.data);
      } catch (err) {
        console.log("Error fetching products:", err);
        setLoading(false);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchData();
  }, [categoryName, currentPage, itemsPerPage]);


  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

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
            <p style={{ color: "red" }}>{error}</p>
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

       
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Previous
          </button>
          <span className={styles.pageNumber}>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={results.length < itemsPerPage}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      </div>
    </LayOut>
  );
};

export default Results;
