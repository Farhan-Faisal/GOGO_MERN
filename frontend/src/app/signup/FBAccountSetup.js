'use client'; // Required in Next.js App Router

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../styles/common_styles.module.css';
import configData from '../../config.json';

import { EventTags } from '../EventsTags';
import Axios from 'axios';

export default function FBAccountSetup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query params from URL
  const email = searchParams.get('facebookEmail');
  const username = searchParams.get('facebookUsername');

  const [Email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('');
  const [userInterests, setUserInterests] = useState(['Other']);
  const [popupTrigger, setPopupTrigger] = useState(false);

  // Populate email/username once router is ready
  useEffect(() => {
    if (email && username) {
      setEmail(email);
      setUserName(decodeURIComponent(username.replace(/\+/g, ' ')));
    }
  }, [email, username]);

  const checkAndSetAge = (val) => {
    const intVal = parseInt(val);
    setAge(isNaN(intVal) ? 18 : intVal);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    localStorage.setItem('tags', JSON.stringify([]));

    try {
      await Axios.post(`${configData.SERVER_URL}/login/facebook/first-time`, {
        email: Email,
        username: userName,
        age: age,
        gender: gender,
      });

      await Axios.post(`${configData.SERVER_URL}/api/userInterests/`, {
        email: Email,
        interestList: userInterests,
      });

      router.push(`/requests?facebookEmail=${Email}`);
    } catch (err) {
      console.error('Submission error:', err);
    }
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
            onChange={(e) => checkAndSetAge(e.target.value)}
          />
        </div>

        <div className={styles.division}>
          <label className={styles.text}>Gender: </label>
          <select
            name="gender"
            className={styles.inputField}
            value={gender}
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
}
