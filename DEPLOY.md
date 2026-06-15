# TokenHub 部署指南（Cloudflare Dashboard）

全程在 Cloudflare Web 控制台操作，无需本地 CLI。

---

## 1. 推送代码到 GitHub

```bash
cd TokenHub
git init
git add .
git commit -m "init TokenHub"
git remote add origin https://github.com/你的用户名/tokenhub.git
git push -u origin main
```

## 2. 在 Cloudflare Dashboard 创建 Worker

进入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Worker** → **Deploy a Worker**。

在 Worker 页面中：

- **名称**：`tokenhub`
- 先直接点 **Deploy** 创建一个空 Worker

## 3. 连接 GitHub 仓库

在 Worker 详情页 → **Settings** → **Git integration** → **Connect to Git**：

- 授权 GitHub
- 选择 `你的用户名/tokenhub`
- 分支：`main`
- **Build configuration**：留空（项目无构建步骤）
- **Deploy**：自动部署
- 点 **Save**

之后每次 `git push` 会自动部署。

## 4. 创建 D1 数据库

回到 Dashboard → **Workers & Pages** → **D1 SQL** → **Create database**：

- 名称：`tokenhub-db`
- 地域：默认或 **APAC**（选离你最近的）

创建后进入 DB 详情 → **Console**（控制台），把 `schema.sql` 的完整内容粘贴进去执行。确认 6 张表全部创建成功。

## 5. 配置 D1 数据库绑定

D1 binding 必须写在 `wrangler.toml` 中（已预填），**不要**在 Dashboard UI 中手动绑定。Dashboard
手动绑定每次 Git 重新部署会被清掉，导致 `env.DB` 为 `undefined` 而报 500 错误。

打开 `wrangler.toml`，将 `database_id` 替换为你的 D1 数据库 ID：

```toml
[[d1_databases]]
binding = "DB"
database_name = "tokenhub-db"
database_id = "你的D1数据库ID"   # ← 替换为实际 ID
```

数据库 ID 在 Dashboard → **D1** → `tokenhub-db` 详情页顶部查看（形如 `a1b2c3d4-...`）。

> `database_id` 不是敏感信息（仅为资源标识符），放配置文件中是安全的。

## 6. 配置环境变量

`AUTH_MODE` 和 `SSO_ISSUER` 已写在 `wrangler.toml` 中，Git 部署会自动注入，**无需**在 Dashboard 重复设置。

只需在 Dashboard 添加加密变量：

| Variable name | Value | 位置 |
|---|---|---|
| `SSO_PUBLIC_KEY` | 你的 GoAuth RSA 公钥（PEM 全文，带 `\n` 的 TOML 单行格式） | **Secrets**（加密变量） |

Worker → **Settings** → **Variables** → **Add secret**。

## 7. 配置 Cron 触发

Worker → **Settings** → **Triggers** → **Cron Triggers** → **Add Cron Trigger**：

```
*/30 * * * *
```

保存后每 30 分钟自动检测所有开启 `auto_health` 的接口。

## 8. 触发首次部署

进入 Worker 详情页 → **Git integration** → **Manually deploy from branch**，选择 `main` 点击部署。

待状态显示 **Success** 后即可访问。

---

## 完整检查清单

| 步骤 | 完成 |
|---|---|
| 代码推送到 GitHub | ☐ |
| Worker 创建 + Git 连接 | ☐ |
| D1 数据库创建 + schema 初始化 | ☐ |
| `wrangler.toml` 中填入 D1 `database_id` | ☐ |
| Secret `SSO_PUBLIC_KEY` 注入（Dashboard） | ☐ |
| Cron 触发器配置（Dashboard） | ☐ |
| 首次部署成功 | ☐ |
| 登录验证 + 头像显示确认 | ☐ |

---

## 更新公钥

Dashboard → Worker → **Settings** → **Variables** → 编辑 `SSO_PUBLIC_KEY`，下次请求自动生效，无需重新部署。

## 升级代码

```bash
# 修改代码后
git add .
git commit -m "feat: ..."
git push
```

Dashboard 会自动拉取并部署。可在 Worker → **Git integration** 查看部署状态。
