'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import configData from "../../../config.json";
import { EventTags } from '../../common/Interests';
import styles from "../../styles/common_styles.module.css";

const AccountSetup = ({ accountSetupCallback, email, username, url, successfunc }) => {
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");
  const [userInterests, setUserInterests] = useState(["Other"]);
  const [popupTrigger, setPopupTrigger] = useState(false);

  const router = useRouter();

  const requestUrl = url ?? configData.SERVER_URL + "/user-details/";

  const checkAndSetAge = (val) => {
    const intVal = parseInt(val);
    setAge(isNaN(intVal) ? 18 : intVal);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(requestUrl, {
        email,
        username,
        age,
        gender,
      });

      if (successfunc) successfunc(res);
      router.push(accountSetupCallback);

      await axios.post(configData.SERVER_URL + "/api/userInterests/", {
        email,
        interestList: userInterests,
      });
    } catch (err) {
      console.error("Account setup error:", err);
    }
  };

  if (!username || !email || username === "" || email.trim() === "") {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>BRO GO BACK</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>ACCOUNT SETUP</h1>
      <div className={styles.division}>
        <p className={styles.text}>{username}</p>
        <p className={styles.text}>|</p>
        <p className={styles.text}>{email}</p>
      </div>

      <form className={styles.verticalContent} onSubmit={handleOnSubmit}>
        <div className={styles.division}>
          <label className={styles.text}>Age: </label>
          <input
            className={styles.inputField}
            name="Age"
            type="number"
            min={18}
            value={age}
            placeholder="1"
            onChange={(e) => checkAndSetAge(e.target.value)}
          />
        </div>

        <div className={styles.division}>
          <label className={styles.text}>Gender: </label>
          <select
            name="gender"
            className={styles.inputField}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Please select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="secret">Prefer not to say</option>
          </select>
        </div>

        <div className={styles.division}>
          <label className={styles.text}>Interests: </label>
          <EventTags
            popupTrigger={popupTrigger}
            setPopupTrigger={setPopupTrigger}
            selectedTags={userInterests}
            setSelectedTags={setUserInterests}
          />
        </div>

        <div className={styles.division}>
          <button type="submit" className={styles.purpleButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetup;
