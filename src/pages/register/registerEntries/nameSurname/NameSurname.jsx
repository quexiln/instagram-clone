import React from "react";
import globalStyles from "../../register.module.css";
import { useState } from "react";
import styles from "./nameSurname.module.css";

const NameSurname = ({
  nameSurname,
  setNameSurname,
  setButtonIsActiveRegisterEntries,
}) => {
  const [errorNameSurnameStyle, setErrorNameSurnameStyle] = useState({});
  const nameSurnameInput = (e) => {
    setNameSurname(e.target.value);
  };
  const checkNameSurname = () => {
    if (nameSurname === "") {
      setErrorNameSurnameStyle({ display: "none" });
      setButtonIsActiveRegisterEntries((prevState) => ({
        ...prevState,
        nameSurname: true,
      }));
    } else {
      setErrorNameSurnameStyle({ display: "block" });
      setButtonIsActiveRegisterEntries((prevState) => ({
        ...prevState,
        nameSurname: false,
      }));
    }
  };
  return (
    <div>
      <input
        type="text"
        className={globalStyles.input}
        placeholder="Adı Soyadı"
        onChange={nameSurnameInput}
        onBlur={checkNameSurname}
        onFocus={()=>{setErrorNameSurnameStyle({display:"none"})}}
        value={nameSurname}
      />
      <div
        className={`${styles.errorNameSurname} ${globalStyles.errorInput}`}
        style={errorNameSurnameStyle}
      />
    </div>
  );
};

export default NameSurname;
