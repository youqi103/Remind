import { memo, useCallback } from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import MarkdownContent from './MarkdownContent.jsx';
import './Message.css';

/**
 * 单条对话消息组件
 * @param {Object} props
 * @param {'user' | 'ai'} props.role - 消息角色
 * @param {string} props.content - 消息内容
 * @param {boolean} [props.streaming] - 是否正在流式输出
 * @param {Function} [props.onCopy] - 复制回调
 * @param {Function} [props.onRetry] - 重试回调
 */
function Message({ role, content, streaming, onCopy, onRetry }) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    onCopy?.(content);
  }, [content, onCopy]);

  const isUser = role === 'user';

  return (
    <div className={`message message--${role}`} role="article" aria-label={`${isUser ? '你' : 'AI'}的消息`}>
      <div className="message__avatar" aria-hidden="true">
        {isUser ? '你' : 'AI'}
      </div>
      <div className="message__content">
        <div className="message__bubble">
          {isUser ? (
            <p>{content}</p>
          ) : (
            <MarkdownContent content={content} />
          )}
          {streaming && <span className="message__cursor" aria-label="正在输入" />}
        </div>
        {!streaming && (
          <div className="message__actions">
            <button
              className="message__action-btn"
              onClick={handleCopy}
              title="复制消息"
              aria-label="复制消息"
              type="button"
            >
              <Copy size={14} />
            </button>
            {!isUser && onRetry && (
              <button
                className="message__action-btn"
                onClick={onRetry}
                title="重新生成"
                aria-label="重新生成"
                type="button"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Message);
