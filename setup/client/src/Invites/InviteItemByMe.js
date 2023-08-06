import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";

import axios from "axios";

import EventItem from "../pages/EventItem";

const InviteItemByMe = ({ _id, event, invitee, status, setInvite }) => {
    //TODO: DELETE REQUEST to delete the request
    const deleteInvite = () => {
        axios
            .delete("http://localhost:5000/promoter-invites/delete/" + _id)
            .then(res => {
                setInvite(prev => prev.filter(r => r._id !== _id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={requestStyles.request}>
            <EventItem event={event} disableRequest={true} />
            <div className={styles.smalltext}>To {invitee.username}</div>
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
                    onClick={deleteInvite}
                >
                    Cancel Invite
                </button>
            </div>
        </div>
    );
};

export default InviteItemByMe;
