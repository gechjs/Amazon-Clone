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
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `products/category/${categoryName}`
        );
        setLoading(false);
        setData(response.data);
      } catch (err) {
        console.log("error", err);
        setLoading(false);
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
          {
            isLoading? (
              <Loader />
            ) : (
              results.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))
            )
          }
        </div>
      </div>
    </LayOut>
  );
};

export default Results;
