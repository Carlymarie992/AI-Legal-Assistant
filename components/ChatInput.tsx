
import React from 'react';

const ChatInput: React.FC<any> = ({ onSendMessage }) => (
  <button onClick={() => onSendMessage("test")}>Send</button>
);
export default ChatInput;
