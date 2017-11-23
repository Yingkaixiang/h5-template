import '../../sass/reset.scss';

class Common {
  constructor() {
    this.version = 1;
  }

  /**
   * 判断当前app是否为rela
   */
  static isRelaApp() {
    const reg = /theL\s?\//i;
    return reg.test(navigator.userAgent);
  }
}

window.Common = Common;

export default Common;
