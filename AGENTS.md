# 项目名
Remind
## 工作流
- 每次代码变更后运行 `pnpm test`
- 使用 Conventional Commits（feat:, fix:, refactor:, docs:）
- 完成后通过 `gh pr create` 创建 PR

## 技术栈
- 前端：
  - 框架：React 18 + Vite
  - UI：Arco Design
  - 状态：Redux Toolkit
  - 实时流式传输：Fetch + ReadableStream
  - Markdown：react-markdown + shiki
- 后端：
  - 框架：Node.js + NestJS
  - 数据库：SQLite + Prisma ORM
- 测试：
  - 前端：Vitest
  - 后端：Jest
- 认证：JWT + bcrypt

## 代码规范
- 组件文件不超过 300 行，超过则拆分
- 禁止使用 `any` 类型
- 所有公开 API 必须有 JSDoc 注释

## 必须运行的检查
修改完成后，按顺序运行：
1. `pnpm run typecheck` - 类型检查
2. `pnpm run lint` - 检查代码质量
3. `pnpm test` - 运行相关测试

## Gotchas（全局陷阱）

格式如下：
`
### yyyy-MM-dd: 标题
- **问题**：xx
- **表现**：xx
- **修复**：xx
- **预防**：xx
`
