/**
 * 评论模块
 */

import $ from 'jquery';
import moment from 'moment';
import Hammer from 'hammerjs';
import './dropload';
import Common from './common';
import JSBridge from './jsbridge';
import config from '../../../config/';
import api from '../../../config/api';
import '../../sass/comment.scss';

/**
 * 评论模块
 *
 * @param {string} momentId 日志id
 * @param {string} language 语言
 * @param {JQueryDOM} container 存放评论的容器
 *
 * @class Comment
 */
class Comment {
  constructor(data) {
    const params = Object.assign({
      userId: 100403874, // 通过客户端所获取到的用户id
      jsbridge: new JSBridge({
        debug: process.env.NODE_ENV !== 'production',
      }),
    }, Comment.defaults, data);
    Object.keys(params).forEach((item) => {
      this[item] = params[item];
    });
  }

  static replaceEmoji(str) {
    return str;
  }

  /**
   * 渲染评论输入框
   *
   * @returns
   * @memberof Comment
   */
  renderInput() {
    return (`
      <input class="${this.INPUT_CLASSNAME}" value="${this.momentId}" />
      <input class="${this.PUBLISH_BTN_CLASSNAME}" type="button" value="发布" />
    `);
  }

  /**
   * 渲染评论
   *
   * @param {string} userId 用户id
   * @param {string} avatar 头像
   * @param {string} nickName 昵称
   * @param {string} likes 点赞数量
   * @param {string} content 评论内容
   * @param {string} createTime 评论发布时间
   * @returns {string}
   * @memberof Comment
   */
  renderCommentTpl(data) {
    const {
      userId,
      avatar,
      nickName,
      likes,
      content,
      createTime,
    } = data;
    const operatorId = this.userId || '';
    // 判断用户是否能执行删除操作
    const ckDelete = () => {
      if (operatorId && operatorId === userId) {
        return '<p>删除</p>';
      }
      return '';
    };

    return (`
      <div>
        <input type="hidden" value=${JSON.stringify(data)} />
        <p>${this.momentId}-${userId}</p>
        <img class="${this.AVATAR_CLASSNAME}" src="${avatar}" />
        <p>${nickName}</p>
        <p class="${this.LIKE_BTN_CLASSNAME}">点赞数：<span>${likes}</span></p>
        <p>内容：${Common.replaceEmoji(content)}</p>
        <p>发布时间：${createTime}</p>
        ${ckDelete()}
      </div>
    `);
  }

  /**
   * 渲染评论列表
   *
   * @returns
   * @memberof Comment
   */
  renderCommentList() {
    let tpl = '';
    for (let i = 0; i < 10; i += 1) {
      tpl += this.renderCommentTpl({
        userId: 100403874,
        avatar: 'http://ssl-static.thel.co/app/avatar/101422539/04f83a7b3349370447a85b5321c19002.jpg',
        nickName: '昵称',
        likes: 100,
        content: '测试内容',
        createTime: moment(Date.now() - 10000).fromNow(),
      });
    }
    return tpl;
  }

  /**
   * 点赞
   *
   * @param {function} success 请求成功
   * @param {function} failure 请求失败
   * @memberof Comment
   */
  like({ success, failure }) {
    $.ajax({
      url: `${config.apiHost}${api.likeComment}`,
      method: 'GET',
      data: { momentId: this.momentId },
      success(res) {
        success(res);
      },
      failure(res) {
        failure(res);
      },
    });
  }

  /**
   * 绑定评论发布按钮
   *
   * @memberof Comment
   */
  bindPublishBtn() {
    const hammer = new Hammer($(`.${this.PUBLISH_BTN_CLASSNAME}`)[0]);
    hammer.on('tap', () => {
      const content = Common.inputFilter($(`.${this.INPUT_CLASSNAME}`).val().trim());
      const data = {
        userId: 100403874,
        avatar: 'http://ssl-static.thel.co/app/avatar/101422539/04f83a7b3349370447a85b5321c19002.jpg',
        nickName: '昵称',
        likes: 100,
        content,
        createTime: moment(Date.now() - 10000).fromNow(),
      };
      this.container.prepend(this.renderCommentTpl(data));
    });
  }

  /**
   * 绑定头像跳转
   *
   * @memberof Comment
   */
  bindAvatar() {
    const hammer = new Hammer(this.container[0]);
    hammer.on('tap', (event) => {
      const { target } = event;
      if (target.className.indexOf('avatar') !== -1) {
        const data = $(target).parent().find('input[type=hidden]').val();
        const { userId } = JSON.parse(data);
        this.jsbridge.toUser(userId);
      }
    });
  }

  /**
   * 绑定点赞按钮事件
   *
   * @memberof Comment
   */
  bindLikeBtns() {
    const hammer = new Hammer(this.container[0]);
    hammer.on('tap', (event) => {
      const { target } = event;
      if (target.className.indexOf(this.LIKE_BTN_CLASSNAME) !== -1) {
        this.like({
          success() {
            const likeCount = $(target).find('span');
            let currentLike = Number(likeCount.text());
            likeCount.text(currentLike += 1);
          },
        });
      }
    });
  }

  /**
   * 初始化momentjs国际化
   *
   * @memberof Comment
   */
  initMomentjs() {
    moment.locale(this.language);
  }

  /**
   * 初始化评论模块
   */
  init() {
    const that = this;

    that.initMomentjs();

    const input = that.renderInput();
    const tpl = that.renderCommentList();
    that.container.append(input);
    that.container.append(tpl);

    that.bindPublishBtn();
    that.bindLikeBtns();
    that.bindAvatar();

    // 下来加载
    that.container.dropload({
      scrollArea: window,
      loadDownFn(me) {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          that.container.append(tpl);
          me.resetload();
        }, 5000);
      },
    });
  }
}

/**
 * 配置文件
 */
Comment.defaults = {
  container: $('body'), // 默认插入到body中
  language: 'zh-cn', // 默认语言
  PUBLISH_BTN_CLASSNAME: 'publish', // 默认发布按钮class
  INPUT_CLASSNAME: 'publish-input', // 默认评论输入框class
  LIKE_BTN_CLASSNAME: 'like', // 默认点赞按钮的class
  AVATAR_CLASSNAME: 'avatar', // 默认头像class
};

export default Comment;
