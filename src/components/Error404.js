import React from "react";
import styles from "../css/Error.module.css";
import { useNavigate } from "react-router-dom";
export default function Error404() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.errorHeading}>How did you get there 🤔 ...</h1>
      <h3 className={`${styles.errorHeading} ${styles.dontWorry}`}>
        Dont Worry!
      </h3>
      <button className={styles.backToHome} onClick={() => navigate("/")}>
        Return Back To Safety
      </button>
    </div>
  );
}
