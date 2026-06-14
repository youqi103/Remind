import { Sparkles, Search, BookmarkPlus } from 'lucide-react';
import './EmptyState.css';

/**
 * 空对话状态组件
 * 引导用户开始对话
 * @param {Object} props
 * @param {Function} [props.onQuickAction] - 快捷操作回调
 */
function EmptyState({ onQuickAction }) {
  const suggestions = [
    { icon: BookmarkPlus, label: '保存一条经验', prompt: '帮我保存一条经验：' },
    { icon: Search, label: '搜索我的经验', prompt: '搜索关于' },
    { icon: Sparkles, label: '看看 AI 能做什么', prompt: '你能帮我做什么？' },
  ];

  return (
    <div className="empty-state">
      <div className="empty-state__header">
        <h1 className="empty-state__title">Remind</h1>
        <p className="empty-state__subtitle">用对话管理你的经验</p>
      </div>
      <div className="empty-state__suggestions">
        {suggestions.map(({ icon: Icon, label, prompt }) => (
          <button
            key={label}
            className="empty-state__suggestion"
            onClick={() => onQuickAction?.(prompt)}
            type="button"
          >
            <Icon size={18} className="empty-state__suggestion-icon" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;
