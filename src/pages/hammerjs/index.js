import './index.scss';

// 绑定一个元素
const btn1 = $('#btn1')[0];
const btn1Hammer = new Hammer(btn1);
btn1Hammer.on('tap', () => {
  alert('单个绑定');
});

/**
 * 绑定多个元素
 * 有两种方法，一个是遍历绑定单个元素，另一种是事件代理
 */

// 遍历绑定单个元素
const btnEach = $('.btn_each');
btnEach.each((index, item) => {
  const hammer = new Hammer(item);
  hammer.on('tap', () => {
    alert('遍历单个绑定');
  });
});

// 事件代理
const delegate = $('#delegate')[0];
const delegateHammer = new Hammer(delegate, {
  domEvents: true,
});
delegateHammer.on('tap', (event) => {
  if (event.target.className.indexOf('btn_delegate') !== -1) {
    alert('事件代理');
  }
});

// 同一元素多事件绑定与互斥
const btn6 = $('#btn6')[0];
const manager = new Hammer.Manager(btn6);
const singletap = new Hammer.Tap({
  event: 'singletap',
});
const doubletap = new Hammer.Tap({
  event: 'doubletap',
  taps: 2,
});
// 事件添加，有先后顺序的限制
manager.add([doubletap, singletap]);
// 触发双击事件后不会触发单击事件
manager.get('doubletap').requireFailure('singletap');
manager.on('singletap', () => {
  alert('1');
});
manager.on('doubletap', () => {
  alert('2');
});

