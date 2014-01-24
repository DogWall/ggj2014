
//init enchant.js

enchant();


/**
 * Main
 */
window.onload = function () {

    var game = new Core(window.innerWidth / 2 , window.innerHeight / 2); //screen res
    game.fps = 24;
    game.preload("img/jeanjacques.png"/*'foo.png','bar.png'*/); //preload assets png, wav etc
    game.onload = function(){
    ground = new Sprite(200,358);
    console.log("sprite ok")
    ground.image=game.assets["img/jeanjacques.png"];
    ground.x=0;
    ground.y=0;
    ground.frame=0;
        //ground.tl.moveBy(200,0,60,enchant.Easing.LINEAR)
        ground.tl.delay(10).then(function (){ground.frame=1}).delay(10).then(function (){ground.frame=2}).delay(10).then(function (){ground.frame=1}).delay(10).then(function (){ground.frame=0}).loop();
    game.rootScene.addChild(ground);
    }

    // var bear = new Sprite(32, 32);
    // bear.image = game.assets['chara1.png'];
    // game.rootScene.addChild(bear);
    // bear.frame = [6, 6, 7, 7];   // select sprite frame


    game.start();
}
