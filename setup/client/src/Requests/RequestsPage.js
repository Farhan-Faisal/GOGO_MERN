import RequestsByMe from "./RequestsByMe";
import RequestsForMe from "./RequestsForMe";

import styles from "../styles/common_styles.module.css";
import { useState } from "react";
import configData from "../config.json";
const RequestsPage = () => {
    const [requestToggle, setRequestToggle] = useState(false);

    return (
        <div className={styles.rightContainer}>
            <div className={styles.squishHeading}>REQUESTS</div>
            <div className={styles.horizontalContent}>
                <div style={{ flex: "1" }}>
                    <button
                        className={styles.smallTransparentButton}
                        onClick={() => setRequestToggle(false)}
                        disabled={!requestToggle}
                    >
                        by me
                    </button>
                </div>

                <div style={{ flex: "1" }}>
                    <button
                        className={styles.smallTransparentButton}
                        onClick={() => setRequestToggle(true)}
                        disabled={requestToggle}
                    >
                        for me
                    </button>
                </div>
            </div>

            {requestToggle ? <RequestsForMe /> : <RequestsByMe />}
        </div>
    );
};

export default RequestsPage;
