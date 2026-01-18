/**
 * 大语言模型服务
 * 用于模拟调用大语言模型生成实时回复
 */

// 模拟的语言模型调用参数
interface LLMRequest {
  prompt: string;
  scenarioType?: string;
  tone?: string;
  maxTokens?: number;
}

// 生成回复的类型
export type GenerationType = 'response' | 'suggestion';

/**
 * 模拟大语言模型生成回复
 * @param request 大语言模型请求参数
 * @param type 生成类型：response - 生成对话回复，suggestion - 生成建议话术
 * @returns 生成的回复内容
 */
export const generateLLMResponse = async (
  request: LLMRequest,
  type: GenerationType = 'response'
): Promise<string> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // 提取关键信息
  const { prompt, scenarioType = 'general', tone = 'strong', maxTokens = 200 } = request;
  
  // 根据场景、语气和输入内容生成回复
  let generatedResponse = '';
  
  // 基于不同的场景生成不同的回复
  switch (scenarioType) {
    case 'work':
      generatedResponse = generateWorkResponse(prompt, tone, type);
      break;
    case 'family':
      generatedResponse = generateFamilyResponse(prompt, tone, type);
      break;
    case 'consumer':
      generatedResponse = generateConsumerResponse(prompt, tone, type);
      break;
    case 'public':
      generatedResponse = generatePublicResponse(prompt, tone, type);
      break;
    case 'relationship':
      generatedResponse = generateRelationshipResponse(prompt, tone, type);
      break;
    default:
      generatedResponse = generateGeneralResponse(prompt, tone, type);
  }
  
  // 限制回复长度
  if (generatedResponse.length > maxTokens) {
    generatedResponse = generatedResponse.substring(0, maxTokens) + '...';
  }
  
  return generatedResponse;
};

/**
 * 生成通用场景的回复
 */
const generateGeneralResponse = (prompt: string, tone: string, type: GenerationType): string => {
  if (type === 'suggestion') {
    switch (tone) {
      case 'attack':
        return `针对你说的"${prompt}"，我建议你可以这样强势回应：你这是什么意思？我做什么事轮不到你指手画脚！有本事你自己来做，没本事就闭嘴！`;
      case 'sarcastic':
        return `针对你说的"${prompt}"，我建议你可以这样阴阳怪气地回应：哎哟，您可真是厉害啊！说的好像自己什么都懂似的。您这么有本事，怎么不去拯救世界啊？`;
      case 'xhsStyle':
        return `针对你说的"${prompt}"，我建议你可以这样用小红书风格回应：咱就是说，你这样说真的很过分哎！大家都是成年人了，说话能不能有点分寸啊？`;
      default:
        return `针对你说的"${prompt}"，我建议你可以这样回应：我理解你的观点，但我有不同的看法。让我们理性地讨论这个问题，而不是相互指责。`;
    }
  } else {
    switch (tone) {
      case 'attack':
        return `你说的"${prompt}"根本就是在无理取闹！我不想和你争论，因为你根本不讲道理！`;
      case 'sarcastic':
        return `哎哟，您说的可真有道理啊！我都快被您说服了呢～不过话说回来，您确定您知道自己在说什么吗？`;
      case 'xhsStyle':
        return `我真的会谢！您说的"${prompt}"也太让人无语了吧！怎么会有人说出这种话啊？`;
      default:
        return `关于你提到的"${prompt}"，我认为我们可以从多个角度来看待这个问题。首先...`;
    }
  }
};

/**
 * 生成职场场景的回复
 */
const generateWorkResponse = (prompt: string, tone: string, type: GenerationType): string => {
  if (type === 'suggestion') {
    switch (tone) {
      case 'attack':
        return `针对你说的"${prompt}"，我建议你可以这样强势回应：工作就是工作，别找那么多借口！大家都在努力完成任务，就你特殊？你要是做不了就直说，别耽误整个团队的进度！`;
      case 'sarcastic':
        return `针对你说的"${prompt}"，我建议你可以这样阴阳怪气地回应：哎哟，您可真是大忙人啊！我们都在加班加点，就您悠哉悠哉的。您这工作效率可真是"令人钦佩"啊～`;
      case 'xhsStyle':
        return `针对你说的"${prompt}"，我建议你可以这样用小红书风格回应：咱就是说，职场上最重要的就是责任心吧？你这样拖拖拉拉的，让其他人怎么看你啊？`;
      default:
        return `针对你说的"${prompt}"，我建议你可以这样回应：我理解你可能遇到了一些困难，但我们的项目进度确实比较紧张。你看我们能不能一起讨论一下解决方案？`;
    }
  } else {
    switch (tone) {
      case 'attack':
        return `你说的"${prompt}"完全是在推卸责任！上次的任务你也拖了很久，这次又来这一套！我告诉你，再这样下去，我就要向领导反映了！`;
      case 'sarcastic':
        return `哎哟，您终于来了！我还以为您今天又要"有事请假"呢～您可真是我们团队的"宝贵财富"啊！`;
      case 'xhsStyle':
        return `我真的会谢！合着就你工作忙，我们都很闲是吧？大家都在为项目努力，就你一个人拖后腿，这也太说不过去了吧！`;
      default:
        return `关于你提到的"${prompt}"，我认为我们需要进一步沟通。作为团队的一员，我们应该互相支持，共同解决问题。你看什么时候方便，我们可以详细讨论一下？`;
    }
  }
};

/**
 * 生成家庭场景的回复
 */
const generateFamilyResponse = (prompt: string, tone: string, type: GenerationType): string => {
  if (type === 'suggestion') {
    switch (tone) {
      case 'attack':
        return `针对你说的"${prompt}"，我建议你可以这样强势回应：我的事不用你们管！我已经是成年人了，知道自己在做什么！你们再这样唠叨，我就搬出去住！`;
      case 'sarcastic':
        return `针对你说的"${prompt}"，我建议你可以这样阴阳怪气地回应：哎哟，您又开始了！去年说我不急，今年就嫌我老了。要不您给我介绍个对象？是个活的就行，对吧？`;
      case 'xhsStyle':
        return `针对你说的"${prompt}"，我建议你可以这样用小红书风格回应：咱就是说，结婚又不是买菜，哪能随便找个人就对付啊？我也想找到合适的人啊，可感情这种事急不来不是吗？`;
      default:
        return `针对你说的"${prompt}"，我建议你可以这样回应：我理解你们的关心，但我有自己的计划和节奏。请相信我，我会对自己的人生负责的。`;
    }
  } else {
    switch (tone) {
      case 'attack':
        return `你说的"${prompt}"简直不可理喻！我有我自己的生活，不需要你们指手画脚！你们再这样逼我，我就再也不回家了！`;
      case 'sarcastic':
        return `哎哟，您可真是操碎了心啊！等我结了婚，您是不是还要催我生孩子？生完孩子是不是还要催我生二胎？`;
      case 'xhsStyle':
        return `我真的会谢！合着我活着就是为了结婚生子吗？我也有自己的人生规划啊，能不能尊重一下我的选择？`;
      default:
        return `关于你提到的"${prompt}"，我知道你们是出于关心，但我希望你们能够理解和尊重我的选择。每个人都有自己的人生道路，我希望能够按照自己的节奏走下去。`;
    }
  }
};

/**
 * 生成消费场景的回复
 */
const generateConsumerResponse = (prompt: string, tone: string, type: GenerationType): string => {
  if (type === 'suggestion') {
    switch (tone) {
      case 'attack':
        return `针对你说的"${prompt}"，我建议你可以这样强势回应：别跟我扯那些没用的！我花了钱买的东西有问题，你们必须给我退款！少在这儿给我拖延时间！`;
      case 'sarcastic':
        return `针对你说的"${prompt}"，我建议你可以这样阴阳怪气地回应：哎哟，您可真是"优质客服"啊！我问一句您答一句，跟挤牙膏似的。要不我给您颁个"最佳敷衍奖"？`;
      case 'xhsStyle':
        return `针对你说的"${prompt}"，我建议你可以这样用小红书风格回应：咱就是说，作为消费者我花了钱是不是应该得到相应的服务啊？你们这样推三阻四的算怎么回事啊？`;
      default:
        return `针对你说的"${prompt}"，我建议你可以这样回应：您好，我想和您反映一个问题。我购买的商品出现了一些质量问题，希望您能够帮我解决一下。`;
    }
  } else {
    switch (tone) {
      case 'attack':
        return `你说的"${prompt}"完全是在推卸责任！你们这是欺诈消费者！我告诉你们，我已经保留了所有证据，再不给我解决，我就去消费者协会投诉你们！`;
      case 'sarcastic':
        return `哎哟，您这服务态度可真好啊！我花了钱买气受是吧？你们这店可真是"童叟无欺"啊！`;
      case 'xhsStyle':
        return `我真的会谢！合着你们就是这么对待消费者的？东西有问题不给解决，还想打发我走？信不信我发小红书曝光你们？`;
      default:
        return `关于你提到的"${prompt}"，我希望能够得到一个合理的解释和解决方案。作为消费者，我有权维护自己的合法权益。`;
    }
  }
};

/**
 * 生成公共场所场景的回复
 */
const generatePublicResponse = (prompt: string, tone: string, type: GenerationType): string => {
  if (type === 'suggestion') {
    switch (tone) {
      case 'attack':
        return `针对你说的"${prompt}"，我建议你可以这样强势回应：你以为这是你家啊？想怎么着就怎么着！公共场合有点公德心行吗？再吵吵信不信我报警？`;
      case 'sarcastic':
        return `针对你说的"${prompt}"，我建议你可以这样阴阳怪气地回应：哎哟，您可真"厉害"啊！这么多人都在排队，就您特殊？是觉得自己比别人高贵怎么着？`;
      case 'xhsStyle':
        return `针对你说的"${prompt}"，我建议你可以这样用小红书风格回应：咱就是说，公共场合说话能不能小声点？你这么大声嚷嚷，别人还要不要休息了？`;
      default:
        return `针对你说的"${prompt}"，我建议你可以这样回应：您好，我想和您商量一下。您的行为已经影响到了其他人，请您注意一下好吗？`;
    }
  } else {
    switch (tone) {
      case 'attack':
        return `你说的"${prompt}"简直是胡说八道！公共场合要遵守公共秩序，这是基本的社会公德！你连这个都不懂吗？`;
      case 'sarcastic':
        return `哎哟，您可真是"热心肠"啊！什么事都要插一脚，也不看看自己有没有那个资格！`;
      case 'xhsStyle':
        return `我真的会谢！合着这公共场合是你家开的啊？想怎么着就怎么着，一点都不考虑别人的感受！`;
      default:
        return `关于你提到的"${prompt}"，我认为我们应该互相尊重，共同维护良好的公共环境。每个人都有责任遵守公共秩序，你说是不是？`;
    }
  }
};

/**
 * 生成亲密关系场景的回复
 */
const generateRelationshipResponse = (prompt: string, tone: string, type: GenerationType): string => {
  if (type === 'suggestion') {
    switch (tone) {
      case 'attack':
        return `针对你说的"${prompt}"，我建议你可以这样强势回应：你到底有没有心啊？我为你付出了这么多，你就是这么对我的？我真是瞎了眼才会看上你！`;
      case 'sarcastic':
        return `针对你说的"${prompt}"，我建议你可以这样阴阳怪气地回应：哟，您终于想起我了？我还以为您眼里只有工作/游戏/朋友呢～`;
      case 'xhsStyle':
        return `针对你说的"${prompt}"，我建议你可以这样用小红书风格回应：咱就是说，谈恋爱最重要的就是互相尊重和包容吧？你这样总是忽略我的感受，让我怎么继续和你在一起啊？`;
      default:
        return `针对你说的"${prompt}"，我建议你可以这样回应：亲爱的，我知道我们之间出现了一些问题，但我希望我们能够心平气和地谈一谈。`;
    }
  } else {
    switch (tone) {
      case 'attack':
        return `你说的"${prompt}"太让我失望了！我对你那么好，你却这么伤害我！你的良心被狗吃了吗？`;
      case 'sarcastic':
        return `哎哟，您可真是"善解人意"啊！我说东您偏说西，我说狗您偏说鸡。要不您自己过得了？省得委屈了您～`;
      case 'xhsStyle':
        return `我真的会谢！合着在你眼里工作/游戏比我还重要是吧？那你和工作/游戏过去吧，别来找我了！`;
      default:
        return `关于你说的"${prompt}"，我觉得我们需要好好沟通一下。我们是最亲密的人，应该互相理解和支持，而不是互相伤害。`;
    }
  }
};