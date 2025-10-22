
import React, { useState, useRef, useEffect } from 'react';
import { generateAiResponse } from '../services/geminiService';
import { ChatMessage, AiResponseData } from '../types';
import { UserIcon, SparklesIcon, VideoCameraIcon, QuestionMarkCircleIcon } from './icons/Icons';
import { marked } from 'marked';

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const initialGreeting: ChatMessage = {
      id: 'initial-greeting',
      role: 'model',
      content: "Hello! I'm ted.ai, your university assistant. How can I help you study today? You can ask me about complex topics, request summaries, or get help with exam preparation."
  };
  
  useEffect(() => {
    setMessages([initialGreeting]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await generateAiResponse(prompt);
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: aiResponse,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Sorry, I couldn't get a response. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string | AiResponseData) => {
    if (typeof content === 'string') {
      const htmlContent = marked.parse(content);
      return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent as string }} />;
    }

    const { answer, videos, quiz } = content;
    const htmlAnswer = marked.parse(answer);

    return (
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlAnswer as string }} />
        
        {videos && videos.length > 0 && (
          <div>
            <h4 className="flex items-center font-semibold text-lg mb-2 text-accent"><VideoCameraIcon /> <span className="ml-2">Related Videos</span></h4>
            <ul className="space-y-2 list-none p-0">
              {videos.map((video, index) => (
                <li key={index} className="bg-primary p-3 rounded-lg">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-light hover:text-accent transition-colors">
                    {video.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {quiz && (
          <div>
            <h4 className="flex items-center font-semibold text-lg mb-2 text-accent"><QuestionMarkCircleIcon /> <span className="ml-2">Check Your Understanding</span></h4>
            <div className="bg-primary p-4 rounded-lg">
              <p className="font-medium mb-3">{quiz.question}</p>
              <ul className="space-y-2 list-none p-0 mb-3">
                {quiz.options.map((option, index) => <li key={index} className="bg-secondary p-2 rounded">{option}</li>)}
              </ul>
              <details>
                <summary className="cursor-pointer text-accent font-semibold">Show Answer</summary>
                <p className="mt-2 p-2 bg-secondary rounded">{quiz.answer}</p>
              </details>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
       <h2 className="text-3xl font-bold text-light mb-6">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto pr-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <SparklesIcon />
              </div>
            )}
            <div className={`max-w-xl p-4 rounded-xl ${msg.role === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-secondary text-light rounded-bl-none'}`}>
              {renderMessageContent(msg.content)}
            </div>
             {msg.role === 'user' && (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <UserIcon />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <SparklesIcon />
            </div>
            <div className="max-w-xl p-4 rounded-xl bg-secondary text-light rounded-bl-none">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-light rounded-full animate-pulse"></div>
                 <div className="w-2 h-2 bg-light rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-2 h-2 bg-light rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
         {error && <div className="text-red-400 text-center">{error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex items-center bg-secondary rounded-lg p-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-light placeholder-muted px-4 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="bg-accent text-white px-6 py-2 rounded-md font-semibold disabled:bg-muted disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChat;
