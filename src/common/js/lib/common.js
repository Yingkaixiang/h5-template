import config from '../../../config/';

class Common {
  constructor() {
    this.version = 1;
  }

  /**
   * 用户输入过滤
   *
   * @static
   * @param {string} str 需要过滤的字符串
   * @returns
   * @memberof Common
   */
  static inputFilter(str) {
    return str.replace(/<\/?[^>]+>/gi, '');
  }

  /**
   * 替换emoji表情
   *
   * @static
   * @param {string} str 被替换的字符串
   * @returns
   * @memberof Common
   */
  static replaceEmoji(str) {
    return str;
  }

  /**
   * 判断当前app是否为rela
   */
  static isRelaApp() {
    const reg = /theL\s?\//i;
    return reg.test(navigator.userAgent);
  }

  /**
   * 微信分享
   *
   * @static
   * @param {string} url 需要被分享的url
   * @memberof Common
   */
  static shareToWX(data) {
    $.ajax({
      url: `//${config.host}/weixin/signature`,
      method: 'GET',
      data: { url: data.url },
      success: (res) => {
        const { timestamp, noncestr, signature } = res;
        wx.config({
          debug: process.env.NODE_ENV !== 'production',
          appId: config.appId,
          timestamp,
          noncestr,
          signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
          ],
        });
        wx.ready(() => {
          wx.onMenuShareTimeline(data);
          wx.onMenuShareAppMessage(data);
          wx.onMenuShareQQ(data);
          wx.onMenuShareWeibo(data);
        });
      },
    });
  }
}

export default Common;
