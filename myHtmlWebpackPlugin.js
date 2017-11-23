function myHtmlWebpackPlugin() {}

myHtmlWebpackPlugin.prototype.apply = (compiler) => {
  const regJS = /<script.*?>.*?<\/script>/g;
  const regCSS = /(<link.*\s+href=(?:"[^"]*"|'[^']*')[^<]*>)/g;

  compiler.plugin('compilation', (compilation) => {
    // 去除测试环境的静态资源引用
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, cb) => {
      htmlData.html = htmlData.html.replace(regJS, '');
      htmlData.html = htmlData.html.replace(regCSS, '');
      cb(null, htmlData);
    });

    // 将head.js移动到<head></head>中进行注入
    compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlData, cb) => {
      const headJS = htmlData.body[0];
      htmlData.head.unshift(headJS);
      htmlData.body.shift();
      cb(null, htmlData);
    });
  });
};

module.exports = myHtmlWebpackPlugin;

