import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/MainScreen.module.scss";
import UserDetailsScreen from "./UserDetailsScreen";
import menuBtn from "../assets/icons8-menu-480.png";
import { userList } from "../api/userApi";
const MainScreen = () => {
  const [userId, setUserId] = useState(1);
  const [users, setUsers] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const navRef = useRef();
  useEffect(() => {
    const getUserList = async () => {
      await userList().then((res) => setUsers(res));
    };
    getUserList();
  }, [users.length <= 0]);

  const handelUserId = (id) => {
    setUserId(id);
    if (navRef.current.hasAttribute("style")) {
      navRef.current.removeAttribute("style");
      setShowNav(true);
    }
  };
  const handelToggleNav = () => {
    if (showNav === true) {
      navRef.current.style.display = "flex";
      navRef.current.style.opacity = 1;
      navRef.current.style.visibility = "visible";
      navRef.current.style.transform = "translateX(0%)";
      setShowNav(false);
    } else {
      navRef.current.removeAttribute("style");
      setShowNav(true);
    }
  };
  return (
    <div className={styles.mainScreenDiv}>
      <div className={styles.navToggleBtn}>
        <button type="button" onClick={handelToggleNav}>
          <img src={menuBtn} alt="" />
        </button>
      </div>
      <div className={styles.leftSection} ref={navRef}>
        <h1 className={styles.listHeading}>users list</h1>
        <div className={styles.listContainer}>
          {users.length > 0 &&
            users.map(
              (item, index, next) =>
                next[index]?.id !== next[index - 1]?.id && (
                  <button
                    onClick={(e) => {
                      handelUserId(parseInt(item.id));
                    }}
                    key={index}
                    style={
                      parseInt(item.id) === userId
                        ? { background: "#d4d4d4" }
                        : { background: "#ececec" }
                    }
                  >
                    {item.profile.firstName + " " + item.profile.lastName}
                  </button>
                )
            )}
        </div>
      </div>
      <div>
        <UserDetailsScreen user={userId} />
      </div>
    </div>
  );
};

export default MainScreen;
