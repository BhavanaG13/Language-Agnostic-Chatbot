
import React from 'react';

interface WelcomeScreenProps {
  onExampleClick: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
  const examplePrompts = [
    "¿Cuál es la capital de Honduras?",
    "Write a short poem about the moon in Japanese.",
    "Как сказать 'я люблю программирование' на английском?",
    "Explain the concept of quantum computing like I'm five.",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
      <div className="bg-cyan-500/10 rounded-full p-5 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-cyan-400">
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408s4.262.139 6.337.408c.102.013.206.025.309.038v.002c.817.093 1.62.248 2.38.465a2.087 2.087 0 0 1 1.402 2.035v11.755a2.087 2.087 0 0 1-1.402 2.035c-.76.217-1.563.372-2.38.465a16.891 16.891 0 0 1-.309.038c-2.075.27-4.19.408-6.337.408s-4.262-.139-6.337-.408a16.89 16.89 0 0 1-.309-.038c-.817-.093-1.62-.248-2.38-.465A2.087 2.087 0 0 1 .5 17.165V5.41A2.087 2.087 0 0 1 1.902 3.375c.76-.217 1.563-.372 2.38-.465a16.89 16.89 0 0 1 .309-.038Z" />
          <path d="M12 8.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 12 8.25Z" />
          <path d="M12.75 15a.75.75 0 0 0-1.5 0v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008Z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-slate-200 mb-2">Welcome to Polyglot Pal!</h2>
      <p className="max-w-md mb-8">
        Your language-agnostic AI assistant. Start a conversation in any language.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {examplePrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(prompt)}
            className="bg-slate-800 p-4 rounded-lg text-left hover:bg-slate-700 transition-colors duration-200 text-slate-300"
          >
            <p>{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
