var Wall;

Wall = (function() {
  function Wall() {
    this.speed = 5;
    this.width = rnd(20, 80);
    this.height = rnd(20, 80);
    this.x = rnd(0, Game.width - this.width);
    this.y = 0;
    this.$ = $('<div class="wall"></div>').css({
      width: this.width,
      height: this.height,
      left: this.x,
      top: 0
    });
    Game.$game.append(this.$);
  }

  Wall.prototype.update = function() {
    this.y += this.speed;
    return this;
  };

  Wall.prototype.render = function() {
    return this.$.css({
      left: this.x,
      top: this.y
    });
  };

  Wall.prototype.isOut = function() {
    return this.y > Game.height;
  };

  Wall.prototype.remove = function() {
    this.$.remove();
    return this;
  };

  return Wall;

})();
