'use client';

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import chatRoomStyle from './ChatRoom.module.css';
import configData from '../../../config.json';

const ChatRoomList = ({ userEmail, roomID, setRoomID, getChatHistory, setBuddyUsername }) => {
  const [userRoomDocs, setUserRoomDocs] = useState([]);

  // Fetch user's chat rooms on mount
  useEffect(() => {
    Axios.get(`${configData.SERVER_URL}/api/chats/${userEmail}`)
      .then((res) => setUserRoomDocs(res.data))
      .catch(() => console.error('Error retrieving user chat rooms'));
  }, [userEmail]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userName = token ? jwt_decode(token)?.userDetail?.username : '';

  const roomClickHandler = (roomID, buddyUsername) => {
    getChatHistory(roomID);
    setRoomID(roomID);
    setBuddyUsername(buddyUsername);
  };

  const userRoomDocsUI = userRoomDocs.map((roomDoc, index) => {
    const buddyUsername = roomDoc.participantsUsernames.find(
      (name) => name !== userName
    );

    const isSelected = roomID === roomDoc.roomID;

    return (
      <div
        key={index}
        className={
          isSelected
            ? chatRoomStyle.transparentRoomListItem
            : chatRoomStyle.purpleRoomListItem
        }
        onClick={() => roomClickHandler(roomDoc.roomID, buddyUsername)}
      >
        {buddyUsername}
      </div>
    );
  });

  return <div>{userRoomDocsUI}</div>;
};

export default ChatRoomList;
