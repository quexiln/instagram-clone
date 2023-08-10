import React from "react";
import { useState } from "react";
import styles from "./phoneNoOrGmail.module.css";
import globalStyles from "../../register.module.css";
import axios from "axios";

const PhoneNoOrGmail = ({
  phoneNoOrGmail,
  setPhoneNoOrGmail,
  setButtonIsActiveRegisterEntries,
}) => {
  const [errorPhoneNoOrGmailStyle, setErrorPhoneNoOrGmailStyle] = useState({});
  const phoneNoOrGmailInput = (e) => {
    setPhoneNoOrGmail(e.target.value);
  };
  const checkPhoneNoOrGmail = () => {
    
    axios
      .post("http://localhost:8080/dataBase/register/checkPhoneNoOrGmail", {
        phoneNoOrGmail:String(phoneNoOrGmail).toLowerCase(),
      })
      .then((res) => {
        setButtonIsActiveRegisterEntries(prevState => ({
          ...prevState,
          phoneNoOrGmail: true
        }));
        setErrorPhoneNoOrGmailStyle({ display: "block" });
      })
      .catch((err) => {
        if (
          phoneNoOrGmail.includes("@") &&
          phoneNoOrGmail.includes(".") &&
          phoneNoOrGmail.split("@").length - 1 === 1 &&
          phoneNoOrGmail.length >= 6
        ) {
          setErrorPhoneNoOrGmailStyle({
            backgroundPosition: "-225px -333px",
            display: "block",
          });
          setButtonIsActiveRegisterEntries(prevState => ({
            ...prevState,
            phoneNoOrGmail: false
          }));
        } else if (
          !isNaN(phoneNoOrGmail) &&
          (phoneNoOrGmail.length === 10 || phoneNoOrGmail.length === 11)
        ) {
          setErrorPhoneNoOrGmailStyle({
            backgroundPosition: "-225px -333px",
            display: "block",
          });
          setButtonIsActiveRegisterEntries(prevState => ({
            ...prevState,
            phoneNoOrGmail: false
          }));
        } else {
          setErrorPhoneNoOrGmailStyle({ display: "block" });
          setButtonIsActiveRegisterEntries(prevState => ({
            ...prevState,
            phoneNoOrGmail: true
          }));
        }
      });
  };
  return (
    <div>
      <input
        type="text"
        className={globalStyles.input}
        placeholder="Cep Telefonu Numarası veya E-posta"
        onChange={phoneNoOrGmailInput}
        value={phoneNoOrGmail}
        onFocus={() => {
          setErrorPhoneNoOrGmailStyle({ display: "none" });
        }}
        onBlur={checkPhoneNoOrGmail}
      />
      <div
        className={`${styles.errorPhoneNoOrGmail} ${globalStyles.errorInput}`}
        style={errorPhoneNoOrGmailStyle}
      />
    </div>
  );
};

export default PhoneNoOrGmail;
