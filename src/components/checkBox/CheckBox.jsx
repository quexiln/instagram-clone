import React from "react";
import styles from "./checkbox.module.css";

const CheckBox = ({ value, setValue }) => {
  const handleCheckBox = (e) => {
    setValue(e.target.checked);
    console.log(e.target.checked);
  };

  return (
    <div>
      <label className={styles.button}>
        <input
          className={styles.inputCheckBox}
          type="checkbox"
          value={value}
          onChange={handleCheckBox}
        />
        <span
          style={value ? { backgroundColor: "#0095F6" } : null}
          className={`${
            value ? styles.checkBoxActive : styles.checkBoxInActive
          } ${styles.checkBox}`}
        ></span>
      </label>
    </div>
  );
};

export default CheckBox;
