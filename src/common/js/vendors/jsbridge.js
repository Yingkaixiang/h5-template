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
        alert('当前浏览器不支持跳转');
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
}

window.JSBridge = JSBridge;

export default JSBridge;
