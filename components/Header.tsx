
import React from 'react';

const BotIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-cyan-400"
  >
    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408s4.262.139 6.337.408c.102.013.206.025.309.038v.002c.817.093 1.62.248 2.38.465a2.087 2.087 0 0 1 1.402 2.035v11.755a2.087 2.087 0 0 1-1.402 2.035c-.76.217-1.563.372-2.38.465a16.891 16.891 0 0 1-.309.038c-2.075.27-4.19.408-6.337.408s-4.262-.139-6.337-.408a16.89 16.89 0 0 1-.309-.038c-.817-.093-1.62-.248-2.38-.465A2.087 2.087 0 0 1 .5 17.165V5.41A2.087 2.087 0 0 1 1.902 3.375c.76-.217 1.563-.372 2.38-.465a16.89 16.89 0 0 1 .309-.038Z" />
    <path d="M12 8.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 12 8.25Z" />
    <path d="M12.75 15a.75.75 0 0 0-1.5 0v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008Z" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 shadow-lg z-10">
      <div className="container mx-auto flex items-center gap-4">
        <BotIcon />
        <h1 className="text-2xl font-bold tracking-tight text-slate-200">
          Polyglot Pal
        </h1>
      </div>
    </header>
  );
};

export default Header;
