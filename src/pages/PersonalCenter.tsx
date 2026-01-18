import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/contexts/themeContext';

// 模拟历史记录数据
const mockHistory = [
  {
    id: '1',
    title: '职场冲突 - 同事拖延工作',
    date: '2026-01-15',
    scenarioType: 'work',
    summary: '分析了同事拖延工作的情况，生成了"非暴力沟通法"的应对策略和话术'
  },
  {
    id: '2',
    title: '家庭与亲友 - 催婚压力',
    date: '2026-01-10',
    scenarioType: 'family',
    summary: '针对家人催婚的情况，提供了温和而坚定的回应方式和情绪管理建议'
  },
  {
    id: '3',
    title: '消费纠纷 - 商品质量问题',
    date: '2026-01-05',
    scenarioType: 'consumer',
    summary: '分析了商品质量问题的维权策略，提供了法律依据和沟通话术'
  }
];

// 模拟收藏内容数据
const mockFavorites = [
  {
    id: '1',
    title: '非暴力沟通法',
    type: 'strategy',
    source: '策略库',
    description: '通过观察事实、表达感受、提出需求和请求来进行有效沟通的方法'
  },
  {
    id: '2',
    title: '冷静有力的职场拒绝话术',
    type: 'script',
    source: '话术库',
    description: '"我理解这个任务的重要性，但我目前正在处理[其他任务]，时间和精力有限..."'
  },
  {
    id: '3',
    title: '深呼吸放松法',
    type: 'emotion',
    source: '情绪管理',
    description: '简单有效的情绪调节方法，可以快速缓解紧张和焦虑'
  }
];

// 模拟情绪日记数据
const mockEmotionDiary = [
  {
    id: '1',
    date: '2026-01-15',
    emotion: '😤 愤怒',
    event: '同事再次拖延工作，影响了整个项目进度',
    reflection: '我意识到自己需要更好地控制情绪，采用更有效的沟通方式'
  },
  {
    id: '2',
    date: '2026-01-10',
    emotion: '😔 无奈',
    event: '家人又开始催婚，虽然理解他们的关心，但还是感到压力',
    reflection: '我需要更坦诚地和家人沟通我的想法和计划'
  }
];

export default function PersonalCenter() {
  const navigate = useNavigate();
  const { isDark } = useThemeContext();
  const [activeTab, setActiveTab] = useState('history');
  
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
            <span className="text-xl font-bold">个人中心</span>
          </div>
          
          <button 
            className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 用户信息卡片 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md flex items-center gap-6`}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-3xl">
              <i className="fa-solid fa-user text-white"></i>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">沟通达人</h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>已使用吵架大王 30 天</p>
              
              <div className="flex gap-4 mt-3">
                <div className="text-center">
                  <p className="text-lg font-bold">5</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>已解决冲突</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">3</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>收藏策略</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">2</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>情绪记录</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
         {/* 标签页导航 */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('history')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              历史记录
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'favorites'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              收藏夹
            </button>
            <button
              onClick={() => setActiveTab('emotionDiary')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'emotionDiary'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              情绪日记
            </button>
            <button
              onClick={() => {
                navigate('/about');
              }}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${isDark
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              关于应用
            </button>
          </div>
        </div>
        
        {/* 内容区域 */}
        <motion.section 
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {activeTab === 'history' && mockHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-lg transition-all`}
            >
              <div 
                className={`p-5 cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} flex justify-between items-center`}
                onClick={() => {
                  // 这里可以导航到相应的策略分析页面，并带上历史数据
                  navigate('/strategy');
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>{item.date}</p>
                  <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.summary}
                  </p>
                </div>
                <div>
                  <button className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {activeTab === 'favorites' && mockFavorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-lg transition-all`}
            >
              <div className={`p-5 ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} flex justify-between items-center`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className={`text-xs py-0.5 px-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      {item.source}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <i className="fa-solid fa-bookmark text-yellow-500"></i>
                  </button>
                  <button className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {activeTab === 'emotionDiary' && (
            <>
              {mockEmotionDiary.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} hover:shadow-lg transition-all`}
                >
                  <div className={`p-5 ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">{item.emotion}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">事件描述：</p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.event}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">反思与成长：</p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.reflection}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: mockEmotionDiary.length * 0.1 }}
                className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'} cursor-pointer hover:shadow-lg transition-all`}
                onClick={() => {
                  // 这里可以打开新建情绪日记的表单
                  console.log('新建情绪日记');
                }}
              >
                <div className="p-5 flex flex-col items-center justify-center py-8">
                  <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mb-3`}>
                    <i className="fa-solid fa-plus text-blue-500"></i>
                  </div>
                  <p className="text-lg font-medium">记录新的情绪</p>
                </div>
              </motion.div>
            </>
          )}
        </motion.section>
      </main>
    </div>
  );
}