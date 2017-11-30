/**
 * webview与native交互
 *
 * config:
 * @param {boolean} debug 是否开启调试模式
 * @param {function} callback 当前浏览器不支持跳转，则执行回调函数内容
 */

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
   * @param {any} userId
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
}

export default JSBridge;
