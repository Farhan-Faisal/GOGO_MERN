import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";

import axios from "axios";

import EventItem from "../pages/EventItem";
import configData from "../config.json";
const RequestItemByMe = ({ _id, event, status, setRequests }) => {
    //TODO: DELETE REQUEST to delete the request
    const deleteRequest = () => {
        axios
            .delete(configData.SERVER_URL + "/requests/delete/" + _id)
            .then(res => {
                setRequests(prev => prev.filter(r => r._id !== _id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={requestStyles.request}>
            <EventItem event={event} disableRequest={true} />
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
                    Cancel Request
                </button>
            </div>
        </div>
    );
};

export default RequestItemByMe;
