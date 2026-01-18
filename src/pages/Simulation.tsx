import React, { useState, useEffect, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { useThemeContext } from '@/contexts/themeContext';
  import { DialogMessage } from '@/components/DialogMessage';
  import { toast } from 'sonner';
  import { generateLLMResponse, GenerationType } from '@/lib/llmService';

  // 模拟对话场景类型
  type SimulationMode = 'user' | 'opponent';

  // 模拟对话场景数据
  const scenarioTypes = [
    { id: 'work', name: '职场冲突', icon: '🏢' },
    { id: 'family', name: '家庭纠纷', icon: '👨‍👩‍👧' },
    { id: 'consumer', name: '消费维权', icon: '🛒' },
    { id: 'public', name: '公共场合', icon: '🚦' },
    { id: 'relationship', name: '亲密关系', icon: '💔' },
  ];

  // 保留这个结构但不再直接使用，仅用于向后兼容
  const mockResponses = {
    work: [],
    family: [],
    consumer: [],
    public: [],
    relationship: []
  };

  // 保留这个结构但不再直接使用，仅用于向后兼容
  const mockSuggestions = {
    work: [],
    family: [],
    consumer: [],
    public: [],
    relationship: []
  };

  // 回复语气选项
  const responseTones = [
    { id: 'strong', name: '坚定有力', icon: '💪' },
    { id: 'attack', name: '强势反击', icon: '⚔️' },
    { id: 'sarcastic', name: '阴阳怪气', icon: '😒' },
    { id: 'witty', name: '机智幽默', icon: '😏' },
    { id: 'polite', name: '礼貌得体', icon: '🙂' },
    { id: 'xhsStyle', name: '小红书风格', icon: '📕' }
  ];

export default function Simulation() {
  const navigate = useNavigate();
  const { isDark } = useThemeContext();
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }>>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState('');
  const [currentMode, setCurrentMode] = useState<SimulationMode>('user');
  const [currentScenario, setCurrentScenario] = useState('work');
  const [selectedTone, setSelectedTone] = useState('strong'); // 默认语气
  const [showModeSelection, setShowModeSelection] = useState(true);
  const [showScenarioSelection, setShowScenarioSelection] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 模拟初始对话
  useEffect(() => {
    if (!showModeSelection && !showScenarioSelection) {
      const initialMessages = [
        {
          id: '1',
          content: currentMode === 'user' 
            ? '现在你可以输入对方说的话，我会生成相应的回应话术。' 
            : '现在我来模拟对方，你可以练习如何回应。当你不知道如何回应时，可以点击"获取建议"按钮。',
          sender: 'ai',
          timestamp: new Date()
        }
      ];
      setMessages(initialMessages);
    }
  }, [showModeSelection, showScenarioSelection, currentMode]);
  
  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleStartSimulation = (mode: SimulationMode) => {
    setCurrentMode(mode);
    setShowModeSelection(false);
    setShowScenarioSelection(true);
    setMessages([]); // 清空之前的对话
  };
  
  const handleConfirmScenario = () => {
    setShowScenarioSelection(false);
    // 重置对话
    setMessages([]);
  };
  
   const handleSendMessage = async () => {
    if (inputText.trim() === '' || isTyping) return;
    
    // 添加用户消息
    const newMessage = {
      id: Date.now().toString(),
      content: inputText,
      sender: currentMode === 'user' ? 'user' : 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);
    
    try {
      // 调用大语言模型生成回复
      const llmResponse = await generateLLMResponse({
        prompt: inputText,
        scenarioType: currentScenario,
        tone: selectedTone
      });
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: llmResponse,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('生成回复失败:', error);
      // 发生错误时使用备用回复
      const fallbackResponses = [
        "抱歉，我现在无法生成回复，请稍后再试。",
        "这个问题很有趣，让我思考一下...",
        "我明白你的意思了，让我整理一下思路..."
      ];
      const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: randomFallback,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
   const handleGetSuggestion = async () => {
    setShowSuggestion(false); // 先隐藏之前的建议
    
    // 获取最新的对方消息作为上下文
    const lastAiMessage = messages.findLast(msg => msg.sender === 'ai');
    const context = lastAiMessage ? lastAiMessage.content : '';
    
    try {
      // 调用大语言模型生成建议
      const suggestion = await generateLLMResponse({
        prompt: context,
        scenarioType: currentScenario,
        tone: selectedTone
      }, 'suggestion');
      
      setCurrentSuggestion(suggestion);
      setShowSuggestion(true);
      
      // 5秒后自动隐藏建议
      setTimeout(() => {
        setShowSuggestion(false);
      }, 5000);
    } catch (error) {
      console.error('生成建议失败:', error);
      // 发生错误时使用备用建议
      const fallbackSuggestions = [
        "保持冷静，深呼吸，然后清晰地表达你的观点。",
        "尝试理解对方的立场，但也要坚持自己的底线。",
        "避免情绪化的回应，用事实和逻辑来支持你的观点。"
      ];
      const randomFallback = fallbackSuggestions[Math.floor(Math.random() * fallbackSuggestions.length)];
      
      setCurrentSuggestion(randomFallback);
      setShowSuggestion(true);
      
      setTimeout(() => {
        setShowSuggestion(false);
      }, 5000);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleRestart = () => {
    setShowModeSelection(true);
    setShowScenarioSelection(false);
    setMessages([]);
    setInputText('');
    setShowSuggestion(false);
  };
  
  const handleCopySuggestion = () => {
    navigator.clipboard.writeText(currentSuggestion);
    toast('建议已复制到剪贴板');
  };
  
  return (
    <div className={`min-h-screen w-full flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      {/* 头部导航 */}
      <header className={`sticky top-0 z-50 px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (showModeSelection) {
                  navigate(-1);
                } else if (showScenarioSelection) {
                  setShowScenarioSelection(false);
                  setShowModeSelection(true);
                } else {
                  handleRestart();
                }
              }}
              className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              {showModeSelection ? <i className="fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-rotate-left"></i>}
            </button>
            <span className="text-xl font-bold">模拟对话练习</span>
          </div>
          
          {!showModeSelection && !showScenarioSelection && (
            <button 
              onClick={() => {
                // 完成练习，返回策略页面
                navigate('/strategy');
              }}
              className={`py-2 px-4 rounded-lg text-sm font-medium
                ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              <i className="fa-solid fa-check mr-1"></i>
              完成练习
            </button>
          )}
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col">
        {showModeSelection ? (
          // 模式选择界面
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center items-center text-center"
          >
            <motion.h2 
              className="text-2xl font-bold mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              选择练习模式
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
              <motion.div
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md cursor-pointer`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
                onClick={() => handleStartSimulation('user')}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-2">模拟用户这方</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  输入对方说的话，系统生成回应话术，帮助你准备如何吵架怼回去
                </p>
              </motion.div>
              
              <motion.div
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md cursor-pointer`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
                onClick={() => handleStartSimulation('opponent')}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-2">模拟对方角色</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  系统模拟对方，你练习如何回应，提升吵架技能
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : showScenarioSelection ? (
          // 场景和语气选择界面
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center items-center text-center"
          >
            <motion.h2 
              className="text-2xl font-bold mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              选择练习设置
            </motion.h2>
            
            <div className="w-full max-w-3xl mb-10">
              <h3 className="text-lg font-bold mb-4">选择场景类型</h3>
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {scenarioTypes.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setCurrentScenario(scenario.id)}
                    className={`py-2 px-4 rounded-full flex items-center gap-2 transition-all
                      ${currentScenario === scenario.id 
                        ? 'bg-blue-600 text-white' 
                        : isDark 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  >
                    <span>{scenario.icon}</span>
                    <span>{scenario.name}</span>
                  </button>
                ))}
              </div>
              
              <h3 className="text-lg font-bold mb-4">选择回复语气</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {responseTones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`py-2 px-4 rounded-full flex items-center gap-2 transition-all
                      ${selectedTone === tone.id 
                        ? 'bg-purple-600 text-white' 
                        : isDark 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  >
                    <span>{tone.icon}</span>
                    <span>{tone.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <motion.button
              className="w-full max-w-xs py-3 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              onClick={handleConfirmScenario}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              开始练习
            </motion.button>
          </motion.div>
        ) : (
          // 模拟对话界面
          <>
            {/* 当前模式、场景和语气提示 */}
            <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm flex items-center flex-wrap gap-2`}>
              <span className={`py-1 px-3 rounded-full text-sm ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'} text-blue-600 dark:text-blue-300`}>
                {currentMode === 'user' ? '模拟用户这方' : '模拟对方角色'}
              </span>
              <span className={`py-1 px-3 rounded-full text-sm ${isDark ? 'bg-purple-900/50' : 'bg-purple-100'} text-purple-600 dark:text-purple-300 flex items-center gap-1`}>
                {scenarioTypes.find(s => s.id === currentScenario)?.icon}
                {scenarioTypes.find(s => s.id === currentScenario)?.name}
              </span>
              <span className={`py-1 px-3 rounded-full text-sm ${isDark ? 'bg-pink-900/50' : 'bg-pink-100'} text-pink-600 dark:text-pink-300 flex items-center gap-1`}>
                {responseTones.find(t => t.id === selectedTone)?.icon}
                {responseTones.find(t => t.id === selectedTone)?.name}
              </span>
              <button
                onClick={handleRestart}
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors ml-auto`}
              >
                <i className="fa-solid fa-refresh mr-1"></i>重新开始
              </button>
            </div>
            
            {/* 模拟对话区域 */}
            <div className={`flex-1 overflow-y-auto rounded-xl p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentMode === 'user' 
                      ? '开始输入对方说的话，系统会生成回应...' 
                      : '系统会模拟对方，开始你的回应练习吧...'}
                  </p>
                </div>
              ) : (
                messages.map(message => (
                  <DialogMessage 
                    key={message.id}
                    message={message}
                    isDark={isDark}
                  />
                ))
              )}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-4"
                >
                  <div className={`max-w-md p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} relative`}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                    <div className="absolute top-2 right-2 text-xs opacity-50">
                      {currentMode === 'user' ? '生成回应中...' : '对方正在输入...'}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* 提示建议区域 */}
            {showSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'} border relative`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-lightbulb text-yellow-500"></i>
                    <strong>建议话术：</strong>
                  </p>
                  <button
                    onClick={handleCopySuggestion}
                    className={`p-1.5 rounded-full text-xs
                      ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  >
                    <i className="fa-solid fa-copy"></i>
                  </button>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-line">
                  {currentSuggestion}
                </p>
              </motion.div>
            )}
            
            {/* 输入区域 */}
            <div className={`flex gap-2 p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <button
                onClick={handleGetSuggestion}
                className={`p-3 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors flex-shrink-0`}
                title="获取建议话术"
              >
                <i className="fa-solid fa-lightbulb text-yellow-500"></i>
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={currentMode === 'user' ? "输入对方说的话..." : "输入你的回应..."}
                  className={`w-full p-3 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'} border h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {inputText.length}/500
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === '' || isTyping}
                className={`p-3 rounded-full flex-shrink-0
                  ${(inputText.trim() === '' || isTyping)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                  }`}
                title={currentMode === 'user' ? "生成回应" : "发送回应"}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}