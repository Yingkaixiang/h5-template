import moment from 'moment';
import qs from 'querystring';
import Common from '../../common/js/vendors/common';
import JSBridge from '../../common/js/vendors/jsbridge';
import Comment from '../../common/js/vendors/comment';

// 引入活动相关css
import './index.scss';

// 引入外部的http请求
require('http://res.wx.qq.com/open/js/jweixin-1.2.0.js');

const btn = new Hammer($('#btn')[0]);
btn.on('tap', () => {
  // 使用第三方npm包
  console.dir(moment().format('MMMM Do YYYY, h:mm:ss a'));
  // 使用nodejs原生方法
  console.log(qs.stringify({ a: 1 }));
  // 使用自定义组件
  const comment = new Comment('123');
  document.write(comment.init());
  // 使用公共方法
  console.log(Common.isRelaApp());
  const jsBridge = new JSBridge();
  jsBridge.toUser(100403874);
});

console.log('demo.js');
