# koa-vue-framework
koa+vue+vue cli + vuex+axios+pm2前后端开发目录

项目默认设置为单页面应用，所有请求重定向到 /vue-dist/index.html

I'm a noob

## 前端开发环境
需要安装vue cli 

启动命令行：cmd 进入项目目录
```
cd web
```
```
npm run serve
```
打开vue静态文件服务器:http://localhost:8080/
```
npm run build
```
打包前端项目目录到vue-dist

## 后端开发环境
需要安装pm2 

启动命令行：cmd 进入项目目录
```
npm run dev 
```

进入开发环境，默认配置所有文件热加载
```
npm run prd
```
进入生产环境，默认启用pm2.json配置文件

打开koa WEB服务器:http://localhost:3000/


