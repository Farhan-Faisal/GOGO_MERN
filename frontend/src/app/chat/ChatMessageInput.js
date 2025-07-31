'use client';

import React from 'react';
import { 
    Box, 
    InputLabel, 
    OutlinedInput, 
    InputAdornment, 
    IconButton 
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

const ChatMessageInput = ({
  typing,
  message,
  sendChatHandler,
  handleInput,
  buddyUsername,
}) => {
  return (
    <Box component="form" onSubmit={sendChatHandler} sx={{ width: '100%' }}>
      {typing && (
        <InputLabel
          sx={{ color: 'white', textAlign: 'left' }}
          shrink
          htmlFor="message-input"
        >
          {buddyUsername} is typing...
        </InputLabel>
      )}

      <OutlinedInput
        sx={{ backgroundColor: 'white', color: 'black', width: '100%' }}
        id="message-input"
        placeholder="Write your message"
        value={message.text}
        onChange={handleInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit" aria-label="send message">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default ChatMessageInput;
