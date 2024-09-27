import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styles from './css/header.module.css'

const LowerHeader = () => {
  return (
    <div className={styles.lowerContainer}>
      <ul>
        <li>
        <AiOutlineMenu size={22} />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
      <ul>
        <li>Shop the Gamimg store</li>
      </ul>
    </div>
  );
};

export default LowerHeader;
