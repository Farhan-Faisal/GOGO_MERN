import React from "react";

import styles from "../styles/common_styles.module.css";
import configData from "../config.json";
function Logout(){
    return(
        <div className={styles.rightContainer}>
            <h1 className={styles.heading}>LOGOUT</h1>
        </div>
    );
}

export default Logout;