import moment from 'moment';
import qs from 'querystring';
import Common from '../../common/js/vendors/common';
import JSBridge from '../../common/js/vendors/jsbridge';
import Comment from '../../common/js/vendors/comment';

// 引入活动相关css
import './index.scss';

// 引入外部的http请求
require('http://res.wx.qq.com/open/js/jweixin-1.2.0.js');

(() => {
  function musicPlay(isPlay) {
    const media = document.querySelector('#audio');
    if (isPlay && media.paused) {
      media.play();
    }
    if (!isPlay && !media.paused) {
      media.pause();
    }
  }
  const pause = new Hammer($('.pause')[0]);
  pause.on('tap', () => {
    musicPlay(false);
    $('.pause').hide();
    $('.play').show();
  });
  const play = new Hammer($('.play')[0]);
  play.on('tap', () => {
    musicPlay(true);
    $('.pause').show();
    $('.play').hide();
  });
  // touch.on('.play', 'tap', (event) => {
  //   musicPlay(true);
  //   $('.pause').show();
  //   $('.play').hide();
  // });
  // touch.on('.btn-user', 'tap', () => {
  //   rela.toUser('100586882');
  // });
})();
// 数据统计key
const wxImageShareSuccess = 'rela:h5:market08:wx:share:success';
const wxImageShareCancel = 'rela:h5:market08:wx:share:cancel';


function success(res) {
  $.post('/statistics/record', {
    key: wxImageShareSuccess,
    count: 1,
  }, (data) => {});
}

function cancel(res) {
  $.post('/statistics/record', {
    key: wxImageShareCancel,
    count: 1,
  }, (data) => {});
}
