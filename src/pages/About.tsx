import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/contexts/themeContext';

export default function About() {
  const navigate = useNavigate();
  const { isDark } = useThemeContext();
  
  return (
    <div className={`min-h-screen w-full flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* 头部导航 */}
      <header className={`sticky top-0 z-50 px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(-1)}
              className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <span className="text-xl font-bold">关于应用</span>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md mb-6`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-question-circle text-blue-500"></i>
              回复生成方式说明
            </h2>
            <p className="mb-4">
              感谢您对"吵架大王"应用的关注！关于您询问的回复生成方式，我可以为您详细说明：
            </p>
      <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} border ${isDark ? 'border-blue-800' : 'border-blue-200'} mb-4`}>
              <p className="text-blue-800 dark:text-blue-200">
                <i className="fa-solid fa-circle-info mr-2"></i>
                "吵架大王"应用中的回复内容通过<span className="font-bold">大语言模型实时生成</span>，能够根据用户输入的具体情况提供个性化的回应建议。
              </p>
            </div>
            <p className="mb-4">
              我们的开发团队精心设计了多种场景下的应对话术，涵盖了职场冲突、家庭纠纷、消费维权、公共场合和亲密关系等多个领域。这些话术都是基于心理学和沟通技巧的专业知识创作的，旨在帮助用户在各种冲突场景中能够有效地表达自己的观点和感受。
            </p>
            <p>
              每种场景下，我们都提供了多种风格的回应选择，包括坚定有力、礼貌得体、机智幽默、强势反击、阴阳怪气以及小红书风格等，用户可以根据自己的性格特点和具体情境选择最适合自己的回应方式。
            </p>
          </div>
          
           <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb text-yellow-500"></i>
              技术实现原理
            </h2>
            <p className="mb-4">
              应用的技术实现主要基于以下原理：
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>系统使用先进的大语言模型技术，根据用户输入的具体情境实时生成个性化回应</li>
              <li>模型会考虑场景类型、用户情绪、沟通目标和选择的回应语气等因素</li>
              <li>为了保证回复的多样性和质量，系统会生成多个不同角度的应对方案供用户选择</li>
              <li>模拟对话练习功能通过大语言模型实现实时交互，模拟真实的交流场景</li>
            </ul>
            <p>
              这种实现方式的优势在于能够提供高度个性化、情境化的回应，更好地满足用户的实际需求。系统会对生成的内容进行严格的筛选和过滤，确保提供的话术符合道德规范和法律法规要求。
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}