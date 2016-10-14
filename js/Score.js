var Score;

Score = (function() {
  function Score() {}

  Score.init = function() {
    this.$elements = $('.score');
    this.score = 0;
    return this;
  };

  Score.add = function() {
    this.score += 1;
    return this;
  };

  Score.render = function() {
    this.$elements.text(this.score);
    return this;
  };

  Score.reset = function() {
    this.score = 0;
    return this;
  };

  return Score;

})();
