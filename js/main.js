var main;

main = function() {
  Game.init();
  return Game.run();
};

$(window).ready(main);
