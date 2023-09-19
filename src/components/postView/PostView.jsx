import React, { useEffect, useState } from "react";
import styles from "./postView.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closePost } from "../../stores/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const PostView = () => {
  const dispatch = useDispatch();
  const { openTab } = useSelector((state) => state.tabs);
  const { lastTab } = useSelector((state) => state.tabs);
  const [postId, setPostId] = useState(
    window.location.pathname.replace("/p/", "").replace(/\//g, "")
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

  const handleClose = () => {
    dispatch(closePost());
    window.history.replaceState(null, "Instagram", `${lastTab}`);
  };

  return (
    <>
      <div className={styles.background} onClick={handleClose}></div>
      <div className={styles.main}>
        <div className={styles.postBody}>
          <div className={styles.left}>
            <img className={styles.postImage} src={postImage} alt="" />
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              <div
                className={styles.username}
                onClick={() => {
                  window.location.href(`/${postInformations.username}`);
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
                        window.location.href(`/${postInformations.username}`);
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
    </>
  );
};

export default PostView;
