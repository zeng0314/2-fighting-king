import React from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  onClick: () => void;
}

export function EmergencyButton({ onClick }: EmergencyButtonProps) {
  return (
    <motion.button
      className="fixed right-6 bottom-6 z-50 w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <span className="text-2xl">🚨</span>
    </motion.button>
  );
}

// 保留原来的Empty组件
export function Empty() {
  return (
    <div className="flex h-full items-center justify-center" onClick={() => toast('Coming soon')}>Empty</div>
  );
}