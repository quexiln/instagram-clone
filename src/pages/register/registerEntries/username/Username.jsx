import React, { useState } from "react";
import globalStyles from "../../register.module.css";
import styles from "./username.module.css";
import axios from "axios";

const NameSurname = ({
  username,
  setUsername,
  setButtonIsActiveRegisterEntries,
}) => {
  const [errorUsernameStyle, setErrorUsernameStyle] = useState({});
  const usernameInput = (e) => {
    setUsername(e.target.value);
  };
  const checkUsername = () => {
    axios
      .post("http://localhost:8080/dataBase/register/checkUsername", {
        username:String(username).toLowerCase(),
      })
      .then((res) => {
        setButtonIsActiveRegisterEntries((prevState) => ({
          ...prevState,
          username: true,
        }));
        setErrorUsernameStyle({ display: "block" });
      })
      .catch((err) => {
        if (
          username.includes(" ") ||
          (!isNaN(username)) ||
          username.length < 3
        ) {
          setErrorUsernameStyle({ display: "block" });
          setButtonIsActiveRegisterEntries((prevState) => ({
            ...prevState,
            username: true,
          }));
        } else {
          setErrorUsernameStyle({
            backgroundPosition: "-225px -333px",
            display: "block",
          });
          setButtonIsActiveRegisterEntries((prevState) => ({
            ...prevState,
            username: false,
          }));
        }
      });
  };
  return (
    <div>
      <input
        type="text"
        className={globalStyles.input}
        placeholder="Kullanıcı Adı"
        onChange={usernameInput}
        onBlur={checkUsername}
        onFocus={() => {
          setErrorUsernameStyle({ display: "none" });
        }}
        value={username}
      />
      <div
        className={`${styles.errorUsername} ${globalStyles.errorInput}`}
        style={errorUsernameStyle}
      />
    </div>
  );
};

export default NameSurname;
