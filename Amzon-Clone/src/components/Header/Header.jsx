import React, { useContext } from "react";
import amazonLogo from "../../assets/amazon_logo.png";
import usaFlag from "../../assets/usaFlag.png";
import cartImg from "../../assets/cart.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import styles from "./css/header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../utils/firebase'
const Header = () => {
  const [{user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket.reduce((amount, item) => item.amount + amount, 0);

  return (
    <section className={styles.fixed}>
      <header>
        <div className={styles.headerFixedContainer}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img width={100} src={amazonLogo} alt="amazon logo" />
            </Link>
            <a className={styles.delivery} href="">
              <span>
                <HiOutlineLocationMarker />
              </span>

              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </a>
          </div>

          <div className={styles.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Amazon" />
            <BsSearch size={25} />
          </div>

          <div className={styles.orderContainer}>
            <Link to="" className={styles.language}>
              <img src={usaFlag} alt="USA Flag" />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/auth"}>
              {user ? (
                <>
                  <p>Hello {user.email?.split("@")[0]}</p> <span onClick={()=>{
                    auth.signOut()
                
                  }}>Sign out</span>
                </>
              ) : (
                <>
                  {" "}
                  <p>Hello, sign in</p> <span>Account & Lists</span>
                </>
              )}
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={styles.cart}>
              <img src={cartImg} width={50} height={35} alt="" />
              <span className={styles.number}>{totalItem}</span>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </header>

      <LowerHeader />
    </section>
  );
};

export default Header;
