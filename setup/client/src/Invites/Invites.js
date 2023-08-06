import React from "react";
import styles from "../styles/common_styles.module.css";
import { useState } from "react";
import InvitesForMe from "./InvitesForMe.js";
import InvitesByMe from "./InvitesByMe.js";
import configData from "../config.json";
const Invites = () => {
    const [invitesToggle, setInviteToggle] = useState(false);

    return (
        <div className={styles.rightContainer}>
            <div className={styles.squishHeading}>INVITES</div>
            <div className={styles.horizontalContent}>
                <div style={{ flex: "1" }}>
                    <button
                        className={styles.smallTransparentButton}
                        onClick={() => setInviteToggle(false)}
                        disabled={!invitesToggle}
                    >
                        by me
                    </button>
                </div>

                <div style={{ flex: "1" }}>
                    <button
                        className={styles.smallTransparentButton}
                        onClick={() => setInviteToggle(true)}
                        disabled={invitesToggle}
                    >
                        for me
                    </button>
                </div>

            </div>
            {invitesToggle ? <InvitesForMe /> : <InvitesByMe />}
        </div>
    );
};

export default Invites;