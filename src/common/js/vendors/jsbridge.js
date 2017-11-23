/**
 * webview与native交互
 */

class JSBridge {
  constructor() {
    this.protocal = (() => (Common.isRelaApp() ? 'thel://' : 'thelweb://'))();
  }

  /**
   * 跳转至用户个人主页
   *
   * @param {any} userId
   * @memberof JSBridge
   */
  toUser(userId) {
    window.location.href = `${this.protocal}com.user/path?userId=${userId}`;
  }
}

window.JSBridge = JSBridge;

export default JSBridge;
