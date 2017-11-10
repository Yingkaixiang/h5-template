# h5-template

用于进行h5活动开发的框架，主要用于解决静态资源的打包和加载以及本地环境和线上环境的调试。

## 环境

```
node v8.5.0
npm v.5.3.0
```

```
webpack v3.7.1
```

## 目录说明

~~~
├── dist（打包后目录）
├── config（源码目录）
│   ├── assets（公共js、css、图片等资源）
│   ├── pages（活动页面，每个单独活动为一个文件夹）
~~~

## 待解决问题

* html修改自动刷新
* 修改 ```webpack``` 配置文件自动重启服务

## 如何使用

### 创建一个页面

1. 在 ```pages``` 文件夹下创建一个以活动名称为名的文件夹，比如 ```/pages/test```

2. 在 ```test``` 文件夹下创建三个文件 ```index.html``` ```index.js``` ```index.scss```，实际项目中目录结构可以随意创建。

```html
<!-- index.html -->
<h1>Hello World！</h1>
```

```js
// js.html
alert('index.js')
```

```scss
/* index.scss */
h1{
  color: red;
}
```

3. 在 ```webpack.common.js``` 中添加页面打包的入口

```js
module.exports = {
  entry: {
    test: './src/pages/test/index.js',
  }
}
```

4. 在 ```html``` 中引入打包后的文件

