import React, { useState, useRef, useEffect } from 'react';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M3.105 3.105a1.5 1.5 0 0 1 1.944-.265l12.026 6.013a1.5 1.5 0 0 1 0 2.7l-12.026 6.013a1.5 1.5 0 0 1-1.944-2.435l3.82-3.821a.75.75 0 0 0 0-1.06l-3.82-3.822a1.5 1.5 0 0 1-.264-2.17Z" />
    </svg>
);

const MicrophoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
        <path d="M5.5 4.75a.75.75 0 0 0-1.5 0v.5A5.002 5.002 0 0 0 10 15.25a5 5 0 0 0 6-4.75v-.5a.75.75 0 0 0-1.5 0v.5a3.5 3.5 0 1 1-7 0v-.5Z" />
    </svg>
);


const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
         setText(prevText => prevText ? `${prevText.trim()} ${finalTranscript}`.trim() : finalTranscript);
      }
    };

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    }

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };

  }, []);


  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(e as unknown as React.FormEvent);
      }
  };

  const handleToggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      // Clear text before starting new recording unless user wants to append.
      // For this implementation, we will append.
      recognitionRef.current.start();
    }
  };

  // @ts-ignore
  const hasSpeechRecognition = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full max-w-4xl mx-auto bg-slate-800 rounded-full p-2 shadow-inner">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isRecording ? "Listening..." : "Ask me anything..."}
        rows={1}
        className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none resize-none px-4 py-2 max-h-40"
        disabled={isLoading}
      />
      {hasSpeechRecognition && (
          <button
            type="button"
            onClick={handleToggleRecording}
            disabled={isLoading}
            className={`flex-shrink-0 text-white rounded-full p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-500 focus:ring-red-500 animate-pulse' 
                : 'bg-slate-600 hover:bg-slate-500 focus:ring-indigo-500'
            } disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            <MicrophoneIcon />
          </button>
      )}
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="flex-shrink-0 bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        aria-label="Send message"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default InputBar;