/**
 * 调试版本的LLM服务，用于查看调用细节
 */

interface LLMRequest {
  prompt: string;
  scenarioType?: string;
  tone?: string;
  maxTokens?: number;
}

export type GenerationType = 'response' | 'suggestion';

/**
 * 增强的LLM响应生成器，添加详细的调试信息
 */
export const generateLLMResponseDebug = async (
  request: LLMRequest,
  type: GenerationType = 'response'
): Promise<{
  response: string;
  debugInfo: {
    request: LLMRequest;
    processingTime: number;
    timestamp: string;
    scenarioType: string;
    tone: string;
    generationType: GenerationType;
  };
}> => {
  const startTime = Date.now();
  
  // 提取参数
  const { prompt, scenarioType = 'general', tone = 'strong', maxTokens = 200 } = request;
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // 这里应该是真实LLM API调用，目前是模拟
  let generatedResponse = '';
  
  // 基于场景生成响应（模拟逻辑）
  switch (scenarioType) {
    case 'work':
      generatedResponse = `工作场景回应: ${prompt}`;
      break;
    case 'family':
      generatedResponse = `家庭场景回应: ${prompt}`;
      break;
    default:
      generatedResponse = `通用回应: ${prompt}`;
  }
  
  // 限制长度
  if (generatedResponse.length > maxTokens) {
    generatedResponse = generatedResponse.substring(0, maxTokens) + '...';
  }
  
  const processingTime = Date.now() - startTime;
  
  return {
    response: generatedResponse,
    debugInfo: {
      request,
      processingTime,
      timestamp: new Date().toISOString(),
      scenarioType,
      tone,
      generationType: type
    }
  };
};

/**
 * 控制台打印LLM调用详情
 */
export const logLLMRequest = (request: LLMRequest, type: GenerationType) => {
  console.group('🚀 LLM调用详情');
  console.log('📤 请求参数:', {
    prompt: request.prompt,
    scenarioType: request.scenarioType,
    tone: request.tone,
    maxTokens: request.maxTokens,
    generationType: type
  });
  console.log('⏰ 时间戳:', new Date().toISOString());
  console.groupEnd();
};

/**
 * 控制台打印LLM响应详情
 */
export const logLLMResponse = (response: string, processingTime: number) => {
  console.group('📥 LLM响应详情');
  console.log('✅ 生成响应:', response);
  console.log('⏱️ 处理时间:', processingTime, 'ms');
  console.log('📏 响应长度:', response.length, '字符');
  console.groupEnd();
};