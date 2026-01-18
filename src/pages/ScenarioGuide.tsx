import React, { useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { StepIndicator } from '@/components/StepIndicator';
  import { useThemeContext } from '@/contexts/themeContext';

  interface ScenarioData {
    title: string;
    icon: string;
    description: string;
  }

  const scenarioMap: Record<string, ScenarioData> = {
    work: {
      title: '职场冲突',
      icon: '🏢',
      description: '处理与同事、上级、下属之间的矛盾和分歧'
    },
    family: {
      title: '家庭与亲友',
      icon: '👨‍👩‍👧',
      description: '应对催婚、攀比、观念不合等家庭矛盾'
    },
    consumer: {
      title: '消费纠纷',
      icon: '🛒',
      description: '处理与客服、商家、物业之间的维权沟通'
    },
    public: {
      title: '公共场合',
      icon: '🚦',
      description: '应对邻里、路人、排队等公共场合的突发冲突'
    },
    relationship: {
      title: '亲密关系',
      icon: '💔',
      description: '处理与伴侣、好友之间的矛盾和分歧'
    },
    emergency: {
      title: '紧急情况',
      icon: '🚨',
      description: '快速应对突发冲突的紧急策略'
    }
  };

  const emotions = [
    { id: 'angry', label: '愤怒', icon: '😡' },
    { id: 'sad', label: '委屈', icon: '😢' },
    { id: 'helpless', label: '无奈', icon: '🤷' },
    { id: 'anxious', label: '焦虑', icon: '😰' },
    { id: 'calm', label: '冷静', icon: '😌' }
  ];

  const communicationGoals = [
    { id: 'argue', label: '据理力争', description: '坚持自己的立场和观点' },
    { id: 'ease', label: '缓和关系', description: '保持和谐，避免矛盾升级' },
    { id: 'boundary', label: '划清界限', description: '明确表达自己的底线和边界' },
    { id: 'solve', label: '解决问题', description: '专注于找到解决方案' }
  ];

   export default function ScenarioGuide() {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const { isDark } = useThemeContext();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    
    // 获取当前场景数据，如果不存在则返回默认值
    const scenario = scenarioMap[type || 'work'];
    
    // 常见问题选项
    const commonIssues = {
      work: [
        "同事总是把自己的工作推给我做",
        "上司经常在公开场合批评我",
        "下属不服从工作安排",
        "同事总是抢占功劳"
      ],
      family: [
        "父母总是催我结婚生子",
        "亲戚总是拿我和别人比较",
        "家人干涉我的个人生活",
        "兄弟姐妹之间财产分配不均"
      ],
      consumer: [
        "商品质量有问题但商家拒绝退款",
        "客服态度恶劣不作为",
        "物业收费不合理但服务差",
        "买到假货商家不承认"
      ],
      public: [
        "邻居制造噪音影响休息",
        "有人插队还理直气壮",
        "路人故意挑衅引发冲突",
        "公共场所遇到不文明行为"
      ],
      relationship: [
        "伴侣总是忽视我的感受",
        "朋友借钱不还",
        "亲密的人总是贬低我",
        "对方总是欺骗我"
      ],
      emergency: [
        "遇到突发冲突需要立即回应",
        "有人正在对我进行言语攻击",
        "需要快速应对挑衅行为",
        "紧急情况下需要有力反击"
      ]
    };
    
    useEffect(() => {
      if (!scenario) {
        navigate('/');
      }
    }, [type, scenario, navigate]);
    
    const handleNextStep = () => {
      if (currentStep === 0 && description.trim() === '') {
        return; // 第一题必须填写
      }
      
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else {
        // 所有问题回答完毕，跳转到策略分析页
        localStorage.setItem('scenarioAnalysis', JSON.stringify({
          scenarioType: type,
          description,
          emotion: selectedEmotion,
          goal: selectedGoal,
          additionalInfo
        }));
        
        navigate('/strategy');
      }
    };
    
    const handlePrevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
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
              <span className="text-xl font-bold">{scenario.title}</span>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* 场景标题 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <span className="text-4xl mb-3 inline-block">{scenario.icon}</span>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{scenario.title}</h1>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {scenario.description}
            </p>
          </motion.section>

          {/* 步骤指示器 */}
          <StepIndicator 
            currentStep={currentStep} 
            totalSteps={3} 
          />

          {/* 问题输入区 */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            {currentStep === 0 ? (
               // 主要问题
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h2 className="text-lg font-semibold mb-4">
                  1. 对方说了或做了什么让你感到困扰？
                </h2>
                
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请详细描述当时的情况..."
                  className={`w-full p-4 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'} border h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-3">常见困扰（点击选择）：</h3>
                  <div className="flex flex-wrap gap-2">
                    {(commonIssues[type as keyof typeof commonIssues] || []).map((issue, index) => (
                      <button
                        key={index}
                        onClick={() => setDescription(issue)}
                        className={`py-2 px-4 rounded-full text-sm transition-all
                          ${isDark 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">您现在的情绪是？</h3>
                  <div className="flex flex-wrap gap-2">
                    {emotions.map((emotion) => (
                      <button
                        key={emotion.id}
                        onClick={() => setSelectedEmotion(emotion.id)}
                        className={`py-2 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-2
                          ${selectedEmotion === emotion.id 
                            ? 'bg-blue-600 text-white' 
                            : isDark 
                              ? 'bg-gray-700 hover:bg-gray-600' 
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                      >
                        <span>{emotion.icon}</span>
                        <span>{emotion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentStep === 1 ? (
                // 沟通目标选择 - 增加攻击性选项
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                  <h2 className="text-lg font-semibold mb-4">
                    2. 您希望达到什么沟通效果？
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {communicationGoals.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`p-4 rounded-lg transition-all text-left
                          ${selectedGoal === goal.id 
                            ? 'bg-blue-600 text-white border-blue-500' 
                            : isDark 
                              ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                              : 'bg-gray-200 hover:bg-gray-300 border-gray-300'
                          } border transition-all`}
                      >
                        <h3 className="font-medium mb-1">{goal.label}</h3>
                        <p className="text-sm opacity-90">{goal.description}</p>
                      </button>
                    ))}
                    
                    {/* 新增攻击性强的选项 */}
                    <button
                      onClick={() => setSelectedGoal('attack')}
                      className={`p-4 rounded-lg transition-all text-left
                        ${selectedGoal === 'attack' 
                          ? 'bg-red-600 text-white border-red-500' 
                          : isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                            : 'bg-gray-200 hover:bg-gray-300 border-gray-300'
                        } border transition-all`}
                    >
                      <h3 className="font-medium mb-1">强势反击</h3>
                      <p className="text-sm opacity-90">直接有力地回击对方，维护自己的立场</p>
                    </button>
                    
                    <button
                      onClick={() => setSelectedGoal('sarcastic')}
                      className={`p-4 rounded-lg transition-all text-left
                        ${selectedGoal === 'sarcastic' 
                          ? 'bg-purple-600 text-white border-purple-500' 
                          : isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                            : 'bg-gray-200 hover:bg-gray-300 border-gray-300'
                        } border transition-all`}
                    >
                      <h3 className="font-medium mb-1">阴阳怪气</h3>
                      <p className="text-sm opacity-90">用讽刺和幽默的方式回应对方</p>
                    </button>
                  </div>
              </div>
            ) : (
              // 补充信息
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h2 className="text-lg font-semibold mb-4">
                  3. 有什么其他需要补充的信息吗？（选填）
                </h2>
                
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="如果有其他重要细节，可以在这里补充..."
                  className={`w-full p-4 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'} border h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <i className="fa-solid fa-info-circle"></i>
                    我们将根据您提供的信息，为您生成直接的回应话术
                  </p>
                </div>
              </div>
            )}
          </motion.section>

          {/* 操作按钮 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 max-w-3xl mx-auto flex justify-between"
          >
            {currentStep > 0 && (
              <button
                onClick={handlePrevStep}
                className={`py-3 px-6 rounded-lg font-medium flex items-center gap-2
                  ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                <i className="fa-solid fa-arrow-left"></i>
                上一步
              </button>
            )}
            
            <div className="ml-auto">
              <button
                onClick={handleNextStep}
                disabled={currentStep === 0 && description.trim() === ''}
                className={`py-3 px-8 rounded-lg font-medium
                  ${(currentStep === 0 && description.trim() === '')
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                  }`}
              >
                {currentStep < 2 ? '下一步' : '生成回应'}
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }