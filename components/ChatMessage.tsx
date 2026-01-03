
import React from 'react';
import { type ChatMessage as ChatMessageType } from '../types';
import DOMPurify from 'dompurify';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-3 rounded-lg max-w-[80%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700'}`}>
        {message.isError ? (
          <span className="text-red-500">{message.content}</span>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
