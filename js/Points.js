var Point, Points;

Points = (function() {
  function Points() {}


  /*
  		This is just a helper. Most of the time, each action is called on both points, so this is what this class does.
   */

  Points.init = function() {
    this.radius = 70;
    this.red = new Point($('.point.red'), this.radius, 'red', false).spin().render();
    this.blue = new Point($('.point.blue'), this.radius, 'blue', true).spin().render();
    return this;
  };

  Points.render = function() {
    this.red.render();
    this.blue.render();
    return this;
  };

  Points.checkCollide = function(wall) {
    return this.red.checkCollide(wall) || this.blue.checkCollide(wall);
  };

  Points.spin = function(way) {
    this.red.spin(way);
    this.blue.spin(way);
    return this;
  };

  Points.changeColor = function() {
    this.red.changeColor();
    return this.blue.changeColor();
  };

  Points.resetColor = function() {
    this.red.resetColor();
    return this.blue.resetColor();
  };

  return Points;

})();

Point = (function() {
  function Point($1, radius, color, opposite) {
    this.$ = $1;
    this.radius = radius;
    this.color = color;
    if (opposite) {
      this.defaultAngle = 0;
    } else {
      this.defaultAngle = -Math.PI;
    }
    this.angle = this.defaultAngle;
    this.width = this.height = 20;
    this.spinCenter = [percentage(50, Game.width), Game.height - this.radius - 20];
    this.angleSpeed = 0.1;
    this.$.css({
      width: this.width,
      height: this.height
    });
  }

  Point.prototype.spin = function(way) {
    var cos, sin;
    if (way === 'left') {
      this.angle += this.angleSpeed;
    } else if (way === 'right') {
      this.angle -= this.angleSpeed;
    }
    cos = Math.trunc(this.radius * Math.cos(this.angle));
    sin = Math.trunc(this.radius * Math.sin(this.angle));
    this.x = this.spinCenter[0] + cos;
    this.y = this.spinCenter[1] + sin;
    return this;
  };

  Point.prototype.render = function() {
    this.$.css('left', this.x);
    this.$.css('top', this.y);
    return this;
  };

  Point.prototype.checkCollide = function(wall) {
    return ((this.x >= wall.x && this.x < wall.x + wall.width) || (wall.x >= this.x && wall.x < this.x + this.width)) && ((this.y >= wall.y && this.y < wall.y + wall.height) || (wall.y >= this.y && wall.y < this.y + this.height));
  };

  Point.prototype.changeColor = function() {
    return this.$.css('background-color', randomColor());
  };

  Point.prototype.resetColor = function() {
    return this.$.css('background-color', '');
  };

  return Point;

})();
