import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import RequestItemForMe from "./RequestItemForMe";

import configData from "../config.json";
import axios from "axios";
import styles from "../styles/common_styles.module.css";


const RequestsForMe = (userid) => {
  const token = jwtDecode(localStorage.getItem("token"));
  const [forMeRequests, setForMeRequests] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  console.log(token);

  useEffect(() => {
    axios.get(configData.SERVER_URL + "/api/myevent/" + token.id)
      .then((res) => {
        setMyEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  return (
    <div className={styles.wrapContainer} >
      {myEvents.map((event) => (
        <RequestItemForMe
          event={event}
        />
      ))}{" "}
    </div>
  );
};

export default RequestsForMe;
