import React from "react";
import styles from "./followers.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { UnFollow } from "../../../functions/follow/UnFollow";


const Followers = ({
  username,
  setFollowersView,
  itself,
  numberOfFollowers,
}) => {
  const navigate = useNavigate();
  const [followerList, setFollowerList] = useState([]);
  useEffect(() => {
    const getFollowers = async () => {
      await axios
        .post("http://localhost:8080/dataBase/follow/getFollowers", {
          username,
        })
        .then((res) => {
          setFollowerList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getFollowers();
  }, [username]);

  const handleClose = () => {
    navigate(`/${username}`);
    setFollowersView(false);
  };
  return (
    <div className={styles.main}>
      <div className={styles.gui}>
        <div className={styles.header}>
          <div className={styles.title}>Takipçiler</div>
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
        <div className={styles.followerList}>
          {followerList.map((follower, i) => (
            <div key={i} className={styles.follower}>
              <div
                onClick={() => {
                  window.location.href = `/${follower.username}`;
                }}
                className={styles.profilePhoto}
                style={{ backgroundImage: `url(${follower.profilePhoto})` }}
              ></div>
              <div
                className={styles.names}
                onClick={() => {
                  window.location.href = `/${follower.username}`;
                }}
              >
                <div className={styles.username}>{follower.username}</div>
                <div className={styles.nameSurname}>{follower.nameSurname}</div>
              </div>
              {itself ? (
                <div
                  className={styles.unFollow}
                  onClick={() => {
                    window.location.reload()
                    UnFollow(follower._id, username);

                  }}
                >
                  Çıkar
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
