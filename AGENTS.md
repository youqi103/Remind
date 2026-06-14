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

### 2026-06-14: Prisma Studio 在 Windows 上 EPERM 崩溃
- **问题**：Windows 上运行 `npx prisma studio` 时 spawn 子进程权限不足
- **表现**：`Error: spawn EPERM`，Studio 打印端口后立即崩溃
- **修复**：使用 `npx prisma studio --browser none`，手动在浏览器打开地址
- **预防**：启动 Prisma Studio 时始终加 `--browser none` 参数

### 2026-06-14: Prisma 7 不再支持 schema.prisma 中的 url 属性
- **问题**：Prisma 7.x 将数据库连接配置从 schema.prisma 迁移到 prisma.config.ts
- **表现**：`npx prisma migrate dev` 报错 `The datasource property 'url' is no longer supported in schema files`
- **修复**：删除 schema.prisma 中的 `url = env("DATABASE_URL")`，仅在 prisma.config.ts 的 `datasource.url` 中配置
- **预防**：使用 Prisma 7 时，连接 URL 只在 prisma.config.ts 中维护

### 2026-06-14: datasource provider 必须与 DATABASE_URL 格式匹配
- **问题**：schema.prisma 的 provider 与 .env 中 DATABASE_URL 的协议不一致
- **表现**：`P1013 - The provided database string is invalid. must start with the protocol postgresql://`
- **修复**：将 `provider = "postgresql"` 改为 `provider = "sqlite"`，匹配 `file:./remind.db` 格式
- **预防**：修改 provider 或 DATABASE_URL 时，确保两者对应同一数据库类型
