import React from "react";
import styles from "../css/home.module.css";
import { Link } from "react-router-dom";

import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

export default function ProductItem(props) {
  let item = props.item;
  let handleProductDelete = props.handleProductDelete;

  const dispatch = useDispatch();

  // add item to redux store
  function handleAddToCart(item) {
    dispatch(addToCart(item));
    toast.success(`${item.title} added to cart`, {
      position: "bottom-center",
      autoClose: 3000,
    });
  }
  return (
    <div className={styles.product}>
      <div className={styles.productImage}>
        <img src={item.image} alt="item" />{" "}
      </div>
      <div className={styles.productTitle}>
        <Link to={`/products/${item.id}`}>{item.title}</Link>
      </div>
      <div className={styles.productCategory}>({item.category})</div>
      <div className={styles.price}>
        <span>$ </span> {item.price}
      </div>
      <div className={styles.ratings}>
        <div className={styles.rate}>
          <i className="fa fa-star" aria-hidden="true"></i> {item.rating.rate}
        </div>
        <div className={styles.count}>{item.rating.count} ratings</div>
      </div>
      <div className={styles.btns}>
        <button className={styles.editProduct}>
          <Link to={`/update-product/${item.id}`}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </Link>
        </button>
        <button
          className={styles.deleteProduct}
          onClick={() => handleProductDelete(item.id)}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button
          className={styles.addToCart}
          onClick={() => handleAddToCart(item)}
        >
          <i className="fa fa-cart-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
