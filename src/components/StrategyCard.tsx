import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from "@/contexts/themeContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Strategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

interface StrategyCardProps {
  strategy: Strategy;
  index: number;
}

export function StrategyCard({ strategy, index }: StrategyCardProps) {
  const { isDark } = useThemeContext();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 为不同策略设置不同的颜色
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500'
  ];
  
  const colorIndex = index % colors.length;
  const cardColor = colors[colorIndex];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className={`p-4 ${cardColor} text-white flex justify-between items-center cursor-pointer`} onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="font-semibold">{strategy.title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </motion.div>
      </div>
      
      <div className="p-4">
        <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {strategy.description}
        </p>
        
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 mb-3">
            {strategy.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className={`mt-1 w-4 h-4 rounded-full ${cardColor} flex items-center justify-center text-white text-xs`}>
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>
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