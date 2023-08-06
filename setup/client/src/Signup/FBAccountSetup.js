import { useState } from "react";

import styles from "../styles/common_styles.module.css";

import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { EventTags } from '../pages/EventsTags'
import configData from "../config.json";
const FBAccountSetup = () => {
  // state for age and gender
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");
  const [Email, setEmail] = useState(window.location.href.split('?')[1].split("=")[1]); 
  const [userName, setuserName] = useState(window.location.href.split('?')[2].split("=")[1].split("#")[0].replace("%20", ' ').replace("%20", ' '));

  const [userInterests, setUserInterests] = useState(["Other"]); // DEV-CGP-19
  const [popupTrigger, setPopupTrigger] = useState(false); // DEV-CGP-19

  const navigate = useNavigate();

  // function to check age when a user enters it
  const checkAndSetAge = (val) => {
    let intVal = parseInt(val);
    if (intVal === NaN) setAge(18);
    else setAge(intVal);
  };

  // function to call post request when submit button is pressed
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    localStorage.setItem("tags", JSON.stringify([])); // DEV-CGP-19

    await Axios.post(configData.SERVER_URL + "/login/facebook/first-time", {
      email: Email,
      username: userName,
      age: age,
      gender: gender,
    }).then((res) => {
      console.log(res);
      navigate('/dashboard?facebookEmail=' + Email, {}); // DEV-CGP-6
    });

    await Axios.post(configData.SERVER_URL + "/api/userInterests/", {
      email: Email,
      interestList: userInterests,
    }).then(res => {
      console.log(res.data.interestList)
    });

  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>ACCOUNT SETUP</h1>
      <div className={styles.division}>
        <p className={styles.text}>{userName}</p>
        <p className={styles.text}>|</p>
        <p className={styles.text}>{Email}</p>
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

         {/*  DEV-CGP-19 // regInterests1@gmail.com */}
         <div className={styles.division}>
          <label className={styles.text}>Interests: </label>
          <EventTags
            popupTrigger={popupTrigger} setPopupTrigger={setPopupTrigger}
            selectedTags={userInterests} setSelectedTags={setUserInterests}
          />
        </div>

        <div className={styles.division}>
          <button type="submit" className={styles.purpleButton}>
            Submit
          </button>
        </div>
          
      </form>
    </div>
  )
};

export default FBAccountSetup;
