import { useEffect, useState } from "react";
import RequestItemByMe from "./RequestItemByMe";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import jwtDecode from "jwt-decode";

const RequestsByMe = () => {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/requests/by/" + token.id)
            .then(res => {
                setRequests(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.wrapContainer}>
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
