import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import RequestItemForMe from "./RequestItemForMe";

import configData from "../../config.json";
import axios from "axios";
import styles from "../../styles/common_styles.module.css";


const RequestsForMe = ({}) => {
  const token = jwtDecode(localStorage.getItem("token"));
  const [forMeRequests, setForMeRequests] = useState([]);

  console.log(token);

  useEffect(() => {
    axios.get(configData.SERVER_URL + "/requests/for/" + token.id)
        .then(res => {
          setForMeRequests(res.data);  
          console.log(res.data);
        })
        .catch(err => console.log(err));
  }, []);
  
  return (
    <div className={styles.wrapContainer} style={{ display: "flex", flexDirection: "column"}} >
      {forMeRequests.filter(req => req.status === 'pending').map((req) => (
            <RequestItemForMe
              key={req._id}
              _id={req._id}
              requestee={req.requestee}
              requester={req.requester}
              status={req.status}
              setMyRequests={setForMeRequests}
          />
      ))}
      {forMeRequests.filter(req => req.status !== 'pending').map((req) => (
            <RequestItemForMe
              key={req._id}
              _id={req._id}
              requestee={req.requestee}
              requester={req.requester}
              status={req.status}
              setMyRequests={setForMeRequests}
          />
      ))}
    </div>
  );
};

export default RequestsForMe;
