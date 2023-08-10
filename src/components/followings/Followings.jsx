import React from "react";
import styles from "./followings.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Followings = ({ username, setFollowingsView }) => {
  const navigate = useNavigate();
  const [followingList, setFollowingList] = useState([]);
  useEffect(() => {
    const getFollowings = async () => {
      await axios
        .post("http://localhost:8080/dataBase/follow/getFollowings", {
          username,
        })
        .then((res) => {
          setFollowingList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getFollowings();
  }, [username]);

  const handleClose = () => {
    navigate(`/${username}`);
    setFollowingsView(false);
  };
  return (
    <div className={styles.main}>
      <div className={styles.gui}>
        <div className={styles.header}>
          <div className={styles.title}>Takip ettikleri</div>
          <div onClick={handleClose} className={styles.close}>
            <svg
              aria-label="Kapat"
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="18"
              role="img"
              viewBox="0 0 24 24"
              width="18"
            >
              <title>Kapat</title>
              <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              ></polyline>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
              ></line>
            </svg>
          </div>
        </div>{" "}
        <div className={styles.followedList}>
          {followingList.map((followed, i) => (
            <div
              onClick={() => {
                window.location.href = `/${followed.username}`;
              }}
              key={i}
              className={styles.followed}
            >
              <div
                className={styles.profilePhoto}
                style={{ backgroundImage: `url(${followed.profilePhoto})` }}
              ></div>
              <div className={styles.names}>
                <div className={styles.username}>{followed.username}</div>
                <div className={styles.nameSurname}>{followed.nameSurname}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followings;
