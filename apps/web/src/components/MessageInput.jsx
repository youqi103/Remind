import { useState, useRef, useCallback } from 'react';
import { Plus, Send } from 'lucide-react';
import './MessageInput.css';

/**
 * 消息输入组件
 * 自适应多行输入框，左侧加号按钮，右侧发送按钮
 * Enter 发送，Shift+Enter 换行
 * @param {Object} props
 * @param {Function} props.onSend - 发送消息回调
 * @param {Function} [props.onOpenExperience] - 打开经验列表回调
 * @param {boolean} [props.disabled] - 是否禁用输入
 */
function MessageInput({ onSend, onOpenExperience, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  /** 自适应高度 */
  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    // 最大高度 200px，约 8 行
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, []);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    adjustHeight();
  }, [adjustHeight]);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    // 重置高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback((e) => {
    // Enter 发送，Shift+Enter 换行
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="message-input">
      <button
        className="message-input__addon-btn"
        onClick={onOpenExperience}
        title="添加经验"
        aria-label="打开经验列表"
        type="button"
      >
        <Plus size={20} />
      </button>
      <div className="message-input__field">
        <textarea
          ref={textareaRef}
          className="message-input__textarea"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          rows={1}
          disabled={disabled}
          aria-label="消息输入框"
        />
      </div>
      <button
        className="message-input__send-btn"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        title="发送消息"
        aria-label="发送消息"
        type="button"
      >
        <Send size={18} />
      </button>
    </div>
  );
}

export default MessageInput;
