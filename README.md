# 千模炼阵 · AI 安全靶场

Thousand-Model Forge AI Security Range (TM-Forge-ASR)

TM-Forge-ASR = TM-Forge (Thousand-Model Forge，千模炼阵) + ASR (AI Security Range)

一个教育性的 AI 安全靶场，通过模拟提示词注入等攻防演练帮助理解对话式 AI 的安全风险与防护方法。

## English Overview

- Purpose: An educational AI Security Range focusing on prompt-injection and dialogue-system security.
- Architecture: Frontend (nginx static), Backend (FastAPI `/api/process`), Reverse proxy (`/api` → backend), secrets via `.env`.
- Security: No secrets or flags in the browser; flags are issued by the backend upon successful detection.
- Quick Start:
  1) Create `.env` from `.env.example`
  2) `docker compose up -d --build`
  3) Open `http://localhost:9009`

## 项目亮点

- 真实 LLM 在线判定：后端以 OpenAI 或任意 OpenAI API 兼容供应商（通过 `OPENAI_BASE_URL`）调用真实大模型，由 AI 结合服务器侧检测判定是否通关。
- 安全架构设计：密钥与 `flag` 不在前端；由 AI 做“初判”，后端做“终判”。通关有两种模式（后端可切换）：
  - 标志词模式：AI 在认为玩家已展示目标攻击技术时，仅在回复末尾输出专属标志词 `[[LEVEL_PASS_<关卡ID>]]`，后端检测到标志词后发放 `flag`（AI 不直接包含 `flag`）。
  - 直返 `flag` 模式：后端通过环境变量 `EXPOSE_FLAG_TO_AI=true` 告知 AI 当前关卡的 `flag`，AI 仅在判定通过时把 `flag` 写入回复，后端检测到后发放。
- 关卡教学清晰：十个递进主题覆盖常见提示词攻防技法，判定逻辑在后端可扩展与可维护。
- 开箱即用部署：Compose v2 一键构建与运行，支持本地与云端环境。
- 供应商无锁定：支持 OpenAI 或任何实现 OpenAI Chat Completions 接口的第三方（设置 `OPENAI_BASE_URL` 与 `OPENAI_API_KEY` 即可）。

## 在线体验

- Demo 环境：`http://113.44.59.124:9009/`

## 🎯 项目概述

平台通过十个难度递进的关卡，用户与“AI安全专家”对话并尝试展示不同类型的提示词注入技巧以学习与验证防护策略。核心目标：

- 理解各种提示词注入与绕过技巧的原理和危害
- 学习对话式系统的防御面与最佳实践
- 在安全靶场中进行可控的攻防演练
- 提升安全意识与分析能力

## 🏗️ 技术架构

### 现代化安全架构
- 前端：纯静态站点（HTML/CSS/JavaScript），`nginx` 提供静态资源，UI 保持不变
- 后端：`FastAPI` 提供 `/api/process`，负责模型调用代理、攻击检测与服务器端发放 `flag`
- 网关：`nginx` 反向代理 `/api` → `backend:8000/api/`，同源访问与隐藏后端地址
- 配置与凭据：通过环境变量注入，前端不含任何密钥或 `flag`

### 核心功能模块
1. 关卡管理系统：十关渐进式挑战
2. AI 响应代理：后端安全调用模型 API并返回上下文一致的回复
3. 判定与发放：AI 根据系统提示进行“初判”，后端对 AI 回复进行“终判”（攻击模式匹配/标志词或 `flag` 检测）。仅当后端终判通过时发放 `flag`。
4. 进度追踪：前端本地存储完成状态与已获取 `flag`
5. 视觉效果：动画与交互增强保持原有体验

## 🎮 游戏规则

### 基本玩法
1. **选择关卡**: 从十个难度递增的关卡中选择
2. **对话挑战**: 与AI安全专家对话，尝试获取flag
3. **学习攻击**: 使用不同的提示词注入技术
4. **获得flag**: 成功攻击后获得关卡flag
5. **解锁下一关**: 完成当前关卡解锁下一关

### 关卡主题（判定由 AI 与后端共同完成）

- 直接询问（简单）
- 简单绕过（中等）
- 角色扮演（中等）
- 上下文混淆（困难）
- 分步诱导（专家）
- 编码绕过（专家）
- 情感操控（大师）
- 逆向工程（大师）
- 多模态攻击（大师）
- 高级混淆（大师）

### 特殊机制（精简）

- 提示系统：可使用提示点数；完成关卡可获得提示点数
- 成就系统：包含多类隐藏式成就，通关与特定行为触发

**系统特点**
- 已解锁成就显示详细信息
- 未解锁成就按类别隐藏，显示数量概览
- 鼓励探索和技能专精

## 🚀 快速开始

### 本地运行（Docker Compose v2）
1. 配置环境变量（创建 `.env`，参考下方示例）
2. 构建并启动：
   ```bash
   docker compose up -d --build
   ```
3. 访问：`http://localhost:9009`

### `.env` 示例
```
OPENAI_API_KEY=替换为你的密钥
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1/chat/completions
ADMIN_SAFE_WORD=eaglelab_yyds
EXPOSE_FLAG_TO_AI=false
```

### 文件结构
```
ai-security-challenge/
├── index.html                # 前端页面
├── main.js                   # 前端游戏逻辑（不含flag/密钥）
├── animations.js             # 前端动画效果
├── api_test.html             # 后端接口联调测试页（可选，非生产）
├── default.conf              # nginx 站点与反向代理配置
├── backend/
│   ├── app.py               # 后端API与攻击检测、flag发放
│   ├── requirements.txt     # 后端依赖
│   └── Dockerfile           # 后端镜像构建
├── Dockerfile                # 前端镜像构建（nginx）
├── docker-compose.yml        # 前后端编排
├── README.md                 # 项目说明（本文件）
├── DEPLOYMENT.md             # 部署指南
├── ai_behavior.md            # AI 行为规范（文档，非运行时依赖）
└── DESIGN.md                 # 设计文档（架构与数据流）
```

## 文档说明
- `ai_behavior.md`：用于记录 AI 角色设定、语气原则与教学提示模板，帮助编写与维护系统提示；当前运行时不直接引用该文件（后端实际使用的角色与示例来自 `backend/app.py` 的 `LEVEL_META` 与 `LEVEL_EXAMPLES`）。

## 🎨 用户界面

### 主要组件
- 顶部导航：进度与提示点数
- 关卡选择：显示解锁与完成状态
- 聊天界面：与“AI安全专家”对话挑战
- 知识面板：关卡主题与成就概览

## 其他说明
- 教育用途：仅用于安全教学与演练
- 供应商兼容：支持 OpenAI 与兼容 `OPENAI_BASE_URL` 的第三方
- 安全策略：后端判定与发放，不在前端暴露密钥与 `flag`

## ⚠️ 重要提醒

### 教育目的
- 本平台仅用于教育和学习目的
- 旨在帮助理解AI安全威胁
- 提高系统防护能力

### 道德规范
- 请勿在实际环境中进行恶意攻击
- 学习的目的是更好地保护系统
- 遵守相关法律法规

### 安全建议
- 在受控环境中进行安全测试
- 及时更新安全防护措施
- 持续关注最新的安全威胁

## 🎯 最佳实践

### 学习路径
1. 从第一关开始，循序渐进
2. 仔细阅读每个关卡的教育内容
3. 尝试不同的攻击方法
4. 理解防御原理
5. 应用到实际工作中

### 技巧建议
- 多尝试不同的表达方式
- 注意观察AI的响应模式
- 善用提示系统学习
- 记录成功的攻击方法

## 🔧 自定义扩展

### 添加新关卡
1. 在前端 `levels` 中添加关卡元数据（标题、难度、角色、描述）
2. 在后端 `LEVEL_META` 与 `LEVEL_EXAMPLES` 中添加对应关卡信息与示范
3. 在后端 `detect()` 中实现该关卡攻击判定逻辑
4. 如需自定义通关标志模式，调整后端 `pass_marker()` 或开启 `EXPOSE_FLAG_TO_AI`

### 修改AI行为
1. 在后端系统提示中调整角色与难度语气（`backend/app.py`）
2. 根据需要微调攻击检测与标志词策略
3. 保持前端不含敏感数据与通关示例

## 📱 兼容性

### 支持的浏览器
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 设备支持
- 桌面端：完整功能
- 平板端：优化布局
- 移动端：响应式设计

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发建议
- 保持代码风格一致
- 添加适当的注释
- 测试所有功能
- 更新相关文档

## 📄 许可证

本项目仅用于教育和学习目的。请遵守相关法律法规，不要将学到的技术用于恶意用途。

## 🙏 致谢

感谢所有为AI安全领域做出贡献的研究者和实践者。让我们共同努力，构建更安全的AI世界！

---

**记住：学习的目的是为了更好地保护系统，而不是造成伤害！** 🛡️
