import $ from 'jquery';
import Hammer from 'hammerjs';
import JSBridge from '../../common/js/lib/jsbridge';
import './index.scss';

// 测试数据
const env = process.env.NODE_ENV;
const envStr = env === 'development' ? 'test' : process.env.NODE_ENV;

$('#env').html(envStr);

const data = {
  test: {
    userId: '100403874',
    momentId: '151071676146210061',
  },
  producton: {
    userId: '100403874',
  },
};

const jsbridge = new JSBridge({
  debug: true,
});

const btn = new Hammer(document.querySelector('.btn'));
btn.on('tap', () => {
  alert('class');
});

const toUser = new Hammer($('#toUser')[0]);
toUser.on('tap', () => {
  jsbridge.toUser(data[envStr].userId);
});

const toMoment = new Hammer($('#toMoment')[0]);
toMoment.on('tap', () => {
  jsbridge.toMoment(data[envStr].momentId);
});
