'use strict';

const game = {
  ctx: null,
  sprites: {
    background: null,
    ball: null,
    platform: null,
  },
  init() {
    this.ctx = document.getElementById('my-canvas').getContext('2d');
  },
  preload(callback) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length;

    for (let item in this.sprites) {
      this.sprites[item] = new Image();
      this.sprites[item].src = `./img/${item}.png`;
      this.sprites[item].addEventListener('load', () => {
        ++loaded;
        if (loaded >= required) {
          callback();
        }
      });
    }
  },
  run() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  },
  render() {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.ball, 0, 0);
    this.ctx.drawImage(this.sprites.platform, 280, 330);
  },
  start() {
    this.init();
    this.preload( () => this.run() );
  },
};

window.addEventListener('load', () => {
  game.start();
});
