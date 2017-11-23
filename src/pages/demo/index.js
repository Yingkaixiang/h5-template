import './index.scss';

const btn = new Hammer($('#btn')[0]);
btn.on('tap', () => {
  alert('tap!');
});

alert('demo.js');
