var Game;

Game = (function() {
  function Game() {}

  Game.keydown = function(e) {
    if (e.keyCode === keys.left) {
      return this.events.left = true;
    } else if (e.keyCode === keys.right) {
      return this.events.right = true;
    } else if (e.keyCode === keys.escape) {
      return this.events.stop = true;
    }
  };

  Game.keyup = function(e) {
    if (e.keyCode === keys.left) {
      return this.events.left = false;
    } else if (e.keyCode === keys.right) {
      return this.events.right = false;
    } else {

    }
  };

  Game.bindDOM = function() {
    return $(document.body).bind('keydown', this.keydown.bind(this)).bind('keyup', this.keyup.bind(this));
  };

  Game.unbindDOM = function() {
    return $(document.body).unbind('keydown', this.keydown).unbind('keyup', this.keyup);
  };

  Game.gameOver = function() {
    this.events.stop = true;
    return this.$gameOver.attr('active', '');
  };

  Game.init = function() {
    this.$main = $('.main');
    this.$game = this.$main.find('[data-name=game]');
    this.$gameOver = this.$main.find('[data-name=gameover]');
    this.$menu = this.$main.find('[data-name=menu]');
    this.$settings = this.$main.find('[data-name=settings]');
    this.pxToWaitBeforeAdding = 200;
    this.width = 300;
    this.height = 500;
    this.walls = [];
    return this.bindDOM();
  };

  Game.play = function() {
    var j, len, mainLoop, ref, wall;
    ref = this.walls;
    for (j = 0, len = ref.length; j < len; j++) {
      wall = ref[j];
      wall.remove();
    }
    this.$gameOver.removeAttr('active');
    this.$menu.removeAttr('active');
    this.$settings.removeAttr('active');
    this.$game.attr('active', '');
    Score.reset().render();
    this.walls = [new Wall()];
    this.events = {
      left: false,
      right: false,
      stop: false
    };
    Points.init();
    mainLoop = function() {
      var i, k, len1, ref1;
      if (this.events.left) {
        Points.spin("left").render();
      }
      if (this.events.right) {
        Points.spin("right").render();
      }
      ref1 = this.walls;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        wall = ref1[i];
        wall.update();
        if (Points.checkCollide(wall)) {
          this.gameOver();
        } else if (wall.isOut()) {
          this.walls[i] = null;
          wall.remove();
          Score.add().render();
        } else {
          wall.render();
        }
      }
      if (this.walls.get(-1).y > this.pxToWaitBeforeAdding) {
        this.walls.push(new Wall());
      }
      this.walls.remove(null);
      if (!this.events.stop) {
        return setTimeout(mainLoop.bind(this), 20);
      }
    };
    return mainLoop.bind(this)();
  };

  Game.settings = function() {
    this.$settings.attr('active', '');
    this.$gameOver.removeAttr('active');
    return this.$menu.removeAttr('active');
  };

  Game.menu = function() {
    this.$gameOver.removeAttr('active');
    this.$settings.removeAttr('active');
    return this.$menu.attr('active', '');
  };

  return Game;

})();
