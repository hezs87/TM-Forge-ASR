# 千模炼阵 · AI 安全靶场 - Docker部署配置
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY main.js .
COPY animations.js .
COPY api_test.html .
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
