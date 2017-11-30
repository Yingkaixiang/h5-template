# h5-template

用于进行h5活动开发的框架，主要用于解决静态资源的打包加载以及本地环境和线上环境的调试。

## 环境

```
node v8.5.0
npm v5.3.0

webpack v3.7.1
```

## 目录说明

~~~
├── dist（打包后目录）
├── src（源码目录）
│   ├── common（公共js、组件、css、图片等资源）
│   │   ├── head（插入至<head></head>标签中的js）
│   │   ├── lib（公共js库）
│   │   │   ├── common.js（工具方法）
│   │   │   ├── comment.js（评论组件）
│   │   │   ├── jsbridge.js（webview与native通信工具）
│   │   │   ├── slideshow.js（轮播插件）
│   ├── config（配置文件）
│   ├── pages（活动页面，每个单独活动为一个文件夹）
├── .csscomb.json 样式格式化配置文件
├── .eslint.js js格式化配置文件
├── webpack.common.js webpack公共配置文件
├── webpack.dev.js webpack开发环境配置文件
├── webpack.prod.js webpack正式环境配置文件
~~~

## 待解决问题

* html修改自动刷新
* 修改 ```webpack``` 配置文件自动重启服务

## 项目说明

* 当前项目使用 ```webpack``` 打包，开发者请自行阅读相关文档，理解模块化打包原理。
* 默认项目中的多媒体资源（如图片，音频，字体等）不会上传至代码库，需要开发者手动上传相关服务器（如七牛CDN）。
* 项目可直接使用 ```es6``` 语法进行代码编写

## 如何使用

```js
// 本地开发环境
npm run dev
// 项目打包
npm run build
```

项目在启动后会自动打包以下几个文件，所有打包文件的引用路径都为 ```/publics/[file]```：

1. ```head.js``` 用于在 ```<head></head>``` 标签中引入的js文件，目前打包了下列三个文件。

* ```src/common/js/flexible.js``` 移动端rem适配方案
* ```src/common/js/gio.js``` growingio数据采集
* ```src/common/js/zhanzhang.js``` 百度站长统计

2. ```src/pages/``` 下则会以文件夹为入口，打包和文件夹名称（活动名称）相同的文件 ```[page].js``` ```[page].css```。

***详情请配合 ```/src/pages/demo``` 示例查看与学习***


