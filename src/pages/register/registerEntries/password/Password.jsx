import React from "react";
import globalStyles from "../../register.module.css";
import styles from "./password.module.css";
import { useState } from "react";

const Password = ({
  password,
  setPassword,
  setButtonIsActiveRegisterEntries,
}) => {
  const [errorPasswordStyle, setErrorPasswordStyle] = useState({});
  const [passwordText, setPasswordText] = useState("");

  const passwordInput = (e) => {
    let normalPassword = String(e.target.value);

    if (normalPassword === "") {
      setPassword("");
      setPasswordText("");
      return;
    }

    if (normalPassword.length > password.length) {
      // Yapıştırma işlemi
      const pastedText = normalPassword.substring(password.length);
      setPassword(password + pastedText);
      setPasswordText("*".repeat(password.length + pastedText.length));
    } else if (normalPassword.length < password.length) {
      // Backspace işlemi
      setPassword(password.slice(0, -1));
      setPasswordText("*".repeat(password.length - 1));
    } else {
      // Diğer karakter ekleme işlemleri
      setPassword(
        password + normalPassword.substring(normalPassword.length - 1)
      );
      setPasswordText("*".repeat(password.length + 1));
    }
  };
  const checkPassword = () => {
    if (password === "") {
      setErrorPasswordStyle({ display: "none" });
    } else {
      setErrorPasswordStyle({ display: "block" });
    }
    const uzunlukGereksinimi = password.length >= 8;
    const karmaşıklıkGereksinimi =
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);
    const benzersizlikGereksinimi =
      password !== "password" && password !== "12345678";

    if (
      uzunlukGereksinimi &&
      karmaşıklıkGereksinimi &&
      benzersizlikGereksinimi &&
      password.length >= 6
    ) {
      setButtonIsActiveRegisterEntries((prevState) => ({
        ...prevState,
        password: false,
      }));
    } else {
      setButtonIsActiveRegisterEntries((prevState) => ({
        ...prevState,
        password: true,
      }));
    }
  };
  return (
    <div>
      <input
        type="text"
        className={globalStyles.input}
        placeholder="Şifre"
        onChange={passwordInput}
        onBlur={checkPassword}
        value={passwordText}
      />
      <div
        className={`${styles.errorPassword} ${globalStyles.errorInput}`}
        style={errorPasswordStyle}
      />
    </div>
  );
};

export default Password;
