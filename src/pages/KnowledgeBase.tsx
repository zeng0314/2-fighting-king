import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { useThemeContext } from '@/contexts/themeContext';

  // 模拟知识库数据
  const knowledgeData = {
    communicationRules: [
      {
        id: 'non-violent',
        title: '非暴力沟通',
        description: '非暴力沟通是一种通过观察事实、表达感受、提出需求和请求来进行有效沟通的方法。',
        steps: [
          '观察事实：客观描述发生的事件，不评价、不指责',
          '表达感受：坦诚地表达自己的真实感受',
          '提出需求：明确说明自己的需求和期望',
          '请求行动：具体地请求对方采取行动'
        ],
        icon: '🗣️'
      },
      {
        id: 'crucial-conversations',
        title: '关键对话',
        description: '关键对话是指那些观点分歧大、情绪强烈、结果影响深远的对话。',
        steps: [
          '从"心"开始：明确自己的目标，不要被情绪控制',
          '时刻关注安全：创造安全的对话环境',
          '掌握我的故事：避免受害者、大反派和无助者的心态',
          '陈述事实：分享事实经过，试探性地表达观点',
          '了解对方的故事：倾听对方的观点和感受',
          '开始行动：确定行动计划和责任'
        ],
        icon: '🤝'
      },
      {
        id: 'emotional-intelligence',
        title: '情绪智力',
        description: '情绪智力是指识别、理解和管理自己情绪，以及识别、理解和影响他人情绪的能力。',
        steps: [
          '自我意识：了解自己的情绪和触发因素',
          '自我管理：控制自己的情绪反应',
          '社会意识：理解他人的情绪和观点',
          '关系管理：建立和维护健康的人际关系'
        ],
        icon: '🧠'
      }
    ],
    classicScripts: [
      {
        id: 'workplace',
        title: '职场沟通',
        scripts: [
          '当同事拖延工作时："关于[项目名称]，我们之前约定的截止日期是[具体日期]，我担心如果延迟可能会影响整体进度。你目前的进展如何？是否需要我提供帮助？"',
          '当收到不公正批评时："感谢你的反馈，我很重视你的意见。关于[具体问题]，我想了解更多细节，以便我能更好地改进。"',
          '当需要拒绝请求时："我理解这个任务的重要性，但我目前正在处理[其他任务]，时间和精力有限。如果可以调整截止日期或者分配部分工作，我很乐意配合。"'
        ]
      },
      {
        id: 'family',
        title: '家庭沟通',
        scripts: [
          '当面对催婚时："我理解你们希望我幸福的心情，我也在认真考虑这个问题。只是目前我更关注[事业/个人成长等]，希望你们能给我一些时间。"',
          '当与伴侣发生分歧时："我知道我们在这个问题上有不同的看法，但我希望我们能一起找到一个双方都能接受的解决方案。你愿意和我好好聊聊吗？"',
          '当孩子犯错时："我知道你不是故意的，但这次的行为确实造成了[后果]。我希望你能理解为什么这样做不对，下次遇到类似情况，我们可以一起想更好的解决办法。"'
        ]
      },
      {
        id: 'consumer',
        title: '消费维权',
        scripts: [
          '当商品质量有问题时："我于[购买日期]在贵店购买了[商品名称]，但使用后发现[具体问题]。根据[相关法规/购买协议]，我希望能够[退货/换货/维修]。"',
          '当客服态度不好时："我理解你们工作很辛苦，但我希望能够得到尊重和专业的服务。我的问题是[具体问题]，希望你能帮我解决。"',
          '当物业不作为时："根据物业服务合同，你们有责任[具体责任]。但目前[具体问题]已经影响到了我的正常生活，请你们尽快处理。"'
        ]
      }
    ],
    legalTips: [
      {
        id: 'consumer-rights',
        title: '消费者权益保护',
        tips: [
          '七日内无理由退货：除特殊商品外，网购商品自收到之日起七日内可无理由退货',
          '三包政策：商品售出后7日内发生性能故障可退货，15日内可换货',
          '发票是重要凭证：购买商品时务必索要发票或其他购物凭证',
          '12315投诉热线：遇到消费纠纷可拨打12315向消费者协会投诉'
        ]
      },
      {
        id: 'workplace-rights',
        title: '职场权益保护',
        tips: [
          '劳动合同：入职一个月内应当签订书面劳动合同',
          '试用期：试用期最长不超过6个月，且工资不得低于正式工资的80%',
          '加班工资：工作日加班支付不低于150%的工资，休息日加班支付不低于200%的工资，法定节假日加班支付不低于300%的工资',
          '社保缴纳：用人单位应当为员工缴纳社会保险'
        ]
      },
      {
        id: 'housing-rights',
        title: '住房权益保护',
        tips: [
          '租赁合同：应当签订书面租赁合同，明确双方权利义务',
          '押金退还：租赁期满后，如无违约行为，房东应当全额退还押金',
          '房屋维修：租赁期间，房屋及附属设施的维修责任一般由房东承担',
          '物业费：根据物业服务合同约定，业主应当按时缴纳物业费'
        ]
      }
    ],
    emotionManagement: [
      {
        id: 'deep-breathing',
        title: '深呼吸放松法',
        description: '深呼吸是一种简单有效的情绪调节方法，可以快速缓解紧张和焦虑。',
        steps: [
          '找一个安静的地方，舒适地坐下或站立',
          '慢慢吸气，让空气充满你的腹部，数到4',
          '屏住呼吸，数到4',
          '缓慢呼气，让腹部慢慢收缩，数到6',
          '重复上述步骤5-10次'
        ],
        duration: '2-5分钟'
      },
      {
        id: 'mindfulness-meditation',
        title: '正念冥想',
        description: '正念冥想可以帮助你专注于当下，减少负面情绪和思维。',
        steps: [
          '找一个安静的地方，舒适地坐下',
          '闭上眼睛或保持柔和的目光',
          '将注意力集中在你的呼吸上，感受气息的进出',
          '当思绪飘走时，温柔地将注意力带回呼吸',
          '保持这个状态5-10分钟'
        ],
        duration: '5-10分钟'
      },
      {
        id: 'emotion-regulation',
        title: '情绪调节四步法',
        description: '当你感到强烈的情绪时，可以使用这个方法来帮助自己平静下来。',
        steps: [
          '识别情绪：给你的情绪命名（如愤怒、焦虑、委屈）',
          '接受情绪：承认情绪的存在，不要评判或压抑它',
          '探究原因：思考是什么触发了你的情绪',
          '采取行动：选择健康的方式来表达和处理情绪'
        ],
        duration: '根据具体情况而定'
      }
    ],
    // 新增避免自证陷阱和吵架成功案例
    antiSelfJustification: [
      {
        id: 'avoid-trap',
        title: '避免自证陷阱',
        description: '在吵架和辩论中，避免陷入对方预设的陷阱，不要顺着对方的逻辑去证明自己',
        steps: [
          '识别陷阱：注意对方是否在提问中预设了错误前提或进行了人身攻击',
          '拒绝回答：对于不合理的问题，可以直接拒绝回答，不要试图去证明什么',
          '重新定义：将话题重新拉回到正确的轨道上，按照自己的逻辑进行表达',
          '反问对方：用提问的方式让对方暴露逻辑漏洞，掌握主动权',
          '保持冷静：不要被对方激怒，保持理性思考和表达'
        ],
        icon: '🛡️'
      },
      {
        id: 'successful-cases',
        title: '吵架成功案例分析',
        description: '学习真实的吵架成功案例，掌握有效的沟通技巧和策略',
        steps: [
          '案例一：职场拒绝不合理要求 - "我理解这个任务的重要性，但我目前的工作量已经饱和。如果您坚持让我接手，我需要重新评估优先级，可能会影响其他重要任务的进度。"',
          '案例二：应对催婚压力 - "我知道你们是关心我，但婚姻是我自己的人生选择。我会对自己的幸福负责，也希望你们能尊重我的决定。"',
          '案例三：消费维权 - "根据《消费者权益保护法》，商品存在质量问题的，消费者有权要求退货。我希望你们能遵守法律规定，给我一个合理的解决方案。"',
          '案例四：避免自证陷阱 - 当对方问"你是不是故意针对我？"时，可以回答"我针对的是问题本身，不是针对你个人。请你不要混淆是非。"'
        ],
        icon: '🏆'
      }
    ]
  };

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const { isDark } = useThemeContext();
  const [activeTab, setActiveTab] = useState('communicationRules');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
            <span className="text-xl font-bold">沟通知识库</span>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 标题区域 */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-3">成为沟通高手的工具箱</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            探索专业的沟通技巧、经典话术、法律知识和情绪管理方法，提升你的沟通能力
          </p>
        </motion.section>
        
        {/* 标签页导航 */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('communicationRules')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'communicationRules'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              沟通法则
            </button>
            <button
              onClick={() => setActiveTab('classicScripts')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'classicScripts'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              经典话术
            </button>
            <button
              onClick={() => setActiveTab('legalTips')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'legalTips'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              法律与权益
            </button>
            <button
              onClick={() => setActiveTab('emotionManagement')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'emotionManagement'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              情绪管理
            </button>
            <button
              onClick={() => setActiveTab('antiSelfJustification')}
              className={`py-2 px-6 rounded-lg transition-all font-medium
                ${activeTab === 'antiSelfJustification'
                  ? 'bg-blue-600 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              吵架技巧
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
          {activeTab === 'communicationRules' && knowledgeData.communicationRules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div 
                className={`p-5 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                onClick={() => toggleItem(rule.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{rule.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{rule.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {rule.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedItems[rule.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedItems[rule.id] ? 'auto' : 0,
                  opacity: expandedItems[rule.id] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-5 pt-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h4 className="text-sm font-medium mb-3">核心步骤：</h4>
                  <ul className="space-y-2">
                    {rule.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
          
          {activeTab === 'classicScripts' && knowledgeData.classicScripts.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div 
                className={`p-5 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                onClick={() => toggleItem(category.id)}
              >
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <motion.div
                  animate={{ rotate: expandedItems[category.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedItems[category.id] ? 'auto' : 0,
                  opacity: expandedItems[category.id] ? 1 : 0
                }}transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-5 pt-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="space-y-4">
                    {category.scripts.map((script, scriptIndex) => (
                      <div 
                        key={scriptIndex} 
                        className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} relative`}
                      >
                        <p className="text-sm mb-2">{script}</p>
                        <button className={`absolute top-2 right-2 p-1.5 rounded-full text-xs
                          ${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
          
          {activeTab === 'legalTips' && knowledgeData.legalTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div 
                className={`p-5 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                onClick={() => toggleItem(tip.id)}
              >
                <h3 className="text-lg font-semibold">{tip.title}</h3>
                <motion.div
                  animate={{ rotate: expandedItems[tip.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedItems[tip.id] ? 'auto' : 0,
                  opacity: expandedItems[tip.id] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-5 pt-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <ul className="space-y-3">
                    {tip.tips.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <i className="fa-solid fa-gavel text-yellow-500 mt-1"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
          
          {activeTab === 'emotionManagement' && knowledgeData.emotionManagement.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div 
                className={`p-5 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                onClick={() => toggleItem(method.id)}
              >
                <div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {method.duration}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedItems[method.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedItems[method.id] ? 'auto' : 0,
                  opacity: expandedItems[method.id] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-5 pt-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className="text-sm mb-4">{method.description}</p>
                  <h4 className="text-sm font-medium mb-3">操作步骤：</h4>
                  <ol className="space-y-2">
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {activeTab === 'antiSelfJustification' && knowledgeData.antiSelfJustification.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div 
                className={`p-5 flex justify-between items-center cursor-pointer ${isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedItems[item.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: expandedItems[item.id] ? 'auto' : 0,
                  opacity: expandedItems[item.id] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`p-5 pt-0 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h4 className="text-sm font-medium mb-3">核心要点：</h4>
                  <ul className="space-y-3">
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
}