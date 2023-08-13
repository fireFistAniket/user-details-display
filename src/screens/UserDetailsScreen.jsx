import React, { useEffect, useState } from "react";
import demoimg from "../assets/michael1528125545.png";
import styles from "./styles/UserDetailsScreen.module.scss";
import { userDetails } from "../api/userApi";
import Loading from "../component/Loading";
const UserDetailsScreen = ({ user }) => {
  const [userDetail, setUserDetail] = useState({});
  const [imgOk, setImgOk] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      await userDetails(user).then(async (res) => {
        await checkImageURL(res.avatar).then((resp) => setImgOk(resp));
        setUserDetail(res);
      });
      setLoading(false);
    };
    getUserData();
  }, [user]);
  async function checkImageURL(url) {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  return (
    <div className={styles.userMainDiv}>
      <h1 className={styles.userDetailHeading}>users details</h1>
      {loading === false ? (
        <div>
          <div className={styles.avatarContainer}>
            {imgOk === true ? (
              <img src={userDetail.avatar} alt="" loading="lazy" />
            ) : (
              <img src={demoimg} alt="" loading="lazy" />
            )}
            <p>@{userDetail.profile?.username}</p>
          </div>
          <p className={styles.bioPara}>{userDetail.Bio}</p>
          <div className={styles.inputLabelContainer}>
            <label htmlFor="name">full name</label>
            <input
              type="text"
              id="name"
              disabled
              value={
                userDetail.profile?.firstName +
                " " +
                userDetail.profile?.lastName
              }
            />
          </div>
          <div className={styles.inputLabelContainer}>
            <label htmlFor="job">job title</label>
            <input type="text" id="job" disabled value={userDetail.jobTitle} />
          </div>
          <div className={styles.inputLabelContainer}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              disabled
              value={userDetail.profile?.email}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserDetailsScreen;
