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

## 特点

* 可以将单个页面的所有 ```js``` 或 ```css``` 打包成一个或多个指定文件，用于减少 ```http``` 请求
* 使用 ```sass``` 或 ```less``` 这样的 ```css``` 预处理工具提高代码的编写和维护
* 部分公用的 ```html``` 代码进行统一的维护和管理
* 代码的热加载以及保存后自动刷新提高开发效率
* 使用特定编辑器可以将测试代码直接发布至服务端进行调试（待定）
* 本地环境使用本地资源，生产环境使用cdn

### JS

* 代码压缩
* 代码混淆
* 同一个活动页面引入的代码将会合并成一个文件
* 代码发布更新版本号

### CSS

### 未解决问题
* html修改自动刷新
* 修改 ```webpack``` 配置文件自动重启服务
