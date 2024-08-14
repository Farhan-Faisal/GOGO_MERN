import React, { useEffect, useState } from "react";
import RequestItemByMe from "./RequestItemByMe";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import axios from "axios";

import styles from "../../styles/common_styles.module.css";
import jwtDecode from "jwt-decode";
import configData from "../../config.json";

const RequestsByMe = () => {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token);

    const [myRequests, setMyRequests] = useState([]);

    const [queryUserFound, setQueryUserFound] = useState(false);
    const [queryUserEmail, setQueryUserEmail] = useState("");

    const [processed, setProcessed] = useState(false);
    const [processedMessage, setProcessedMessage] = useState("");

    const makeRequest = (requestee) => {
        alert(jwt_decode(localStorage.getItem("token")).id + " " + requestee);
        axios.post(configData.SERVER_URL + "/requests/", {
            requester: jwt_decode(localStorage.getItem("token")).id,
            requestee: requestee,
        }).then(res => {
        
        setProcessed(true);
        setProcessedMessage(res.data.msg);
        });
    };

    const queryUser = (queryEmail) => {
        axios.get(configData.SERVER_URL + "/user-details/image/" + queryEmail)
            .then((res) => {
                makeRequest(res.data._id)
            })
            .catch((err) => console.log(err));
    }
    
    useEffect(() => {
        Axios.get(configData.SERVER_URL + "/requests/by/" + token.id)
            .then(res => {
                setMyRequests(res.data);
                setProcessed(false);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [processed]);

    
    return (
    <div className={styles.wrapContainer} 
        style={{width: "300px", margin: "20px", textAlign: "right", position: "relative", right: "20px"}}>
        {/* <div  style={{display: "flex", alignItems: "left", marginLeft: "auto", marginRight: "0px"}}> */}
            <input 
                type="text" id="chatInput" placeholder="Type your message here..." 
                style={{ margin: "10px", width: "100%", padding: "10px", fontSize: "16px", }}
                onChange={(event) => setQueryUserEmail(event.target.value)}
            />
    
            <button className={styles.smallPurpleButton} onClick={(event) => queryUser(queryUserEmail)} >
                make a request
            </button>
        {/* </div> */}
        
        {myRequests.map(req => (
            // console.log(req)
            <RequestItemByMe
                key={req._id}
                _id={req._id}
                requestee={req.requestee}
                requester={req.requester}
                status={req.status}
                setMyRequests={setMyRequests}
            />
        ))}{" "}
    </div>
    );
};

export default RequestsByMe;
