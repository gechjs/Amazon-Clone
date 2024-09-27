import React, { useState, useContext } from "react";
import styles from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import amazonLogo from "../../assets/amazonwhitebg.png";
import { auth } from "../../utils/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { type } from "../../utils/action.type";
import LayOut from "../../components/LayOut/LayOut";

const Auth = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user);
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState({
    signUp: false,
    signIn: false,
  });
  const navStateData = useLocation();

  const navigate = useNavigate();

  const authHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "signIn") {
      setLoading({
        ...Loading,
        signIn: true,
      });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed in!", userCredential.user);
          dispatch({
            type: type.SET_USER,
            user: userCredential.user,
          });
          setLoading({
            ...Loading,
            signIn: false,
          });
          setError("");

          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error);
          setLoading({
            ...Loading,
            signIn: false,
          });
        });
    } else {
      setLoading({
        ...Loading,
        signUp: true,
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          dispatch({
            type: type.SET_USER,
            user: userCredential.user,
          });
          setLoading({
            ...Loading,
            signUp: false,
          });
          setError("");

          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error);
          setLoading({
            ...Loading,
            signUp: false,
          });
        });
    }
  };

  return (
    <LayOut>
      <section className={styles.login}>
        <Link to="/">
          <img src={amazonLogo} alt="" />
        </Link>
        <div className={styles.login_container}>
          <h1>Sign-in</h1>
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
          <form action="">
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
              />
            </div>
            <button
              name="signIn"
              onClick={authHandler}
              className={styles.login_signInButton}
              type="submit"
            >
              {Loading.signIn ? <ClipLoader size={15} /> : " Sign-In"}
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button
            name="signUp"
            onClick={authHandler}
            type="submit"
            className={styles.login_registerButton}
          >
            {Loading.signUp ? (
              <ClipLoader size={15} />
            ) : (
              "Create your Amazon Account"
            )}
          </button>
          <small style={{ color: "red", paddingTop: "10px" }}>
            {error ? error.message : ""}
          </small>
        </div>
      </section>
    </LayOut>
  );
};

export default Auth;
