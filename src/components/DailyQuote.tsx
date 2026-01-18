import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DailyQuoteProps {
  isDark: boolean;
}

export function DailyQuote({ isDark }: DailyQuoteProps) {
  const quotes = [
    "真正的沟通，是在理解对方的基础上表达自己。",
    "冷静是解决冲突的第一把钥匙。",
    "倾听比诉说更能赢得尊重。",
    "用事实代替情绪，用需求代替指责。",
    "沟通的目的不是说服，而是理解与被理解。"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb text-yellow-500"></i>
          今日沟通金句
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={nextQuote}
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-4"
      >
        <p className={`text-xl italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          "{quotes[currentIndex]}"
        </p>
      </motion.div>
    </motion.div>
  );
}

// 保留原来的Empty组件
export function Empty() {
  return (
    <div className="flex h-full items-center justify-center" onClick={() => toast('Coming soon')}>Empty</div>
  );
}