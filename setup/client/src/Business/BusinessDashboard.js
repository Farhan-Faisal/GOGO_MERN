import React, { useEffect } from "react";
import Axios from "axios";

import { useState, useReducer } from "react";

import jwt_decode from "jwt-decode";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";
import jwtDecode from "jwt-decode";

import UserBio from "../components/UserBio";
import EventItem from "../pages/EventItem";
import UserInterests from "../components/Interests";
import ProfilePicture from "../components/ProfilePicture";
import { useNavigate } from "react-router";

const BusinessDashboard = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  const email = token.businessDetail.email;
  const businessName = token.businessDetail.businessName;

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const interestList = [
    "Hockey",
    "Gaming",
    "Coding",
    "Yoga",
    "Movies",
    "Burger",
    "Books",
  ];

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userevents/" + token.id).then(
      response => {
        setEvents(response.data);
        console.log(response.data);
      }
    );
  }, []);

  return (
    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <ProfilePicture email={email} url={"http://localhost:5000/business/image/"} />
        <div className={styles.verticalContent}>
          <div className={`${styles.boldtext} ${styles.alignleft}`}>
            {businessName}
          </div>
          <div style={{height: "min-content"}}>
            <UserInterests interestList={interestList} useremail={email}/>
          </div>
        </div>
      </div>
      <UserBio useremail={email} url="http://localhost:5000/business/biography/" />
      <div className={styles.line} />
      <div
        style={{ marginLeft: "auto", marginRight: "0px", width: "min-content" }}
      >
        <button
          className={styles.smallPurpleButton}
          onClick={() => navigate("/create-events")}
        >
          Create Events
        </button>
      </div>
      <div className={styles.wrapContainer}>
        {events &&
          events.map(event => (
            <div key={event._id} style={{ margin: "10px" }}>
              <EventItem event={event} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BusinessDashboard;
