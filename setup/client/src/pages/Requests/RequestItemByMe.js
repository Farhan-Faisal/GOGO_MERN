import requestStyles from "../../styles/requests.module.css";
import styles from "../../styles/common_styles.module.css";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { useEffect, useState } from "react";

import UserItem from "../../components/User/UserItem";
import configData from "../../config.json";

const RequestItemByMe = ({ _id, status, requester, requestee, setMyRequests }) => {
    //TODO: DELETE REQUEST to delete the request
    const deleteRequest = () => {
        axios
            .delete(configData.SERVER_URL + "/requests/delete/" + _id)
            .then(res => {
                setMyRequests(prev => prev.filter(r => r._id !== _id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={requestStyles.request}>
            <UserItem user={requestee} disableRequest={true} />
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
                    style={{ display: status === "pending" ? 'block' : 'none' }}
                >
                    Cancel Request
                </button>
            </div>
        </div>
    );
};

export default RequestItemByMe;
