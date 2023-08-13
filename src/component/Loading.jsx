import React from "react";
import loader from "../assets/curiosity child.gif";
import styles from "./styles/Loading.module.scss"
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={loader} alt="" />
    </div>
  );
};

export default Loading;
