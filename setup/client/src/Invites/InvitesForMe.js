import { useEffect, useState } from "react";
import InviteItemForMe from "./InviteItemForme";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import jwtDecode from "jwt-decode";

import configData from "../config.json";

const InvitesForMe = () => {
    const token = jwtDecode(localStorage.getItem("token"));
    console.log(token);

    const [invites, setInvites] = useState([]);

    useEffect(() => {
        Axios.get(configData.SERVER_URL + "/promoter-invites/to/" + token.id)
            .then(res => {
                setInvites(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.wrapContainer}>
            {invites.map(req => (
                <InviteItemForMe
                    key={req._id}
                    _id={req._id}
                    invitee={req.invitee}
                    promoter={req.promoter}
                    event={req.event}
                    status={req.status}
                    setInvite={setInvites}
                />
            ))}{" "}
        </div>
    );
};

export default InvitesForMe;