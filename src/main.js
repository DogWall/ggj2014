
//init enchant.js
enchant();

window.onload = Game;

/**
 * Main
 */
function Game () {

    var game = new Core(window.innerWidth / 2 , window.innerHeight / 2); //screen res
    game.fps = 24;
    game.preload(/*'foo.png','bar.png'*/); //preload assets png, wav etc
    game.score = 0;


    // var bear = new Sprite(32, 32);
    // bear.image = game.assets['chara1.png'];
    // game.rootScene.addChild(bear);
    // bear.frame = [6, 6, 7, 7];   // select sprite frame


    game.start();
}

