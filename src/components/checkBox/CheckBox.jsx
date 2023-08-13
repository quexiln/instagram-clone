import React from "react";
import styles from "./checkbox.module.css";

const CheckBox = ({ funct,value }) => {
  return (
    <div>
      <label className={styles.button}>
        <input
          className={styles.inputCheckBox}
          type="checkbox"
          onChange={funct}
        />
        <span
        style={value ?{backgroundColor:"#0095F6"}:null}
          className={`${
            value ? styles.checkBoxActive : styles.checkBoxInActive
          } ${styles.checkBox}`}
        ></span>
      </label>
    </div>
  );
};

export default CheckBox;
