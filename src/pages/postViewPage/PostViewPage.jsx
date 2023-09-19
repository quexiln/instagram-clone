/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "./postViewPage.module.css";
import Menu from "../../components/menu/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";

const PostViewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lastTab } = useSelector((state) => state.tabs);
  const [postId, setPostId] = useState(
    location.pathname.replace("/p/", "").replace(/\//g, "")
  );
  const [postInformations, setPostInformations] = useState([]);
  const [postImage, setPostImage] = useState({});
  const [postAuthorProfilePhoto, setPostAuthorProfilePhoto] = useState({});

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

          const buffer = Buffer.from(res.data.profilePhoto.data.data);
          let url = buffer.toString("base64");
          setPostAuthorProfilePhoto(
            `data:${res.data.profilePhoto.contentType};base64,${url}`
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
          <div className={styles.left}>
            <img className={styles.postImage} src={postImage} alt="" />
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              <div
                className={styles.username}
                onClick={() => {
                  navigate(`/${postInformations.username}`);
                }}
              >
                {postInformations.username}
              </div>
            </div>
            <div className={styles.comments}>
              <div className={styles.captionText}>
                <div className={styles.comment}>
                  <div
                    className={styles.profilePhoto}
                    style={{
                      backgroundImage: `url(${postAuthorProfilePhoto})`,
                    }}
                  ></div>
                  <div className={styles.text}>
                    <div
                      className={styles.commentAuthor}
                      onClick={() => {
                        navigate(`/${postInformations.username}`);
                      }}
                    >
                      {postInformations.username}
                    </div>
                    <div className={styles.commentText}>
                      {postInformations.captionText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewPage;
