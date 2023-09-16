import React, { useState } from "react";
import styles from "./postView.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closePost } from "../../stores/tabs";
import { useLocation } from "react-router-dom";

const PostView = () => {
  const dispatch = useDispatch();
  const { openTab } = useSelector((state) => state.tabs);
  const { lastTab } = useSelector((state) => state.tabs);
  const [postId, setPostId] = useState(
    JSON.stringify(window.location.pathname).replace("/p/", "").replace(/\//g, "")
  );
  const handleClose = () => {
    dispatch(closePost());
    window.history.replaceState(null, "Instagram", `${lastTab}`);
  };

  return (
    <>
      <div className={styles.background} onClick={handleClose}></div>
      <div className={styles.main}>{postId}</div>
    </>
  );
};

export default PostView;
