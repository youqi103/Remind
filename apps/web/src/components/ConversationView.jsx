import { useState, useCallback, useRef } from 'react';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';
import EmptyState from './EmptyState.jsx';
import './ConversationView.css';

/** 生成唯一 ID */
let idCounter = 0;
function uid() {
  return `msg-${Date.now()}-${++idCounter}`;
}

/**
 * 模拟 AI 流式回复
 * 实际项目中替换为 Fetch + ReadableStream 调用后端 API
 * @param {string} userMessage - 用户消息
 * @param {Function} onChunk - 每收到一段文本的回调
 * @returns {Function} 取消函数
 */
function simulateStream(userMessage, onChunk) {
  const responses = {
    default: `我理解了你的问题。让我来帮你处理。\n\n这是一个模拟的 AI 回复。在实际项目中，这里会通过 Fetch + ReadableStream 连接后端 API，实现真正的流式输出。\n\n你可以尝试以下操作：\n\n- 保存一条经验\n- 搜索已有经验\n- 查看经验列表`,
    code: `好的，这是一个代码示例：\n\n\`\`\`javascript\nfunction saveExperience(title, content) {\n  // 保存经验到数据库\n  const experience = {\n    id: Date.now(),\n    title,\n    content,\n    createdAt: new Date().toISOString(),\n  };\n  return experience;\n}\n\`\`\`\n\n这个函数接收标题和内容，返回一个经验对象。`,
    experience: `我来帮你保存这条经验。\n\n经验已保存，包含以下信息：\n\n1. **标题**：从你的描述中提取\n2. **内容**：你提供的详细信息\n3. **标签**：自动生成的分类标签\n\n你随时可以通过搜索找到这条经验。`,
  };

  // 简单关键词匹配选择回复
  let text = responses.default;
  if (userMessage.includes('代码') || userMessage.includes('code')) {
    text = responses.code;
  } else if (userMessage.includes('经验') || userMessage.includes('保存')) {
    text = responses.experience;
  }

  let index = 0;
  const interval = setInterval(() => {
    // 每次输出 1-3 个字符，模拟流式效果
    const chunkSize = Math.floor(Math.random() * 3) + 1;
    const chunk = text.slice(index, index + chunkSize);
    index += chunkSize;
    onChunk(chunk, index >= text.length);
    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 30);

  return () => clearInterval(interval);
}

/**
 * 对话视图主容器
 * 管理消息状态、流式输出、用户交互
 */
function ConversationView() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const cancelRef = useRef(null);

  /** 发送消息 */
  const handleSend = useCallback((content) => {
    if (isStreaming) return;

    setError(null);

    // 添加用户消息
    const userMsg = { id: uid(), role: 'user', content };
    // 添加 AI 消息占位
    const aiMsg = { id: uid(), role: 'ai', content: '', streaming: true };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setIsStreaming(true);

    // 模拟流式输出
    const aiMsgId = aiMsg.id;
    cancelRef.current = simulateStream(content, (chunk, done) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id !== aiMsgId) return msg;
          return {
            ...msg,
            content: msg.content + chunk,
            streaming: !done,
          };
        })
      );
      if (done) {
        setIsStreaming(false);
        cancelRef.current = null;
      }
    });
  }, [isStreaming]);

  /** 重试最后一条 AI 消息 */
  const handleRetry = useCallback(() => {
    // 找到最后一条用户消息
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    // 移除最后一条 AI 消息
    setMessages((prev) => {
      const idx = prev.findLastIndex((m) => m.role === 'ai');
      if (idx === -1) return prev;
      return prev.slice(0, idx);
    });

    // 重新发送
    handleSend(lastUserMsg.content);
  }, [messages, handleSend]);

  /** 快捷操作 */
  const handleQuickAction = useCallback((prompt) => {
    handleSend(prompt);
  }, [handleSend]);

  /** 打开经验列表 */
  const handleOpenExperience = useCallback(() => {
    // TODO: 打开经验列表面板
  }, []);

  /** 复制消息 */
  const handleCopy = useCallback((content) => {
    // 复制已通过 navigator.clipboard 完成，此处可做 toast 提示
  }, []);

  const isEmpty = messages.length === 0;

  return (
    <div className="conversation-view">
      <div className="conversation-view__content">
        {isEmpty ? (
          <EmptyState onQuickAction={handleQuickAction} />
        ) : (
          <MessageList
            messages={messages}
            onCopy={handleCopy}
            onRetry={handleRetry}
          />
        )}
      </div>
      {error && (
        <div className="conversation-view__error" role="alert">
          <span>{error}</span>
          <button
            onClick={() => { setError(null); handleRetry(); }}
            type="button"
            className="conversation-view__error-retry"
          >
            重试
          </button>
        </div>
      )}
      <MessageInput
        onSend={handleSend}
        onOpenExperience={handleOpenExperience}
        disabled={isStreaming}
      />
    </div>
  );
}

export default ConversationView;
