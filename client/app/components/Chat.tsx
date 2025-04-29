'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputWithButton} from './ChatBar';
interface Message {
  sender: 'user' | 'rag';
  text: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
     //   const response = await fetch('http://localhost:8000/api/chat', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ question: input }),
    // });  
    
    // const data = await response.json();
    // console.log("response form b =============", data);
      const data = {
        answer: "Middleware is a functions that execute during the request-response cycle. Middleware can perform tasks such as logging, authentication, and error handling before sending the final response."
    };
    
      const ragMessage: Message = { sender: 'rag', text: data.answer };
      setMessages(prev => [...prev, ragMessage]); 
       
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = { sender: 'rag', text: 'Something went wrong. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] p-4 overflow-y-auto mt-6"> 
      <div className="flex flex-col gap-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.sender === 'rag' && <span className="mr-1">🤖</span>}
              {msg.text  }
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[70%] px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 italic animate-pulse">
              🤖 RAG App is typing...
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center gap-2 pb-0">
        <Input
          type="text"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={sendMessage}
        //   className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          className='cursor-pointer'
          disabled ={!messages}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
