
import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white flex-shrink-0">
        U
    </div>
);

const BotIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
            <path d="M10 2a.75.75 0 0 1 .75.75v.25h.75a.75.75 0 0 1 0 1.5h-.75v.25a.75.75 0 0 1-1.5 0v-.25h-.75a.75.75 0 0 1 0-1.5h.75V2.75A.75.75 0 0 1 10 2Z" />
            <path fillRule="evenodd" d="M3.013 4.1a15.65 15.65 0 0 1 13.974 0 1.25 1.25 0 0 1 .962 1.235v7.405a1.25 1.25 0 0 1-.962 1.235 15.65 15.65 0 0 1-13.974 0A1.25 1.25 0 0 1 2.05 12.74V5.335a1.25 1.25 0 0 1 .962-1.235ZM6 8.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm7.5 0a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0V8.25Z" clipRule="evenodd" />
        </svg>
    </div>
);


const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
    </div>
);


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  
  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-slate-700 text-slate-200 rounded-bl-none';

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const contentOrderClasses = isUser ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`flex items-start gap-3 ${containerClasses}`}>
      {isUser ? <UserIcon /> : <BotIcon />}
      <div className={`max-w-xl p-4 rounded-2xl shadow-md ${bubbleClasses}`}>
        {message.text ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
