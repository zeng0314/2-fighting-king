import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { useThemeContext } from '@/contexts/themeContext';
  import { toast } from 'sonner';
  import { generateLLMResponse } from '@/lib/llmService';

  // 保留这个结构但不再直接使用，仅用于向后兼容
  const directResponses = {
    work: { argue: [], ease: [], boundary: [], solve: [], attack: [], sarcastic: [], xhsStyle: [] },
    family: { argue: [], ease: [], boundary: [], solve: [], attack: [], sarcastic: [], xhsStyle: [] },
    consumer: { argue: [], ease: [], boundary: [], solve: [], attack: [], sarcastic: [], xhsStyle: [] },
    public: { argue: [], ease: [], boundary: [], solve: [], attack: [], sarcastic: [], xhsStyle: [] },
    relationship: { argue: [], ease: [], boundary: [], solve: [], attack: [], sarcastic: [], xhsStyle: [] },
    emergency: { argue: [], ease: [], boundary: [], solve: [], attack: [], sarcastic: [], xhsStyle: [] },
    antiSelfJustification: { attack: [], sarcastic: [], boundary: [], witty: [], xhsStyle: [] }
};

  // 只保留简单的备用回复，用于错误情况
  const defaultResponses = [
    "抱歉，暂时无法生成回应，请稍后再试。",
    "这个问题很复杂，让我思考一下...",
    "我理解你的情况，让我尝试给出一个合适的回应。"
  ];

// 不同风格的话术标签
const responseStyles = [
  { id: 'strong', title: '坚定有力版', icon: '💪' },
  { id: 'polite', title: '礼貌得体版', icon: '🙂' },
  { id: 'witty', title: '机智回应版', icon: '😏' },
  { id: 'direct', title: '直截了当版', icon: '🎯' },
  { id: 'attack', title: '强势反击版', icon: '⚔️' },
  { id: 'sarcastic', title: '阴阳怪气版', icon: '😒' },
  { id: 'xhsStyle', title: '小红书风格', icon: '📕' }
];

export default function StrategyAnalysis() {
  const navigate = useNavigate();
  const { isDark } = useThemeContext();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('attack'); // 默认使用强势反击版
  const [showMore, setShowMore] = useState(false);
  
   useEffect(() => {
    // 从localStorage获取用户输入的分析数据
    const savedData = localStorage.getItem('scenarioAnalysis');
    
    const initializeResponses = async () => {
      if (savedData) {         const data = JSON.parse(savedData);
        setAnalysisData(data);
        
        try {
          // 调用大语言模型生成初始的2条回应
          const responses: string[] = [];
          
          // 生成两条不同的回应
          for (let i = 0; i < 2; i++) {
            const response = await generateLLMResponse({
              prompt: data.description,
              scenarioType: data.scenarioType,
              tone: selectedStyle,
              maxTokens: 200
            });
            responses.push(response);
          }
          
          setSelectedResponses(responses);
        } catch (error) {
          console.error('生成初始回应失败:', error);
          setSelectedResponses(defaultResponses.slice(0, 2));
        }
      } else {
        // 如果没有保存的数据，使用默认数据
        setAnalysisData({
          scenarioType: 'work',
          description: '同事总是拖延工作进度影响团队效率',
          emotion: 'angry',
          goal: 'argue'
        });
        
        try {
          // 为默认数据生成回应
          const responses: string[] = [];
          for (let i = 0; i < 2; i++) {
            const response = await generateLLMResponse({
              prompt: '同事总是拖延工作进度影响团队效率',
              scenarioType: 'work',
              tone: selectedStyle,
              maxTokens: 200
            });
            responses.push(response);
          }
          setSelectedResponses(responses);
        } catch (error) {
          console.error('生成默认回应失败:', error);
          setSelectedResponses(defaultResponses.slice(0, 2));
        }
      }
    };
    
    initializeResponses();
  }, []); // 注意：这里我们移除了 selectedStyle 依赖，因为它会导致无限循环
  
  const handleCopyResponse = (response: string) => {
    navigator.clipboard.writeText(response);
    toast('已复制到剪贴板');
  };
  
  const handleStartSimulation = () => {
    navigate('/simulation');
  };
  
   // 增强的"查看更多回应"功能，自动生成新回应
  const handleToggleMore = async () => {
    if (!showMore && analysisData) {
      try {
        // 显示加载状态
        setSelectedResponses([]);
        
        // 生成更多新回应（总共5条）
        const newResponses: string[] = [];
        
        for (let i = 0; i < 5; i++) {
          const response = await generateLLMResponse({
            prompt: analysisData.description,
            scenarioType: analysisData.scenarioType,
            tone: selectedStyle,
            maxTokens: 200
          });
          newResponses.push(response);
        }
        
        // 去重（避免生成相同的回应）
        const uniqueResponses = Array.from(new Set(newResponses));
        
        // 更新回应列表
        setSelectedResponses(uniqueResponses);
      } catch (error) {
        console.error('生成更多回应失败:', error);
        // 发生错误时使用备用回应
        setSelectedResponses(defaultResponses);
      }
    }
    
    setShowMore(!showMore);
  };
  
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
            <span className="text-xl font-bold">直接回应话术</span>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 问题概述 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-blue-500"></i>
            问题概述
          </h2>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <p className="mb-4">{analysisData?.description || '暂无问题描述'}</p>
            
            <div className="flex flex-wrap gap-3">
              {analysisData?.emotion && (
                <span className={`py-1 px-3 rounded-full text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  情绪：{getEmotionLabel(analysisData.emotion)}
                </span>
              )}
              {analysisData?.goal && (
                <span className={`py-1 px-3 rounded-full text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  目标：{getGoalLabel(analysisData.goal)}
                </span>
              )}
              {analysisData?.additionalInfo && (
                <span className={`py-1 px-3 rounded-full text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  有补充信息
                </span>
              )}
            </div>
          </div>
        </motion.section>
        
        {/* 直接回应话术 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold flex items-center gap-2">
              <i className="fa-solid fa-comment-dots text-green-500"></i>
              建议回应
            </h2>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {responseStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={async () => {
                    setSelectedStyle(style.id);
                    setSelectedResponses([]); // 清空当前回应，显示加载状态
                    
                    try {
                      // 根据选择的风格重新生成回应内容
                      if (analysisData) {
                        const responses: string[] = [];
                        for (let i = 0; i < 2; i++) {
                          const response = await generateLLMResponse({
                            prompt: analysisData.description,
                            scenarioType: analysisData.scenarioType,
                            tone: style.id,
                            maxTokens: 200
                          });
                          responses.push(response);
                        }
                        setSelectedResponses(responses);
                      }
                    } catch (error) {
                      console.error('生成回应失败:', error);
                      setSelectedResponses(defaultResponses.slice(0, 2));
                    }
                  }}
                  className={`py-1 px-3 rounded-full text-sm font-medium transition-all flex items-center gap-1 whitespace-nowrap
                    ${selectedStyle === style.id 
                      ? 'bg-blue-600 text-white' 
                      : isDark 
                        ? 'bg-gray-700 hover:bg-gray-600': 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  <span>{style.icon}</span>
                  <span>{style.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
           {selectedResponses.length > 0 ? (
            selectedResponses.map((response, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md relative`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${getStyleColor(selectedStyle)} flex items-center justify-center flex-shrink-0 mt-1`}>
                    {responseStyles.find(s => s.id === selectedStyle)?.icon || '💬'}
                  </div>
                  <div className="flex-1">
                    <p className="leading-relaxed">{response}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleCopyResponse(response)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </motion.div>
            ))
          ) : (
            // 显示加载状态
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md flex justify-center items-center h-40`}>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">正在生成回应，请稍候...</p>
              </div>
            </div>
          )}
            
            {/* 查看更多按钮 */}
            {selectedResponses.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: selectedResponses.length * 0.1 }}
                onClick={handleToggleMore}
                className={`w-full py-3 rounded-xl text-center font-medium
                  ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-md transition-colors`}
              >
                {showMore ? '收起' : '查看更多回应'}
                <i className={`fa-solid ml-2 ${showMore ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </motion.button>
            )}
          </div>
        </motion.section>
        
        {/* 操作按钮 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <button
            onClick={handleStartSimulation}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-comments"></i>
            开始模拟对话练习
          </button>
        </motion.div>
      </main>
    </div>
  );
}

// 辅助函数：获取情绪标签
function getEmotionLabel(emotionId: string): string {
  const emotionMap: Record<string, string> = {
    angry: '愤怒',
    sad: '委屈',
    helpless: '无奈',
    anxious: '焦虑',
    calm: '冷静'
  };
  return emotionMap[emotionId] || emotionId;
}

// 辅助函数：获取目标标签
function getGoalLabel(goalId: string): string {
  const goalMap: Record<string, string> = {
    argue: '据理力争',
    ease: '缓和关系',
    boundary: '划清界限',
    solve: '解决问题'
  };
  return goalMap[goalId] || goalId;
}

// 辅助函数：获取风格对应的颜色
function getStyleColor(styleId: string): string {
  const colorMap: Record<string, string> = {
    strong: 'bg-red-500 text-white',
    polite: 'bg-blue-500 text-white',
    witty: 'bg-purple-500 text-white',
    direct: 'bg-green-500 text-white',
    attack: 'bg-orange-500 text-white',
    sarcastic: 'bg-yellow-500 text-white',
    xhsStyle: 'bg-pink-500 text-white'
  };
  return colorMap[styleId] || 'bg-gray-500 text-white';
}