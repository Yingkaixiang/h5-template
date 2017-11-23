import config from '../../../config/';
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

  /**
   * 分享参数
   *
   * @static
   * @param {any} data
   * @memberof Common
   */
  static shareToWX(data) {
    $.ajax({
      url: `${config.host}/weixin/signature`,
      method: 'GET',
      data,
    });
  }
}

window.Common = Common;

export default Common;
