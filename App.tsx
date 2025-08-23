
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { type Chat } from '@google/genai';
import { type ChatMessage as ChatMessageType } from './types';
import { SYSTEM_INSTRUCTION } from './constants';
import { startChat } from './services/geminiService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Disclaimer from './components/Disclaimer';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatRef.current = startChat(SYSTEM_INSTRUCTION);
      setMessages([
        {
          id: 'init',
          sender: 'assistant',
          content: 'Welcome to the East Central Judicial District AI Legal Assistant. How can I assist you today? Please note that all information provided requires verification by a licensed legal professional.',
        },
      ]);
    } catch (e) {
      console.error(e);
      setError('Failed to initialize the AI assistant. Please check your API key and refresh the page.');
    }
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (isLoading || !text.trim() || !chatRef.current) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Add a placeholder for the assistant's response
    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      { id: assistantMessageId, sender: 'assistant', content: '' },
    ]);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: text });
      
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId ? { ...msg, content: fullResponse } : msg
          )
        );
      }
    } catch (e: unknown) {
      console.error('Error sending message:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: `Sorry, I encountered an error. ${errorMessage}`, isError: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main ref={chatWindowRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg text-sm">{error}</div>}
        </main>
        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <Disclaimer />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </footer>
      </div>
    </div>
  );
};

export default App;
