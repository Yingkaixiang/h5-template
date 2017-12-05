import $ from 'jquery';
import Comment from '../../common/js/lib/comment';

import '../../common/sass/reset.scss';

const comment = new Comment({
  momentId: '132',
  container: $('#comment'),
});
comment.init();
