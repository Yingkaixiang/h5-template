/**
 * 评论模块
 */

class Comment {
  constructor(momentId) {
    this.momentId = momentId;
  }

  init() {
    return `<h1>${this.momentId}</h1>`;
  }
}

export default Comment;
