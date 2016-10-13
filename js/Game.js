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
    this.unbindDOM();
    log(this.$gameOver);
    return this.$gameOver.attr('active', '');
  };

  Game.init = function() {
    this.$main = $('.main');
    this.$game = this.$main.find('[data-name=game]');
    this.$gameOver = this.$main.find('[data-name=menu]');
    this.pxToWaitBeforeAdding = 200;
    this.width = 300;
    return this.height = 500;
  };

  Game.run = function() {
    var mainLoop;
    this.walls = [new Wall()];
    this.events = {
      left: false,
      right: false,
      stop: false
    };
    this.bindDOM();
    Points.init();
    mainLoop = function() {
      var i, j, len, ref, wall;
      ref = this.walls;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        wall = ref[i];
        wall.update();
        if (Points.checkCollide(wall)) {
          this.gameOver();
        }
        if (wall.isOut()) {
          this.walls[i] = null;
          wall.remove();
        }
        wall.render();
      }
      if (this.walls.get(-1).y > this.pxToWaitBeforeAdding) {
        this.walls.push(new Wall());
      }
      this.walls.remove(null);
      if (this.events.left) {
        Points.spin("left").render();
      }
      if (this.events.right) {
        Points.spin("right").render();
      }
      if (!this.events.stop) {
        return setTimeout(mainLoop.bind(this), 15);
      }
    };
    return mainLoop.bind(this)();
  };

  return Game;

})();
