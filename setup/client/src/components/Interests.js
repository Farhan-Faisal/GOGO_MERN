import React from "react";

import configData from "../config.json";

import { useState } from "react";
import { useEffect } from "react";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";

import StatelessPopup from "../CommonItems/StatelessPopup";

const InterestPopUp = ({
  interestList,
  userInterestList,
  setUserInterestList,
  useremail,
  popupTrigger,
  setPopupTrigger,
}) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    setSelectedInterests(userInterestList);
  }, [popupTrigger]);

  const toggleInterest = interest => {
    // function to add/remove interests form userInterestList
    console.log(`toggling ${interest}`);
    if (selectedInterests.includes(interest) === true) {
      setSelectedInterests(prevList => prevList.filter(i => i !== interest));
    } else {
      setSelectedInterests(prevList => [...prevList, interest]);
    }
  };

  async function interestPopupCloseHandler() {
    // function to handle closing of popup
    setPopupTrigger(false);

    setUserInterestList(selectedInterests);

    await Axios.delete(
      configData.SERVER_URL + "/api/userInterests/" + useremail
    ).then(response => {
      console.log({ msg: "User Interest document deleted!", response });
    });

    await Axios.post(configData.SERVER_URL + "/api/userInterests/", {
      email: useremail,
      interestList: selectedInterests,
    }).then(res => {
      setUserInterestList(res.data.interestList);
      setSelectedInterests(res.data.interestList);
    });
  }

  const globalInterestListUI = interestList.map(
    (interestItem, interestIndex) => (
      <div
        className={
          selectedInterests.includes(interestItem) === true
            ? styles.smallPurpleButton
            : styles.smallTransparentButton
        }
        onClick={() => toggleInterest(interestItem)}
        key={interestIndex}
      >
        {interestItem}
      </div>
    )
  );

  return (
    <StatelessPopup trigger={popupTrigger} setTrigger={setPopupTrigger}>
      <div className={styles.wrapContainer}>{globalInterestListUI}</div>
      <div
        style={{
          marginRight: "10px",
          marginLeft: "auto",
          width: "fit-content",
        }}
      >
        <button
          className={`${styles.transparentButton}`}
          onClick={event => {
            interestPopupCloseHandler();
          }}
        >
          Save changes
        </button>
      </div>
    </StatelessPopup>
  );
};

const UserInterests = ({ interestList, useremail }) => {
  // Get the user's interests from MongoDB
  // Limit to a maximum of 5 interests
  const [userInterestList, setUserInterestList] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);

  useEffect(() => {
    console.log({ useremail, interestList });
    Axios.get(configData.SERVER_URL + "/api/userInterests/" + useremail)
      .then(response => {
        // console.log("kikos");
        console.log(response);
        if (response.length === 0) {
          setUserInterestList([]);
        } else {
          setUserInterestList(response.data[0].interestList);
        }
      })
      .catch(error => {
        setUserInterestList([]);
      });
  }, []);

  const userinterestListUI = userInterestList.map(
    (interestItem, interestIndex) => {
      return (
        <div className={styles.smallPurpleButton} key={interestIndex}>
          {interestItem}
        </div>
      );
    }
  );

  return (
    <div className={styles.horizontalContent}>
      {userinterestListUI}

      <InterestPopUp
        interestList={interestList}
        userInterestList={userInterestList}
        setUserInterestList={setUserInterestList}
        useremail={useremail}
        popupTrigger={popupTrigger}
        setPopupTrigger={setPopupTrigger}
      ></InterestPopUp>

      <div
        className={styles.smallPurpleButton}
        onClick={() => setPopupTrigger(true)}
      >
        {'\u270E'}
      </div>
    </div>
  );
};

export default UserInterests;