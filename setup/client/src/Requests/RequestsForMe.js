import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import RequestItemForMe from "./RequestItemForMe";

import configData from "../config.json";
import axios from "axios";
import styles from "../styles/common_styles.module.css";


const RequestsForMe = ({_id, username, image, status, setRequests}) => {
  const token = jwtDecode(localStorage.getItem("token"));
  const [forMeRequests, setForMeRequests] = useState([]);
  const [myUsers, setMyusers] = useState([]);

  console.log(token);

  useEffect(() => {
    axios.get(configData.SERVER_URL + "/api/myevent/" + token.id)
      .then((res) => {
        setMyusers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  return (
    <div className={styles.wrapContainer} >
      {myUsers.map((event) => (
        <RequestItemForMe username={username} image={image} disableRequest={true} />
      ))}{" "}
    </div>
  );
};

export default RequestsForMe;
