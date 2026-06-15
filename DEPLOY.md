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

## 5. 绑定 D1 到 Worker

回到 Worker 详情页（tokenhub）→ **Settings** → **Bindings** → **Add binding**：

- **Binding type**：`D1 Database`
- **Variable name**：`DB`（必须与 wrangler.toml 一致）
- **Database**：选择 `tokenhub-db`

## 6. 配置环境变量

Worker → **Settings** → **Variables**：

**添加明文变量（Add variable）：**

| Variable name | Value |
|---|---|
| `AUTH_MODE` | `sso` |
| `SSO_ISSUER` | `https://auth.it0731.cn` |

**添加加密变量（Add secret）：**

| Variable name | Value |
|---|---|
| `SSO_PUBLIC_KEY` | 你的 GoAuth RSA 公钥（PEM 全文） |

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
| D1 Binding 关联到 Worker | ☐ |
| 环境变量 AUTH_MODE + SSO_ISSUER 设置 | ☐ |
| Secret SSO_PUBLIC_KEY 注入 | ☐ |
| Cron 触发器配置 | ☐ |
| 首次部署成功 | ☐ |

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
