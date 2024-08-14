import requestStyles from "../../styles/requests.module.css";
import styles from "../../styles/common_styles.module.css";
import React, { useEffect, useState, useReducer } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

import UserItem from "../../components/User/UserItem";
import configData from "../../config.json";

const RequestItemForMe = ({ _id, username, image, requestee, requester, status, setMyRequests }) => {
  const token = localStorage.getItem("token");
  const requesteeID = jwt_decode(token).id;
  const [requestData, setRequestData] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  
  //TODO: DELETE REQUEST to delete the request
    const deleteRequest = () => {
        axios
            .delete(configData.SERVER_URL + "/requests/delete/" + _id)
            .then(res => {
                setMyRequests(prev => prev.filter(r => r._id !== _id));
            })
            .catch(err => console.log(err));
    };

    

    async function fetchRequest() {
      try {
        const res = await axios.get( configData.SERVER_URL + "/requests/for/" + requesteeID);
        return res.data;
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
      fetchRequest().then((data) => {
        setRequestData(data);
        console.log(requestData);
      });
    }, []);

    const rejectRequest = (reqId) => {
      try {
        console.log(reqId);
        const reqIndex = requestData.findIndex(({ _id }) => _id === reqId);
  
        axios.patch(configData.SERVER_URL + "/requests/reject/" + _id);
  
        if (reqIndex !== -1) {
          setRequestData([
            ...requestData.slice(0, reqIndex),
            ...requestData.slice(reqIndex + 1),
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    };
      

    const acceptRequest = (reqId) => {
      try {
        // Get username and password
        const token = localStorage.getItem("token");
        const useremail = jwt_decode(token).userDetail.email;
        const username = jwt_decode(token).userDetail.username;
        const reqIndex = requestData.findIndex(({ _id }) => _id === reqId);


  
        // Post the chat room
        var participants = [requestee.email, requester.email];
        participants.sort(function (a, b) {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
      
        axios.post(configData.SERVER_URL + "/api/chats/", {
          participants: [useremail, requester.email],
          participantsUsernames: [username, requester.username],
          chatHistory: [],
          roomID: participants[0] + participants[1],
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      

        axios.patch(configData.SERVER_URL + "/requests/accept/" + reqId);
      
        if (reqIndex !== -1) {
          alert("Accepted Request from " + requester.username);
          setMyRequests([
            ...requestData.slice(0, reqIndex),
            ...requestData.slice(reqIndex + 1),
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    };


    return (
        <div className={requestStyles.request} style={{display: "flex", alignItems: "left", marginLeft: "auto", marginRight: "0px"}}>
            <UserItem user={requester} disableRequest={true} />
            <div className={styles.horizontalContent}>
                <div
                    style={{
                        marginTop: "10px",
                        marginLeft: "5px",
                        marginRight: "auto",
                    }}
                >
                    <div className={styles.smalltext}>
                        <div style={{ fontWeight: 700 }}>{status}</div>
                    </div>
                </div>
                <button
                    className={styles.smallPurpleButton}
                    onClick={deleteRequest}
                >
                    Reject Request
                </button>

                <button
                    className={styles.smallPurpleButton}
                    onClick={(event) => acceptRequest(_id)}
                >
                    Accept Request
                </button>
            </div>
        </div>
    );
};

export default RequestItemForMe;