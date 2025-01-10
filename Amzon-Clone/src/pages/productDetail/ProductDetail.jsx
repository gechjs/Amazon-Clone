import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import LayOut from "../../components/LayOut/LayOut.jsx";
import { useParams } from "react-router-dom";
import instance from "../../utils/axios.js";
import ProductCard from "../../components/Product/ProductCard.jsx";
import Loader from "../../components/loader/Loader.jsx";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

const ProductDetail = () => {
  const [data, setData] = useState(null);
  const { productId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      <ErrorBoundary>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div>An error occurred: {error.message}</div>
        ) : data ? (
          <ProductCard renderDesc={true} flex={true} product={data} />
        ) : (
          <div>Product not found.</div>
        )}
      </ErrorBoundary>
    </LayOut>
  );
};

export default ProductDetail;

