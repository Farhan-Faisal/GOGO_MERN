'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

import common_styles from '../../styles/common_styles.module.css';
import chatRoomStyle from './ChatRoom.module.css';

import ChatRoomList from './ChatRoomList';
import ChatMessageInput from './ChatMessageInput';
import ScrollableChatBox from './ScrollableChatBox';
import configData from '../../../config.json';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState({ text: '', senderEmail: '' });
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [buddyUsername, setBuddyUsername] = useState('');
  const [roomID, setRoomID] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userEmail = token ? jwt_decode(token).userDetail.email : '';

  // Connect to socket server
  useEffect(() => {
    const newSocket = io(configData.SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect(); // cleanup
  }, []);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    socket.emit('join-room', { roomID });

    socket.on('message-from-server', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('message-from-server');
    };
  }, [socket, roomID]);

  // Listen for typing indicators
  useEffect(() => {
    if (!socket) return;

    socket.on('typing-started-from-server', () => setTyping(true));
    socket.on('typing-ended-from-server', () => setTyping(false));

    return () => {
      socket.off('typing-started-from-server');
      socket.off('typing-ended-from-server');
    };
  }, [socket]);

  // Fetch chat history for room
  const getChatHistory = async (roomID) => {
    try {
      const res = await Axios.get(`${configData.SERVER_URL}/api/chats/usingRoomID/${roomID}`);
      setChat(res.data.chatHistory);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  // Handle sending message
  const sendChatHandler = async (e) => {
    e.preventDefault();
    if (!message.text.trim()) return;

    socket.emit('send-message', { message, roomID });
    socket.emit('end-typing', { roomID });
    setChat((prev) => [...prev, message]);

    try {
      await Axios.patch(`${configData.SERVER_URL}/api/chats/${roomID}`, {
        newMessage: message,
        currentChatHistory: chat,
      });
    } catch (err) {
      console.error('Failed to update chat:', err);
    }

    setMessage({ text: '', senderEmail: '' });
  };

  // Handle typing input
  const handleInput = (e) => {
    setMessage({ text: e.target.value, senderEmail: userEmail });
    socket.emit('start-typing', { roomID });

    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        socket.emit('end-typing', { roomID });
      }, 3000)
    );
  };

  return (
    <div className={common_styles.rightContainer}>
      <div className={common_styles.squishHeading}>CHATS</div>

      <div className={chatRoomStyle.twoColumnContainer}>
        <div className={chatRoomStyle.chatRoomListContainer}>
          <ChatRoomList
            roomID={roomID}
            setRoomID={setRoomID}
            userEmail={userEmail}
            getChatHistory={getChatHistory}
            setBuddyUsername={setBuddyUsername}
          />
        </div>

        {roomID && (
          <div className={chatRoomStyle.chatRoomContainer}>
            <div style={{ height: '400px', width: '100%', border: '2px solid white' }}>
              <ScrollableChatBox chat={chat} userEmail={userEmail} />
            </div>

            <ChatMessageInput
              typing={typing}
              message={message}
              sendChatHandler={sendChatHandler}
              handleInput={handleInput}
              buddyUsername={buddyUsername}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
