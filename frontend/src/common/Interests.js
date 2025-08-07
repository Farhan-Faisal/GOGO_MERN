'use client';

import React from 'react';
import styles from '../styles/common_styles.module.css';
import ceStyles from './CreateEvents.module.css';
import StatelessPopup from './StatelessPopup';

const EventTagsPopup = ({ popupTrigger, setPopupTrigger, selectedTags, setSelectedTags, saveTags }) => {
  const tagsMasterlist = [
    'Music','Visual Arts','Performing Arts','Film','Lectures','Books','Fashion','Food & Drink',
    'Festivals','Charities','Active Life','Nightlife','Kids & Family','Sports','Other'
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(i => i !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const tagsMasterlistUI = tagsMasterlist.map((tag, i) => (
    <div
      key={i}
      className={selectedTags.includes(tag) ? styles.smallPurpleButton : styles.smallTransparentButton}
      onClick={() => toggleTag(tag)}
    >
      {tag}
    </div>
  ));

  const saveChanges = () => {
    if (saveTags) saveTags(selectedTags); // generalized reuse
    setPopupTrigger(false);
  };

  return (
    <StatelessPopup trigger={popupTrigger} setTrigger={setPopupTrigger}>
      <div style={{ width: '800px' }}>
        <div className={styles.wrapContainer}>{tagsMasterlistUI}</div>
      </div>
      <div style={{ marginRight: '10px', marginLeft: 'auto', width: 'fit-content' }}>
        <button className={styles.transparentButton} onClick={saveChanges}>
          Save Tags
        </button>
      </div>
    </StatelessPopup>
  );
};

const EventTags = ({ selectedTags, setSelectedTags, popupTrigger, setPopupTrigger, saveTags }) => {
  const eventTagsUI = selectedTags.map((tag, i) => (
    <div className={styles.smallPurpleButton} key={i}>
      {tag}
    </div>
  ));

  return (
    <>
      <div className={ceStyles.eventTagsContainer}>
        <button
          type="button"
          className={styles.smallPurpleButton}
          onClick={() => setPopupTrigger(true)}
          aria-label="Edit tags"
          title="Edit tags"
        >
          {'\u270E'}
        </button>
        {eventTagsUI}
      </div>

      <EventTagsPopup
        popupTrigger={popupTrigger}
        setPopupTrigger={setPopupTrigger}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        saveTags={saveTags}
      />
    </>
  );
};

export { EventTags, EventTagsPopup };
