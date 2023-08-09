import { useEffect, useState } from "react";
import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneNoOrGmail from "./registerEntries/phoneNoOrGmail/PhoneNoOrGmail";
import NameSurname from "./registerEntries/nameSurname/NameSurname";
import Username from "./registerEntries/username/Username";
import Password from "./registerEntries/password/Password";
import profilePhotoPath from "../../images/profilePhoto.jpg";
import { useDispatch } from "react-redux";
import { setLoginId } from "../../stores/userInformations";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNoOrGmail, setPhoneNoOrGmail] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonIsActive, setButtonIsActive] = useState(true);
  const [buttonIsActiveRegisterEntries, setButtonIsActiveRegisterEntries] =
    useState({
      phoneNoOrGmail: true,
      nameSurname: true,
      username: true,
      password: true,
    });

  useEffect(() => {
    if (
      buttonIsActiveRegisterEntries.phoneNoOrGmail ||
      buttonIsActiveRegisterEntries.nameSurname ||
      buttonIsActiveRegisterEntries.username ||
      buttonIsActiveRegisterEntries.password
    ) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [buttonIsActiveRegisterEntries]);

  const handleRegister = async () => {


    if (buttonIsActive) {
      return;
    }
    try {
      let fileResponse = await axios.get(profilePhotoPath, { responseType: "blob" });
      let fileData = fileResponse.data;
      let profilePhotoData = new File([fileData], "profilePhoto.jpg");
    
      let formData = new FormData();
      formData.append("phoneNoOrGmail", phoneNoOrGmail);
      formData.append("nameSurname", nameSurname);
      formData.append("username", String(username).toLowerCase());
      formData.append("password", password);
      formData.append("profilePhoto", profilePhotoData);
      
      console.log(formData.profilePhoto);
      await axios.post("http://localhost:8080/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(setLoginId(res.data._id));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });}catch{}
  };

  return (
    <div className={styles.main}>
      <div className={styles.register}>
        <div className={styles.logo}></div>
        <h2 className={styles.shareMessage}>
          Arkadaşlarının fotoğraf ve videolarını görmek için kaydol.
        </h2>
        <button className={`${styles.button} ${styles.loginWithFacebook}`}>
          <div className={styles.facebookLogo}>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="12.000000pt"
              height="12.000000pt"
              viewBox="0 0 2048.000000 2048.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,2048.000000) scale(0.100000,-0.100000)"
                fill="white"
                stroke="none"
              >
                <path
                  d="M1040 20399 c-95 -12 -233 -54 -328 -99 -344 -163 -584 -496 -632
-872 -14 -115 -14 -18261 0 -18376 64 -504 468 -908 972 -972 56 -7 1679 -10
4980 -10 l4898 0 0 3935 0 3935 -1325 0 -1325 0 0 1540 0 1540 1325 0 1325 0
0 1198 c0 1180 5 1405 35 1692 80 748 321 1428 688 1942 230 322 542 626 857
838 501 336 1118 547 1830 626 307 34 1129 29 1870 -11 402 -22 894 -61 1008
-80 l32 -6 0 -1374 0 -1375 -862 0 c-483 0 -922 -4 -998 -10 -750 -56 -1124
-345 -1239 -956 -38 -201 -41 -302 -41 -1406 l0 -1078 1521 0 1521 0 -6 -27
c-3 -16 -91 -694 -196 -1508 -104 -814 -192 -1495 -195 -1513 l-6 -32 -1319 0
-1320 0 0 -3935 0 -3935 2673 3 2672 2 85 23 c117 31 181 56 278 108 316 167
537 489 582 846 14 115 14 18261 0 18376 -45 357 -266 679 -582 846 -97 52
-161 77 -278 108 l-85 23 -9175 1 c-5046 1 -9204 -2 -9240 -7z"
                />
              </g>
            </svg>
          </div>
          Facebook ile Giriş Yap
        </button>
        <div className={styles.or}>
          <div className={styles.line} />
          <label className={styles.orText}>YA DA</label>
          <div className={styles.line} />
        </div>
        <div className={styles.registerEntries}>
          <PhoneNoOrGmail
            phoneNoOrGmail={phoneNoOrGmail}
            setPhoneNoOrGmail={setPhoneNoOrGmail}
            setButtonIsActiveRegisterEntries={setButtonIsActiveRegisterEntries}
          />
          <NameSurname
            nameSurname={nameSurname}
            setNameSurname={setNameSurname}
            setButtonIsActiveRegisterEntries={setButtonIsActiveRegisterEntries}
          />
          <Username
            username={username}
            setUsername={setUsername}
            setButtonIsActiveRegisterEntries={setButtonIsActiveRegisterEntries}
          />
          <Password
            password={password}
            setPassword={setPassword}
            setButtonIsActiveRegisterEntries={setButtonIsActiveRegisterEntries}
          />
        </div>
        <div className={styles.informationMessage}>
          Hizmetimizi kullanan kişiler senin iletişim bilgilerini Instagram'a
          yüklemiş olabilir.
          <label className={styles.informationLink}>Daha Fazla Bilgi Al</label>
        </div>
        <div className={styles.informationMessage}>
          Kaydolarak,
          <label className={styles.informationLink}>
            &nbsp;Koşullarımızı, Gizlilik İlkemizi&nbsp;
          </label>{" "}
          ve{" "}
          <label className={styles.informationLink}>
            &nbsp;Çerezler İlkemizi&nbsp;
          </label>
          kabul etmiş olursun.
        </div>
        <button
          onClick={handleRegister}
          className={`${styles.button} ${
            buttonIsActive ? styles.disabledButton : ""
          }`}
        >
          Kaydol
        </button>
      </div>
      <div className={styles.loginChoice}>
        Hesabın var mı? &nbsp;{" "}
        <Link
          to={{ pathname: "/login" }}
          style={{
            color: "rgb(10,155,247)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {" "}
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default Register;
