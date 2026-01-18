import React from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface DialogMessageProps {
  message: Message;
  isDark: boolean;
}

export function DialogMessage({ message, isDark }: DialogMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-md`}>
        <div className={`p-3 rounded-xl ${isUser ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <p>{message.content}</p>
        </div>
        <p className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

// 保留原来的Empty组件
export function Empty() {
  return (
    <div className="flex h-full items-center justify-center" onClick={() => toast('Coming soon')}>Empty</div>
  );
}