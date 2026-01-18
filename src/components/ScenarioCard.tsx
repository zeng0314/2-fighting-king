import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Scenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  textColor: string;
  tag?: string;
}

interface ScenarioCardProps {
  scenario: Scenario;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

export function ScenarioCard({ scenario, isExpanded, onToggle, index }: ScenarioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800`}
      whileHover={{ y: -5 }}
      onClick={onToggle}
    >
      <div className={`p-6 ${scenario.color}`}>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-4xl mb-2 block">{scenario.icon}</span>
            <h3 className={`text-xl font-bold mb-1 ${scenario.textColor}`}>{scenario.title}</h3>
            {scenario.tag && (
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-white bg-opacity-30 text-white">
                {scenario.tag}
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <i className={`fa-solid fa-chevron-down ${scenario.textColor}`}></i>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{scenario.description}</p>
          <Link 
            to={`/scenario/${scenario.id}`}
            className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // 防止触发卡片的onToggle事件
            }}
          >
            开始应对
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 保留原来的Empty组件
export function Empty() {
  return (
    <div className={cn("flex h-full items-center justify-center")} onClick={() => toast('Coming soon')}>Empty</div>
  );
}