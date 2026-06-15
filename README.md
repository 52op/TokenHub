# TokenHub

AI API 接口智能检测与管理工具，部署在 Cloudflare Workers 上。

## 功能

- **智能检测** — 输入一个 URL，自动探测支持的协议（OpenAI Chat / Responses / Anthropic）和可用模型
- **接口管理** — 保存检测结果，一个接口地址下可挂多个 API Key，支持别名备注
- **健康检测** — 手动单 Key 检测 + 批量检测 + 定时自动检测（Cron Trigger），历史记录可追溯
- **SSO 登录** — 对接 [GoAuth](https://github.com/52op/GoAuth) 统一认证，多用户隔离，管理员可管理用户
- **Expo 风格 UI** — 白底黑字、Inter 字体、干净利落的开发者工具质感

## 快速开始

```bash
git clone https://github.com/你的用户名/tokenhub.git
cd tokenhub
npm install
```

部署步骤见 [DEPLOY.md](DEPLOY.md)。

## 架构

```
TokenHub/
├── wrangler.toml          # Worker 配置 + D1 绑定
├── schema.sql             # D1 数据库表结构（6 张表）
├── src/
│   ├── index.js           # 入口 + 路由
│   ├── config.js          # 常量配置
│   ├── utils.js           # 工具函数
│   ├── auth.js            # SSO 认证（RS256 JWT）
│   ├── db.js              # D1 数据访问层
│   ├── detect.js          # API 智能检测引擎
│   ├── routes/            # API 路由（7 个模块）
│   └── frontend/html.js   # 前端 SPA（内联在 Worker 中）
```

## 技术栈

- **运行时**：Cloudflare Workers
- **数据库**：Cloudflare D1（SQLite）
- **认证**：GoAuth SSO（RS256 JWT）
- **前端**：原生 JS SPA（无框架，内联在 Worker）

## 依赖

| 功能 | 说明 |
|---|---|
| GoAuth | 统一认证服务，需提前部署 |
| Cloudflare D1 | 数据库，需创建并绑定 |
| SSO_PUBLIC_KEY | GoAuth RSA 公钥，通过 Secret 注入 |

## License

MIT
