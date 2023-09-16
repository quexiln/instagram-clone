/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./postViewPage.module.css";
import Menu from "../../components/menu/Menu";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PostViewPage = () => {
  const location = useLocation();
  const [postId, setPostId] = useState(
    location.pathname.replace("/p/", "").replace(/\//g, "")
  );
  const [postInformations, setPostInformations] = useState([]);
  const [postImage, setPostImage] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      await axios
        .post("http://localhost:8080/dataBase/posts/getWithId", {
          id: postId,
        })
        .then((res) => {
          setPostImage(
            `data:${
              res.data.post.contentType
            };base64,${res.data.post.data.toString("base64")}`
          );
          setPostInformations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchPost();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.leftMenu}>
        <Menu />
      </div>
      <div className={styles.body}>
        <div className={styles.postBody}>
          <div className={styles.leftSide}>
            <img
              className={styles.postImage}
              src={postImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewPage;
