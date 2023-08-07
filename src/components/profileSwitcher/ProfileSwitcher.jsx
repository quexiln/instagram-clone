import React, { useEffect, useState } from "react";
import styles from "./profileSwitcher.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileInformations } from "../../functions/GetProfileInformations";

const ProfileSwitcher = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userInformations);
  const [profileInformations, setProfileInformations] = useState(null); // Initialize profileInformations with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getProfileInformations(id));
        setProfileInformations(response.checkData ? response : null);
      } catch (error) {
        console.error("Error fetching profile information:", error);
        setProfileInformations(null); // Handle error by setting profileInformations to null
      }
    };
    fetchData();
  }, [dispatch, id]);

  return (
    <div>
      {profileInformations && profileInformations.checkData ? ( // Check if profileInformations is truthy before accessing checkData
        <div className={styles.main}>
          <div
            className={styles.profilePhoto}
            style={{
              backgroundImage: `url(${profileInformations.profilePhoto})`,
            }}
          />
          <div className={styles.profileInformations}>
            <Link to={{pathname:`/${profileInformations.username}`}} className={`${styles.username} ${styles.profileInformation}`}>
              {profileInformations.username}
            </Link>
            <div
              className={styles.profileInformation}
              style={{ color: "rgb(115, 115, 115)" }}
            >
              {profileInformations.nameSurname}
            </div>
          </div>
          <div className={styles.switchAccount}>
            <Link to={{ pathname: "/login" }} className={styles.switchAccountText}>
              Geçiş Yap
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileSwitcher;
