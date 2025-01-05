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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navStateData = useLocation();
  const navigate = useNavigate();

  const authHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter your email and password.");
      return;
    }
    setIsLoading(true); 
    if (e.target.name === "signIn") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed in!", userCredential.user);
          dispatch({
            type: type.SET_USER,
            user: userCredential.user,
          });
          setIsLoading(false);
          setError("");
          setEmail(""); // Clear email
          setPassword(""); // Clear password
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            setError('User not found. Please check your email address.');
          } else if (error.code === 'auth/wrong-password') {
            setError('Incorrect password.');
          } else {
            setError('An error occurred during sign-in. Please try again later.');
          }
          setIsLoading(false); 
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          dispatch({
            type: type.SET_USER,
            user: userCredential.user,
          });
          setIsLoading(false);
          setError("");
          setEmail(""); // Clear email
          setPassword(""); // Clear password
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setError('This email is already in use. Please try a different email.');
          } else {
            setError('An error occurred during registration. Please try again later.');
          }
          setIsLoading(false); 
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
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <ClipLoader size={50} />
            </div>
          ) : (
            <>
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
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                  />
                </div>
                <button
                  name="signIn"
                  onClick={authHandler}
                  className={styles.login_signInButton}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader size={15} /> : " Sign-In"}
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader size={15} />
                ) : (
                  "Create your Amazon Account"
                )}
              </button>
              <small style={{ color: "red", paddingTop: "10px" }}>
                {error ? error : ""}
              </small>
              <Link to="/forgot-password">Forgot your password?</Link>
            </>
          )}
        </div>
      </section>
    </LayOut>
  );
};

export default Auth;
