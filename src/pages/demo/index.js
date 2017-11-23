import './index.scss';

const btn = new Hammer($('#btn')[0]);
btn.on('tap', () => {
  console.log('tap!');
});

console.log('demo.js');
