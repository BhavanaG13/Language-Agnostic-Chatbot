
import React, { useState, useRef, useEffect } from 'react';
import { Message, Role } from '../types';
import { getChatResponseStream } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import WelcomeScreen from './WelcomeScreen';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      role: Role.USER,
      text,
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const modelMessagePlaceholder: Message = {
      role: Role.MODEL,
      text: '',
      id: modelMessageId,
    };
    setMessages((prev) => [...prev, modelMessagePlaceholder]);

    try {
      const stream = await getChatResponseStream(text);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === modelMessageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error streaming response:', error);
      const errorMessage: Message = {
        role: Role.MODEL,
        text: 'Sorry, I encountered an error. Please check your API key and try again.',
        id: modelMessageId,
      };
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === modelMessageId ? errorMessage : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <WelcomeScreen onExampleClick={handleSendMessage} />
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
