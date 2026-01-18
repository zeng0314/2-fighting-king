import React from 'react';
import { useThemeContext } from "@/contexts/themeContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const { isDark } = useThemeContext();
  
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300
                ${index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                    ? 'bg-blue-600 text-white scale-110'
                    : isDark
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                }`}
            >
              {index < currentStep ? <i className="fa-solid fa-check"></i> : index + 1}
            </div>
            
            {index < totalSteps - 1 && (
              <div className={`w-8 h-1 transition-all duration-300
                ${index < currentStep
                  ? 'bg-green-500'
                  : isDark
                    ? 'bg-gray-700'
                    : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// 保留原来的Empty组件
export function Empty() {
  return (
    <div className="flex h-full items-center justify-center" onClick={() => toast('Coming soon')}>Empty</div>
  );
}