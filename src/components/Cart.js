import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "../css/cart.module.css";
import { removeFromCart } from "../store/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  function getNetAmount() {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.price;
    });
    return sum;
  }

  function handleRemoveItem(id) {
    dispatch(removeFromCart(id));
    let oldCart = JSON.parse(localStorage.getItem("cartItems"));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(oldCart.filter((item) => item.id !== id))
    );
    toast.warning("Item deleted from cart", {
      position: "bottom-center",
    });
  }

  // razorpay integration starts
  function loadScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handleCheckout(amount) {
    amount *= 1000;
    console.log(`amount in paise = ${amount} in ${typeof(amount)}`)
    const res = await loadScript();
    if (!res) {
      alert("Payment Failed!");
      return;
    }

    const options = {
      key: "rzp_test_8BiyI71UqrlDqT",
      currency: "INR",
      amount: amount,
      name: "E Commerce",
      description: "We have extremely low dollar conversion rate",
      handler: (res) => {
        alert(
          `Payment Successfull with Payment ID - ${res.razorpay_payment_id}`
        );
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  // razorpay integration ends

  return (
    <div className={styles.container}>
      {cartItems.map((item, index) => {
        return (
          <div className={styles.cartItem} key={index}>
            <div className={styles.itemWrapper}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.title} />
              </div>
              <div>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemPrice}>$ {item.price}</div>
              </div>
            </div>
            <div className={styles.itemDelete}>
              <button onClick={() => handleRemoveItem(item.id)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        );
      })}
      <div className={styles.totalAmount}>Total : $ {getNetAmount()}</div>
      {getNetAmount() ? (
        <button
          className={styles.checkout}
          onClick={() => handleCheckout(getNetAmount())}
        >
          Proceed To Checkout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
