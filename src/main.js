
//init enchant.js
enchant();

window.onload = function() {
    var game = new Core(800, 480); //screen res
    game.fps = 24;
    game.preload('foo.png','bar.png');//preload assets png, wav etc
    game.score = 0;
    game.start();
}