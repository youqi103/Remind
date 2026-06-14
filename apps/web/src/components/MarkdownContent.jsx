import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownContent.css';

/**
 * Markdown 内容渲染组件
 * 用于 AI 消息的 Markdown 渲染，支持 GFM 语法和代码块
 * @param {Object} props
 * @param {string} props.content - Markdown 文本内容
 */
function MarkdownContent({ content }) {
  const components = useMemo(() => ({
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return <code {...props}>{children}</code>;
      }
      // 代码块：提取语言标识
      const language = className?.replace('language-', '') || '';
      return (
        <div className="markdown-code-block">
          {language && (
            <div className="markdown-code-block__header">
              <span className="markdown-code-block__lang">{language}</span>
              <button
                className="markdown-code-block__copy"
                onClick={() => {
                  navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                }}
                type="button"
                aria-label="复制代码"
              >
                复制
              </button>
            </div>
          )}
          <code className={className} {...props}>
            {children}
          </code>
        </div>
      );
    },
  }), []);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}

export default memo(MarkdownContent);
