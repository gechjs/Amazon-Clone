import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import LayOut from "../../components/LayOut/LayOut.jsx";
import { useParams } from "react-router-dom";
import instance from "../../utils/axios.js";
import ProductCard from "../../components/Product/ProductCard.jsx";
import Loader from "../../components/loader/Loader.jsx";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary"; // Import ErrorBoundary

const ProductDetail = () => {
  const [data, setData] = useState([]);
  const { productId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await instance(`products/${productId}`);
        setData(response.data);
      } catch (err) {
        setError(err); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <LayOut>
      <ErrorBoundary> {/* Wrap the component with ErrorBoundary */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>An error occurred: {error.message}</div> 
        ) : (
          <ProductCard renderDesc={true} flex={true} product={data} />
        )}
      </ErrorBoundary>
    </LayOut>
  );
};

export default ProductDetail;

