import Menu from "../../components/menu/Menu";
import ProfileSwitcher from "../../components/profileSwitcher/ProfileSwitcher";
import styles from "./main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.leftMenu}>
        <Menu />
      </div>
      <div className={styles.body}>
        <div className={styles.rightSideBar}>
          <ProfileSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Main;
