import { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { ScenarioCard } from '@/components/ScenarioCard';
  import { EmergencyButton } from '@/components/EmergencyButton';
  import { DailyQuote } from '@/components/DailyQuote';
  import { useTheme } from '@/hooks/useTheme';
  import { toast } from 'sonner';

  export default function Home() {
    const { theme, toggleTheme, isDark } = useTheme();
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const scenarios = [
      {
        id: 'work',
        title: '职场冲突',
        icon: '🏢',
        description: '与同事、上级、下属的矛盾解决',
        color: 'bg-blue-500',
        textColor: 'text-white'
      },
      {
        id: 'family',
        title: '家庭与亲友',
        icon: '👨‍👩‍👧',
        description: '催婚、攀比、观念不合的应对',
        color: 'bg-green-500',
        textColor: 'text-white'
      },
      {
        id: 'consumer',
        title: '消费纠纷',
        icon: '🛒',
        description: '客服、商家、物业的维权沟通',
        color: 'bg-red-500',
        textColor: 'text-white'
      },
      {
        id: 'public',
        title: '公共场合',
        icon: '🚦',
        description: '邻里、路人、排队等突发冲突',
        color: 'bg-yellow-500',
        textColor: 'text-white'
      },
      {
        id: 'relationship',
        title: '亲密关系',
        icon: '💔',
        description: '伴侣、好友的矛盾化解',
        color: 'bg-purple-500',
        textColor: 'text-white',
        tag: '温和模式'
      }
    ];

    const handleEmergencyClick = () => {
      toast('快速应急模式已启动，请描述您的紧急情况', {
        action: {
          label: '立即处理',
          onClick: () => {
            // 导航到应急场景页面
            window.location.href = '/scenario/emergency';
          }
        }
      });
    };

    return (
      <div className={`min-h-screen w-full flex flex-col ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
        {/* 头部导航 */}
        <header className={`sticky top-0 z-50 px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="container mx-auto flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">吵架大王</span>
              <span className="text-sm py-1 px-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">冷静沟通助手</span>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {isDark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
              </button>
              
              <Link to="/profile" className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                <i className="fa-solid fa-user"></i>
              </Link>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* 欢迎语 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h1 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold mb-3">今天需要应对什么情境？</h1>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              我们提供专业的沟通策略和话术建议，帮助您清晰、有效地表达自己，化解冲突
            </p>
          </motion.section>

           {/* 模拟对话练习入口 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <Link 
              to="/simulation"
              className={`block rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-red-800 to-orange-900' : 'bg-gradient-to-r from-red-500 to-orange-500'} hover:shadow-xl`}
            >
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">模拟吵架练习</h2>
                  <p className="text-white/90 max-w-lg">
                    练习如何有效吵架怼回去！模拟各种冲突场景，掌握吵架技巧，提升应对能力
                  </p>
                </div>
                <div className="text-6xl">💪</div>
              </div>
            </Link>
          </motion.section>

          {/* 场景选择卡片 */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-xl font-bold mb-6">选择具体场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario, index) => (
                <ScenarioCard 
                  key={scenario.id}
                  scenario={scenario}
                  isExpanded={expandedCard === scenario.id}
                  onToggle={() => setExpandedCard(expandedCard === scenario.id ? null : scenario.id)}
                  index={index}
                />
              ))}
            </div>
          </motion.section>

          {/* 今日沟通金句 */}
          <DailyQuote isDark={isDark} />
        </main>

        {/* 页脚 */}
        <footer className={`py-6 px-4 ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-inner`}>
          <div className="container mx-auto text-center text-sm">
            <p>© 2026 吵架大王 - 让沟通更有效</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-blue-500 transition-colors">使用指南</a>
              <a href="#" className="hover:text-blue-500 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-blue-500 transition-colors">联系我们</a>
            </div>
          </div>
        </footer>

        {/* 快速应急按钮 */}
        <EmergencyButton onClick={handleEmergencyClick} />
      </div>
    );
  }