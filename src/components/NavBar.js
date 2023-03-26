import React from "react";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function NavBar(props) {
  let loggenIn = props.loggedIn;
  let handleSetLoggedIn = props.handleSetLoggedIn;

  const cartItems = useSelector((state) => state.cart)
  
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">E Commerce</Link>
        </div>

        <div className={styles.utilities}>
          <button className={styles.addAProduct}>
            <Link to={"/create-product"}>Add a Product</Link>
          </button>
          <div className={styles.cart}>
            <Link to="/cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> 
              <span> {cartItems.length}</span>
            </Link>
          </div>
          <div className={styles.user}>
            {loggenIn ? (
              <i
                className="fa fa-user-circle"
                aria-hidden="true"
                onClick={() => {
                  //clear local storage....
                  localStorage.removeItem('jwt');
                  handleSetLoggedIn(false);
                }}
              >
                {" "}
                Logout
              </i>
            ) : (
              <span>
                <Link to={`/login`}>Login</Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
