@echo off
chcp 65001 >nul

echo 🚀 开始部署千模炼阵 · AI 安全靶场...

REM 检查Docker是否安装
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker未安装，请先安装Docker
    pause
    exit /b 1
)

REM 检查Docker Compose是否安装
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose未安装，请先安装Docker Compose
    pause
    exit /b 1
)

echo ✅ Docker环境检查通过

REM 构建镜像
echo 🔨 正在构建Docker镜像...
docker-compose build

if errorlevel 1 (
    echo ❌ 镜像构建失败
    pause
    exit /b 1
)

echo ✅ 镜像构建成功

REM 启动服务
echo 🚀 正在启动服务...
docker-compose up -d

if errorlevel 1 (
    echo ❌ 服务启动失败
    pause
    exit /b 1
)

echo ✅ 服务启动成功

REM 等待服务就绪
echo ⏳ 等待服务就绪...
timeout /t 5 /nobreak >nul

REM 检查服务状态
echo 🔍 检查服务状态...
docker-compose ps | findstr "Up" >nul
if errorlevel 1 (
    echo ❌ 服务运行异常
    docker-compose logs
    pause
    exit /b 1
) else (
    echo ✅ 服务运行正常
)

echo.
echo 🎉 部署完成！
echo 📱 访问地址: http://localhost:9009
echo 📱 或者: http://你的服务器IP:9009
echo.
echo 📋 常用命令:
echo    查看日志: docker-compose logs -f
echo    停止服务: docker-compose down
echo    重启服务: docker-compose restart
echo    更新部署: deploy.bat

pause
