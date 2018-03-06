# static-multipage-webpack

基于 ```webpack``` 的多页面框架，主要用于解决静态页面的开发痛点。适用于 ```h5``` 开发。

## 环境

```
node v8.5.0
npm v5.3.0

webpack v3.7.1
```

## 如何使用

```js
// 本地开发环境
npm run dev

// 测试环境项目打包
npm run buildtest

// 正式环境项目打包
npm run build
```

## 特点

* 单个页面下依赖的多个 ```js``` 或 ```css``` 将被合并成一个文件。
* 代码压缩以及混淆。
* 可以使用 ```ES6``` 或更新的语法编写。
* 自动补齐 ```CSS``` 浏览器前缀。
* 支持本地服务器在相同 WiFi 环境下的远程调试。

## 待实现的功能

* 使用 ```CSS Modules```。
* 雪碧图的自动合并。
* ```html``` 修改后自动刷新浏览器。
  * [实现参考](http://www.cnblogs.com/wonyun/p/7077296.html)
* ```webpack``` 配置文件修改后自动重启 ```webpack-dev-server```。
  * [实现参考1](https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple)
  * [实现参考2](http://www.cnblogs.com/wonyun/p/7077296.html)
* 打包后的文件按照原始的目录层级不进行拍平。
  * [实现参考](https://github.com/webpack/webpack/issues/902)
* 新建文件后需要自动编译当前文件。
  * [实现参考](http://www.cnblogs.com/wonyun/p/7077296.html)

## 项目说明

* 默认开发模式下 ```html``` 页面引入的资源路径都以 ```/publics/``` 开头，详情参考 ```/src/pages/demo/```。
* 默认项目中的多媒体资源（如图片，音频，字体等）不会上传至代码库，需要开发者手动上传相关服务器（如七牛CDN），多媒体资源存放的目录名称必须为 ```assets```。
* 文件夹名称如果包含 "-closed" 表示当前页面不参与打包，用于提高打包速度。

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