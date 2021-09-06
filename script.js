'use strict';

const game = {
  ctx: null,
  ball: null,
  platform: null,
  blocks: [],
  rows: 4,
  cols: 8,
  sprites: {
    background: null,
    ball: null,
    platform: null,
    block: null
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
      let onImageLoad = () => {
        ++loaded;
        if (loaded >= required) {
          callback();
        }
      };

      this.sprites[item].addEventListener('load', onImageLoad);
    }
  },
  create() {
    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        this.blocks.push(
          {
            x: 64 * col + 65,
            y: 24 * row + 35
          }
        )
      }
    }
  },
  run() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  },
  render() {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.renderBlocks();
  },
  renderBlocks() {
    for (let block of this.blocks) {
      this.ctx.drawImage(this.sprites.block, block.x, block.y);
    }
  },
  start() {
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    });
  },
};

game.ball = {
  x: 320,
  y: 280,
  width: 20,
  height: 20,
};

game.platform = {
  x: 280,
  y: 300,
};

window.addEventListener('load', () => {
  game.start();
});
