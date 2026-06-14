import { useRef, useEffect, useCallback } from 'react';
import Message from './Message.jsx';
import './MessageList.css';

/**
 * 消息列表组件
 * 支持自动滚动到底部（用户未手动上滚时）
 * @param {Object} props
 * @param {Array<{id: string, role: 'user'|'ai', content: string, streaming?: boolean}>} props.messages
 * @param {Function} [props.onCopy] - 复制消息回调
 * @param {Function} [props.onRetry] - 重试消息回调
 */
function MessageList({ messages, onCopy, onRetry }) {
  const listRef = useRef(null);
  const bottomRef = useRef(null);
  const isAutoScrollRef = useRef(true);

  // 监听滚动，判断用户是否手动上滚
  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    // 距离底部超过 80px 视为用户手动上滚
    isAutoScrollRef.current = distanceFromBottom < 80;
  }, []);

  // 新消息或流式更新时自动滚动
  useEffect(() => {
    if (isAutoScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="message-list"
      ref={listRef}
      onScroll={handleScroll}
      role="log"
      aria-label="对话消息列表"
      aria-live="polite"
    >
      {messages.map((msg) => (
        <Message
          key={msg.id}
          role={msg.role}
          content={msg.content}
          streaming={msg.streaming}
          onCopy={onCopy}
          onRetry={msg.role === 'ai' ? onRetry : undefined}
        />
      ))}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}

export default MessageList;
