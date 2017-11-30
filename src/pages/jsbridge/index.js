import $ from 'jquery';
import Hammer from 'hammerjs';
import JSBridge from '../../common/js/lib/jsbridge';
import './index.scss';

// 测试数据
const env = process.env.NODE_ENV;
const envStr = env === 'development' ? 'test' : process.env.NODE_ENV;

$('#env').html(envStr);

const data = {
  test: {
    userId: '100403874',
    momentId: '151071676146210061',
    tagName: '寻找热拉女神',
    emojiId: '6',
    liveId: '',
    nickName: '抽抽抽风',
    avatar: 'http://static.thel.co/app/avatar/100403874/98e4c520798904e2dbc2c69dad5a3127.jpg-wh150',
    videoUrl: 'http://relamov.rela.me/recording_20171120192525_480p.mp4',
    title: '万圣节狂欢，约你来捣蛋',
    desc: '万圣节狂欢，不给糖果就捣蛋',
    imgUrl: 'https://qncdn.rela.me/act/h5/img/operation24/share.jpg',
    url: window.location.href,
    type: 'web',
    success: 'success',
    cancel: 'cancel',
    content: '一镜到底卖萌挑战赛',
  },
  producton: {
    userId: '100403874',
    momentId: '150437497984830002',
    tagName: '寻找热拉女神',
    emojiId: '6',
    liveId: '',
    nickName: '抽抽抽风',
    avatar: 'http://static.thel.co/app/avatar/100403874/98e4c520798904e2dbc2c69dad5a3127.jpg-wh150',
    videoUrl: 'http://relamov.rela.me/recording_20171120192525_480p.mp4',
    title: '万圣节狂欢，约你来捣蛋',
    desc: '万圣节狂欢，不给糖果就捣蛋',
    imgUrl: 'https://qncdn.rela.me/act/h5/img/operation24/share.jpg',
    url: window.location.href,
    type: 'web',
    success: 'success',
    cancel: 'cancel',
    content: '一镜到底卖萌挑战赛',
  },
};

const jsbridge = new JSBridge({
  debug: true,
});

const btn = new Hammer(document.querySelector('.btn'));
btn.on('tap', () => {
  alert('class');
});

const toMoment = new Hammer($('#toMoment')[0]);
toMoment.on('tap', () => {
  jsbridge.toMoment(data[envStr].momentId);
});

const toTag = new Hammer($('#toTag')[0]);
toTag.on('tap', () => {
  jsbridge.toTag(data[envStr].tagName);
});
const toEmoji = new Hammer($('#toEmoji')[0]);
toEmoji.on('tap', () => {
  jsbridge.toEmoji(data[envStr].emojiId);
});
const toEmojiShop = new Hammer($('#toEmojiShop')[0]);
toEmojiShop.on('tap', () => {
  jsbridge.toEmojiShop();
});
const toTopic = new Hammer($('#toTopic')[0]);
toTopic.on('tap', () => {
  jsbridge.toTopic(data[envStr].momentId);
});
const toTopicReplyIOS = new Hammer($('#toTopicReplyIOS')[0]);
toTopicReplyIOS.on('tap', () => {
  jsbridge.toTopicReplyIOS(data[envStr].momentId);
});
const toLive = new Hammer($('#toLive')[0]);
toLive.on('tap', () => {
  jsbridge.toLive(data[envStr].liveId);
});
const followUser = new Hammer($('#followUser')[0]);
followUser.on('tap', () => {
  jsbridge.followUser(data[envStr].userId, data[envStr].nickName, data[envStr].avatar);
});
const unfollowUser = new Hammer($('#unfollowUser')[0]);
unfollowUser.on('tap', () => {
  jsbridge.unfollowUser(data[envStr].userId, data[envStr].nickName, data[envStr].avatar);
});
const toWriteTopic = new Hammer($('#toWriteTopic')[0]);
toWriteTopic.on('tap', () => {
  jsbridge.toWriteTopic(data[envStr].tagName);
});
const toSupport = new Hammer($('#toSupport')[0]);
toSupport.on('tap', () => {
  jsbridge.toSupport();
});
const playVideo = new Hammer($('#playVideo')[0]);
playVideo.on('tap', () => {
  jsbridge.playVideo(data[envStr].videoUrl);
});
const clientShare = new Hammer($('#clientShare')[0]);
clientShare.on('tap', () => {
  jsbridge.clientShare(data[envStr].title, data[envStr].desc, data[envStr].imgUrl, data[envStr].url, data[envStr].type, data[envStr].success, data[envStr].cancel);
});
const toVideo = new Hammer($('#toVideo')[0]);
toVideo.on('tap', () => {
  jsbridge.toVideo(data[envStr].content);
});
