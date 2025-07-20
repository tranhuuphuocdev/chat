'use client';

import { useState, useRef, useEffect } from 'react';
import { getSocket } from '@/lib/socket';
interface SendMessage {
  senderId: string;
  message: string;
}
export default function ChannelPage() {
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<SendMessage[]>([]);
  const socket = getSocket();
  useEffect(() => {
    socket.on('chat-message', (data: SendMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('chat-message');
    };
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '' || !socket.id) return;
    const data: SendMessage = {
      senderId: socket.id,
      message: input.trim()
    }
    socket.emit('chat-message', data);
    setMessages((prev) => [...prev, data]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen flex text-sm bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Kênh chat</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-200 px-3 py-2 rounded cursor-pointer"># general</li>
          <li className="hover:bg-gray-200 px-3 py-2 rounded cursor-pointer"># team</li>
          <li className="hover:bg-gray-200 px-3 py-2 rounded cursor-pointer"># support</li>
        </ul>
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b">
          <h3 className="text-lg font-semibold"># general</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.senderId === socket.id
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Gửi
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
