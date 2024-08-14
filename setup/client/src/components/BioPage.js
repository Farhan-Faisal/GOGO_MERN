import React, { useEffect } from "react";
import Axios from "axios";

import { useState } from "react";

import configData from "../config.json";

//import "./BioPage.css";
import UserInterests from "./Interests";

import jwt_decode from "jwt-decode";

import UserBio from "./UserBio";
import EventItem from "../pages/UserItem";
import ProfilePicture from "./ProfilePicture";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";

import StatelessPopup from "../CommonItems/StatelessPopup"; // DEV-CGP-6


const BioPage = (props) => {

  // Set the interest master list
  const [interestList, setInterestList] = useState([
    "Music", "Visual Arts", "Performing Arts", 
    "Film", "Lectures", "Books", "Fashion", 
    "Food & Drink", "Festivals", "Charities", "Active Life", 
    "Nightlife", "Kids & Family", "Sports", "Other"
  ]);
  const [events, setEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [eventToggle, setEventToggle] = useState(false);

  // Get the user Email by decoding JWT
  var token = jwt_decode(localStorage.getItem("token"));
  var useremail = token.userDetail.email;
  var userId = token.id;
  const displayName = token.userDetail.username;

  /* DEV-CGP-6 */
  const age = token.userDetail.age;
  const gender = token.userDetail.gender;


  return (
    // <div clasName='BioPage'>
    <div className={styles.rightContainer}>
     
      <div className={styles.horizontalContent}>
        <ProfilePicture email={useremail} url={configData.SERVER_URL + "/user-details/image/"} />

        <div className={styles.verticalContent}>
          <div className={`${styles.boldtext} ${styles.alignleft}`}>
            {displayName}
          </div>
          <div className={`${styles.smalltext} ${styles.alignleft}`}>
            {age}, {gender}
          </div>
          <UserInterests interestList={interestList} useremail={useremail}/>

          <br />
        </div>
      </div>
      <UserBio useremail={useremail} url={configData.SERVER_URL + "/user-details/biography/"} />
      <div className={styles.line} />
    </div>
  );
};

export default BioPage;
