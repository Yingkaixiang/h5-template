/**
 * webview与native交互
 *
 * config:
 * @param {boolean} debug 是否开启调试模式
 * @param {function} callback 当前浏览器不支持跳转，则执行回调函数内容
 */

import Common from './common';

class JSBridge {
  constructor({
    debug,
    callback,
  }) {
    this.debug = debug || false;
    this.callback = callback;
    this.protocal = (() => (Common.isRelaApp() ? 'thel://' : 'thelweb://'))();
  }

  /**
   * native跳转
   *
   * @param {string} url 跳转协议
   * @memberof JSBridge
   */
  redirect(url) {
    if (this.debug) {
      alert(`跳转地址：${url}`);
    }
    window.location.href = url;
    const timer = setTimeout(() => {
      if (this.callback && typeof this.callback === 'function') {
        this.callback();
      } else {
        window.open('https://www.rela.me/download/');
      }
      clearTimeout(timer);
    }, 1000);
  }

  /**
   * 跳转至用户个人主页
   *
   * @param {any} userId 用户id
   * @memberof JSBridge
   */
  toUser(userId) {
    const url = `${this.protocal}com.user/path?userId=${userId}`;
    this.redirect(url);
  }

  /**
   * 跳转至日志
   *
   * @param {string} momentId 日志id
   * @memberof JSBridge
   */
  toMoment(momentId) {
    const url = `${this.protocal}com.moment/path?momentId=${momentId}`;
    this.redirect(url);
  }

  /**
   * 跳转至标签
   *
   * @param {string} emojiId 标签名
   * @memberof JSBridge
   */
  toTag(tagName) {
    const url = `${this.protocal}com.tag/path?tagName=${tagName}`;
    this.redirect(url);
  }

  /**
   * 跳转至表情页
   *
   * @param {string} emojiId 表情id
   * @memberof JSBridge
   */
  toEmoji(emojiId) {
    const url = `${this.protocal}com.emoji/path?emojiId=${emojiId}`;
    this.redirect(url);
  }

  /**
   * 跳转至表情商店
   *
   * @memberof JSBridge
   */
  toEmojiShop() {
    const url = `${this.protocal}com.emojiShop/path`;
    this.redirect(url);
  }

  /**
   * 跳转至话题页
   *
   * @param {string} momentId 日志id
   * @memberof JSBridge
   */
  toTopic(momentId) {
    const url = `${this.protocal}com.topic/path?momentId=${momentId}`;
    this.redirect(url);
  }

  /**
   * 跳转至话题回复页
   *
   * @param {string} momentId 日志id
   * @memberof JSBridge
   */
  toTopicReplyIOS(momentId) {
    const url = `${this.protocal}com.topicreply/path?momentId=${momentId}`;
    this.redirect(url);
  }

  /**
   * 跳转直播页
   *
   * @param {string} liveId 直播id
   * @memberof JSBridge
   */
  toLive(liveId) {
    const url = `${this.protocal}com.live/path?liveId=${liveId}`;
    this.redirect(url);
  }

  /**
   * ios跳转至app store
   * @param {any} url 跳转地址
   * @memberof JSBridge
   */
  toAppStore(url) {
    const theUrl = `${this.protocal}com.app/path?url=${url}`;
    this.redirect(theUrl);
  }

  /**
   * 获取用户信息
   *
   * @param {string} callback 关注成功回调函数，传入方法名即可
   * @memberof JSBridge
   */
  getUserInfo(callback) {
    const url = `${this.protocal}com.getInfo/path?callback=${callback}`;
    this.redirect(url);
  }

  /**
   * 关注某个用户
   *
   * @param {string} userId 用户id
   * @param {string} nickName 用户昵称
   * @param {string} avatar 用户头像
   * @param {string} callback 关注成功回调函数，传入方法名即可
   * @memberof JSBridge
   */
  followUser(userId, nickName, avatar, callback) {
    const url = `${this.protocal}com.user/follow?userId=${userId}&nickName=${nickName}&avatar=${avatar}&callback=${callback}`;
    this.redirect(url);
  }

  /**
   * 取消关注某个用户
   *
   * @param {any} userId 用户id
   * @param {any} nickName 用户昵称
   * @param {any} avatar 用户头像
   * @param {string} callback 关注成功回调函数，传入方法名即可
   * @memberof JSBridge
   */
  unfollowUser(userId, nickName, avatar, callback) {
    const url = `${this.protocal}com.user/unfollow?userId=${userId}&nickName=${nickName}&avatar=${avatar}&callback=${callback}`;
    this.redirect(url);
  }

  /**
   * 跳转至话题发布页
   *
   * @param {string} tagName 话题
   * @memberof JSBridge
   */
  toWriteTopic(tagName = '') {
    const url = `${this.protocal}com.writetopic/path?tagName=${tagName}`;
    this.redirect(url);
  }

  /**
   * 跳转至意见反馈页
   *
   * @memberof JSBridge
   */
  toSupport() {
    const url = `${this.protocal}com.support/path`;
    this.redirect(url);
  }

  /**
   * 跳转至vip购买页
   *
   * @memberof JSBridge
   */
  toVip() {
    const url = `${this.protocal}com.vip/path`;
    this.redirect(url);
  }


  /**
   * 播放视频
   * 解决 android webview 无法使用video控件播放视频的bug
   *
   * @param {string} videoUrl 视频地址
   * @memberof JSBridge
   */
  playVideo(videoUrl) {
    if (Common.isRelaApp()) {
      const url = `${this.protocal}com.video/path?url=${videoUrl}`;
      this.redirect(url);
    } else {
      alert('请在 Rela App 中播放');
    }
  }

  /**
   * 跳转至短视频发布页
   *
   * @param  {string}  title    标题
   * @param  {string}  desc     简介
   * @param  {string}  imgUrl   分享图地址
   * @param  {string}  url      分享地址
   * @param  {string}  type     分享类型
   * @param  {string}  success  分享成功
   * @param  {string}  cancel   分享失败
   * @memberof JSBridge
  */
  clientShare(title, desc, imgUrl, url, type, success, cancel) {
    const theUrl = `${this.protocal}com.share/shareByClient？?title=${title}&desc=${desc}&imgUrl=${imgUrl}&url=${url}&type=${type}&success=${success}&cancel=${cancel}`;
    this.redirect(theUrl);
  }

  /**
   * 跳转至短视频发布页
   *
   * @param {string} content 正文
   * @memberof JSBridge
   */
  toVideo(content) {
    const url = `${this.protocal}com.video/publish?content=${content}`;
    this.redirect(url);
  }
}

export default JSBridge;
