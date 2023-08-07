import React, { useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";
import Menu from "../../components/menu/Menu";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Follow } from "../../functions/follow/Follow";
import { getProfileInformations } from "../../functions/GetProfileInformations";
import { CheckFollowDispatch } from "../../functions/follow/CheckFollowDispatch";
import { UnFollow } from "../../functions/follow/UnFollow";

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [followRegion, setFollowRegion] = useState({ display: "none" });
  const [checkData, setCheckData] = useState(true);
  const [checkFollow, setCheckFollow] = useState();
  const [pathName, setPathName] = useState(
    String(location.pathname).toLowerCase().substring(1)
  );
  const anyListView = String(location.pathname)
    .toLowerCase()
    .substring(1)
    .split("/")[1];

  const [profileInformations, setProfileInformations] = useState({});
  const numberOfFollowers = useRef(null);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [posts, setPosts] = useState([]);

  const { id } = useSelector((state) => state.userInformations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await dispatch(getProfileInformations(pathName));
        setProfileInformations(profileData);
      } catch (error) {}
    };

    const fetchCheckFollow = async () => {
      try {
        const result = await dispatch(CheckFollowDispatch(id, pathName));
        setCheckFollow(result.checkFollow);
      } catch (error) {}
    };

    fetchCheckFollow();
    fetchData();
  }, [dispatch, id, pathName]);

  useEffect(() => {
    setFollowers(profileInformations.followers);
    setFollowings(profileInformations.followings);
    setPosts(profileInformations.posts);

    setCheckData(profileInformations.checkData);
    setFollowRegion({ display: "block" });
  }, [profileInformations]);

  const handleFollow = () => {
    const numberFollowers = parseInt(numberOfFollowers.current.textContent) + 1;
    numberOfFollowers.current.textContent = numberFollowers + " ";
    Follow(id, profileInformations.username);
    setCheckFollow(true);
  };
  const handleUnFollow = () => {
    if (followers.length > 0) {
      const numberFollowers =
        parseInt(numberOfFollowers.current.textContent) - 1;
      numberOfFollowers.current.textContent = numberFollowers + " ";
    }
    UnFollow(id, profileInformations.username);
    setCheckFollow(false);
  };

  useEffect(() => {
    if (!(anyListView === "followers" || anyListView === "following")) {
      setPathName(
        String(location.pathname).toLowerCase().substring(1).split("/")[0]
      );
      setCheckData(false);
    }
  }, [anyListView]);
  return (
    <div>
      {checkData ? (
        <div className={styles.main}>
          <div className={styles.leftMenu}>
            <Menu />
          </div>
          <div className={styles.body}>
            <div className={styles.profile}>
              <div
                className={styles.profilePhoto}
                style={{
                  backgroundImage: `url(${profileInformations.profilePhoto})`,
                }}
              />
              <div className={styles.profileInformations}>
                <div className={styles.profileInformationsTopSide}>
                  <div className={styles.username}>
                    {profileInformations.username}
                  </div>
                  <div style={followRegion}>
                    {!checkFollow ? (
                      <button className={styles.follow} onClick={handleFollow}>
                        Takip Et
                      </button>
                    ) : (
                      <button
                        className={`${styles.unFollow} ${styles.whiteButton}`}
                        onClick={handleUnFollow}
                      >
                        Takiptesin
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      className={`${styles.sendMessage} ${styles.whiteButton}`}
                    >
                      Mesaj Gönder
                    </button>
                  </div>
                </div>
                <div className={styles.profileInformationsMidSide}>
                  <div className={styles.numbers}>
                    <label style={{ fontWeight: "600" }}>
                      {posts.length}&nbsp;
                    </label>
                    gönderi
                  </div>
                  <div className={styles.numbers}>
                    <label
                      ref={numberOfFollowers}
                      style={{ fontWeight: "600" }}
                    >
                      {followers.length}&nbsp;
                    </label>
                    takipçi
                  </div>
                  <div className={styles.numbers}>
                    <label style={{ fontWeight: "600" }}>
                      {followings.length}&nbsp;
                    </label>
                    takip
                  </div>
                </div>
                <div className={styles.nameSurname}>
                  {profileInformations.nameSurname}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.leftMenu}>
            <Menu />
          </div>
          <div className={styles.body}>
            <div className={styles.errorMessages}>
              <div className={styles.errorMessage}>
                Üzgünüz, bu sayfaya ulaşılamıyor.
              </div>
              <div className={styles.errorMessage2}>
                Tıkladığın bağlantı bozuk olabilir veya sayfa kaldırılmış
                olabilir. Instagram'a geri dön.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
