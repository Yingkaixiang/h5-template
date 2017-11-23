/**
 * webview与native交互
 */

class JSBridge {
  constructor() {
    this.protocal = (() => (Common.isRelaApp() ? 'thel://' : 'thelweb://'))();
  }

  init() {
    return this.protocal;
  }
}

window.JSBridge = JSBridge;

export default JSBridge;
