# 千模炼阵 · AI 安全靶场 - 部署指南

## 项目概述

这是一个基于Web的AI安全挑战平台，采用前后端分离的安全架构，通过Docker轻松部署到云服务器。

### 环境变量与 .env
- 使用 `.env` 管理后端访问大模型所需的密钥与配置，Compose 会自动加载该文件中的变量。
- 在项目根目录创建 `.env`（参考 `.env.example`）：
```
OPENAI_API_KEY=你的密钥
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1/chat/completions
ADMIN_SAFE_WORD=eaglelab_yyds
EXPOSE_FLAG_TO_AI=false
```
- 说明：`EXPOSE_FLAG_TO_AI=false` 表示采用“标志词通关”更安全模式；设为 `true` 则改为“AI直返 flag”。

## 部署方式

### 方式一：使用Docker Compose（推荐）

#### Windows系统
1. 确保已安装Docker Desktop
2. 在项目根创建并填写 `.env`（参考上文与 `.env.example`）
3. 双击运行 `deploy.bat` 文件
4. 等待部署完成
5. 访问 http://localhost:9009

#### Linux/Mac系统
1. 确保已安装Docker和Docker Compose
2. 给脚本执行权限：`chmod +x deploy.sh`
3. 运行脚本：`./deploy.sh`
4. 访问 http://localhost:9009

### 方式二：手动Docker部署

```bash
docker build -t ai-security-frontend .
docker build -t ai-security-backend ./backend
docker network create ai-security-net || true
docker run -d --net ai-security-net -p 9009:80 --name ai-security-frontend ai-security-frontend
docker run -d --net ai-security-net --name ai-security-backend \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -e OPENAI_MODEL=$OPENAI_MODEL \
  -e OPENAI_BASE_URL=$OPENAI_BASE_URL \
  -e ADMIN_SAFE_WORD=$ADMIN_SAFE_WORD \
  -e EXPOSE_FLAG_TO_AI=$EXPOSE_FLAG_TO_AI \
  ai-security-backend
http://localhost:9009
```

### 方式三：直接使用nginx服务器

如果你已经有nginx服务器，可以直接将文件复制到nginx的html目录并配置反向代理：

```bash
cp index.html main.js animations.js /usr/share/nginx/html/
cp default.conf /etc/nginx/conf.d/default.conf
systemctl restart nginx
```

## 云服务器部署

### 部署到云服务器的步骤

1. **准备服务器环境**
   - 安装Docker和Docker Compose
   - 开放9009端口（或你选择的其他端口）

2. **上传项目文件**
   ```bash
   # 上传所有文件到服务器
   scp -r ./* user@your-server:/path/to/ai-security-challenge/
   ```

3. **在服务器上部署**
   ```bash
   cd /path/to/ai-security-challenge
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **配置域名（可选）**
   - 在DNS服务商处配置域名解析到服务器IP
   - 使用nginx反向代理配置域名访问

### 安全配置建议

1. **防火墙配置**
   ```bash
   # 只开放必要端口
   ufw allow 22    # SSH
   ufw allow 9009  # 应用端口
   ufw enable
   ```

2. **使用HTTPS（推荐）**
   - 使用Let's Encrypt获取免费SSL证书
   - 配置nginx反向代理启用HTTPS

## 文件说明

### 必要文件
- `index.html` - 主页面
- `main.js` - 前端游戏逻辑（不含密钥与flag）
- `animations.js` - 动画效果
- `api_test.html` - 接口连通性测试页面（可选，非生产）
- `default.conf` - nginx站点与反向代理配置
- `backend/app.py` - 后端接口与攻击检测、flag发放
- `backend/requirements.txt` - 后端依赖
- `backend/Dockerfile` - 后端镜像构建
- `.env.example` - 环境变量示例（用于参考）

### 部署文件
- `Dockerfile` - 前端镜像构建
- `backend/Dockerfile` - 后端镜像构建
- `docker-compose.yml` - 多服务编排
- `deploy.sh` - Linux/Mac部署脚本
- `deploy.bat` - Windows部署脚本

### 文档文件
- `README.md` - 项目说明文档
- `ai_behavior.md` - AI行为规范
- `DEPLOYMENT.md` - 本部署指南

## 自定义配置

### 修改端口

编辑 `docker-compose.yml` 文件中的端口映射：

```yaml
ports:
  - "80:80"
  - "443:80"
  - "3000:80"
```

### 环境变量配置

可以在 `docker-compose.yml` 中添加环境变量：

```yaml
environment:
  - OPENAI_API_KEY=你的密钥
  - OPENAI_MODEL=gpt-4o-mini
  - OPENAI_BASE_URL=https://api.openai.com/v1/chat/completions
  - ADMIN_SAFE_WORD=eaglelab_yyds
  - EXPOSE_FLAG_TO_AI=false
```

## 维护和更新

### 查看日志
```bash
docker compose logs -f
```

### 停止服务
```bash
docker compose down
```

### 重启服务
```bash
docker compose restart
```

### 更新部署
1. 上传新版本文件
2. 重新运行部署脚本

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改 `docker-compose.yml` 中的端口映射
   - 或停止占用端口的其他服务

2. **权限问题**
   - 确保当前用户有Docker执行权限
   - 将用户添加到docker组：`sudo usermod -aG docker $USER`

3. **内存不足**
   - Docker镜像很小，通常不会出现内存问题
   - 如遇问题，可尝试清理Docker缓存：`docker system prune`

### 获取帮助

如遇部署问题，请检查：
1. Docker和Docker Compose版本是否兼容
2. 服务器端口是否开放
3. 防火墙设置是否正确

## 性能优化

### 生产环境建议

1. **使用生产级nginx配置**
   - 启用gzip压缩
   - 配置缓存策略
   - 设置安全头

2. **CDN加速**
   - 将静态资源部署到CDN
   - 减少服务器负载

3. **监控和日志**
   - 配置日志轮转
   - 设置监控告警

---

**注意**: 本系统为教育用途，部署时请确保符合相关法律法规要求。
