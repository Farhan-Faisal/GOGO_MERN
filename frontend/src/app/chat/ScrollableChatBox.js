'use client';

import React, { useEffect, useRef } from 'react';
import chatRoomStyle from './ChatRoom.module.css';

const ScrollableChatBox = ({ chat, userEmail }) => {
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);

  // Scroll to bottom on mount
  useEffect(() => {
    scrollToBottom(false);
  }, []);

  // Scroll to bottom when chat updates
  useEffect(() => {
    scrollToBottom(true);
  }, [chat]);

  const scrollToBottom = (smooth = false) => {
    if (!outerDiv.current || !innerDiv.current) return;

    const outerHeight = outerDiv.current.clientHeight;
    const innerHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerHeight - outerHeight,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  return (
    <div
      ref={outerDiv}
      style={{ position: 'relative', height: '100%', overflowY: 'auto' }}
    >
      <div ref={innerDiv} style={{ position: 'relative' }}>
        {chat.map((message, index) => (
          <MessageContainer
            key={index}
            message={message.text}
            position={message.senderEmail === userEmail ? 'right' : 'left'}
          />
        ))}
      </div>
    </div>
  );
};

const MessageContainer = ({ message, position }) => {
  return (
    <div className={chatRoomStyle.messageRow}>
      <div
        className={chatRoomStyle.message}
        style={{ float: position, clear: 'both' }}
      >
        {message}
      </div>
    </div>
  );
};

export default ScrollableChatBox;
