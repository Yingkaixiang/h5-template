import moment from 'moment';
import qs from 'querystring';
import Comment from '../../common/js/components/comment';

// 引入活动相关css
import './index.scss';

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
  console.log(jsBridge.init());
});

console.log('demo.js');
