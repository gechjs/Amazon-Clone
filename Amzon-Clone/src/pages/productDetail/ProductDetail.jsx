import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import LayOut from "../../components/LayOut/LayOut.jsx";
import { useParams } from "react-router-dom";
import instance from "../../utils/axios.js";
import ProductCard from "../../components/Product/ProductCard.jsx";
import Loader from "../../components/loader/Loader.jsx";

const ProductDetail = () => {
  const [data, setdata] = useState([]);
  const { productId } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await instance(`products/${productId}`);
        setLoading(false);
        setdata(response.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <LayOut>{isLoading ? <Loader /> : <ProductCard renderDesc={true} flex= {true} product={data} />}</LayOut>
  );
};

export default ProductDetail;
