# Remind

一个基于 AI 的智能提醒与对话应用，采用 Monorepo 架构，前后端分离开发。

## 技术栈

### 前端

- **框架**：React 18 + Vite
- **UI 组件库**：Arco Design
- **状态管理**：Redux Toolkit
- **实时流式传输**：Fetch + ReadableStream
- **Markdown 渲染**：react-markdown + shiki

### 后端

- **框架**：Node.js + NestJS
- **数据库**：SQLite + Prisma ORM
- **认证**：JWT + bcrypt

### 测试

- 前端：Vitest
- 后端：Jest

### 工程化

- **包管理**：pnpm 10 + Turborepo
- **语言**：TypeScript 6（strict 模式）
- **代码规范**：ESLint + Prettier
- **提交规范**：Conventional Commits

## 项目结构

```
Remind/
├── apps/           # 应用目录
│   ├── web/        # 前端应用（React + Vite）
│   └── server/     # 后端应用（NestJS）
├── packages/       # 共享包目录
│   └── shared/     # 前后端共享代码（类型、工具等）
├── turbo.json      # Turborepo 流水线配置
├── pnpm-workspace.yaml
└── tsconfig.json   # 根 TypeScript 配置
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 10

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## 常用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动所有应用的开发服务器 |
| `pnpm build` | 构建所有应用 |
| `pnpm lint` | 代码质量检查 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm test` | 运行所有测试 |

## 代码规范

- 组件文件不超过 300 行，超过则拆分
- 禁止使用 `any` 类型
- 所有公开 API 必须有 JSDoc 注释
- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范（feat:, fix:, refactor:, docs:）

## 开发流程

1. 创建功能分支进行开发
2. 代码变更后运行检查：

```bash
pnpm typecheck   # 类型检查
pnpm lint        # 代码质量检查
pnpm test        # 运行测试
```

3. 提交代码并创建 PR：

```bash
gh pr create
```

## 许可证

ISC
