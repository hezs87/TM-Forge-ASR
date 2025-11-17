#!/bin/bash

# 千模炼阵 · AI 安全靶场 - 一键部署脚本

echo "🚀 开始部署千模炼阵 · AI 安全靶场..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

echo "✅ Docker环境检查通过"

# 构建镜像
echo "🔨 正在构建Docker镜像..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ 镜像构建失败"
    exit 1
fi

echo "✅ 镜像构建成功"

# 启动服务
echo "🚀 正在启动服务..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ 服务启动失败"
    exit 1
fi

echo "✅ 服务启动成功"

# 等待服务就绪
echo "⏳ 等待服务就绪..."
sleep 5

# 检查服务状态
echo "🔍 检查服务状态..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ 服务运行正常"
else
    echo "❌ 服务运行异常"
    docker-compose logs
    exit 1
fi

echo ""
echo "🎉 部署完成！"
echo "📱 访问地址: http://localhost:9009"
echo "📱 或者: http://你的服务器IP:9009"
echo ""
echo "📋 常用命令:"
echo "   查看日志: docker-compose logs -f"
echo "   停止服务: docker-compose down"
echo "   重启服务: docker-compose restart"
echo "   更新部署: ./deploy.sh"
