import { useEffect, useState } from "react";
import RequestItemByMe from "./RequestItemByMe";

import Axios from "axios";
import axios from "axios";

import styles from "../styles/common_styles.module.css";
import jwtDecode from "jwt-decode";
import configData from "../config.json";

const RequestsByMe = ({userid}) => {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token);

    const [requests, setRequests] = useState([]);

    

    const [processed, setProcessed] = useState(true);
    const [processedMessage, setProcessedMessage] = useState("");

    const makeRequest = () => {
        axios.post(configData.SERVER_URL + "/requests/", {
            requester: userid,
            event: "XX",
        }).then(res => {
        setProcessed(true);
        setProcessedMessage(res.data.msg);
        });
    };

    useEffect(() => {
        Axios.get(configData.SERVER_URL + "/requests/by/" + token.id)
            .then(res => {
                setRequests(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
    <div  style={{display: "flex", alignItems: "left"}}>
        <div className={styles.wrapContainer} 
            style={{width: "300px", margin: "20px", textAlign: "right", position: "relative", right: "20px"}}>
            
            <input 
            type="text" id="chatInput" placeholder="Type your message here..." 
            style={{ width: "100%", padding: "10px", fontSize: "16px", 
                border: "1px solid #ccc", borderRadius: "5px",
            }}
            />
    
            <div style={{ width: "min-content", marginLeft: "auto", marginRight: "0px", }} >
                <button className={styles.smallPurpleButton} onClick={makeRequest} >
                    make a request
                </button>
            </div>
        </div>
        
        {requests.map(req => (
            <RequestItemByMe
                key={req._id}
                _id={req._id}
                requestee={req.requestee}
                event={req.event}
                status={req.status}
                setRequests={setRequests}
            />
        ))}{" "}
    </div>
    );
};

export default RequestsByMe;
