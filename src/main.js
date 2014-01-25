
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
/*

 //init enchant.js

 enchant();

window.onload = function () {

    var game = new Core(window.innerWidth  , window.innerHeight ); //screen res
    game.fps = 24;
    game.preload("img/jeanjacques.png","img/route-jour.png"); //preload assets png, wav etc
    game.onload = function(){
        jeanjack = new Sprite(200,358);
        jeanjack.image=game.assets["img/jeanjacques.png"];
        //jeanjack.scale(0.33);
        jeanjack.frame=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2];
        jeanjack.x=0 ;
        jeanjack.y=0;
        //game.rootScene.scale(0.3,0.3);

        ground = new Sprite(287,499);
        ground.image=game.assets["img/route-jour.png"];
        //ground.width=window.innerWidth*4;

        ground.y=-30;
        console.log(ground.width);
        //ground.scale(0.33);
        //ground.width=window.innerWidth/1.3;
        ground.x=window.innerWidth/2-ground.width/2;
        console.log(ground.width);
        //ground.width=window.innerWidth;


        ground.tl.moveBy(-600,0,70,enchant.Easing.LINEAR);

        //ground.scale(0.3,0.3);


        //ground.height=100;
        console.log("sprite ok")
        game.rootScene.addEventListener('enterframe', function() {
            if (jeanjack.intersect(ground)==true)
            {
                console.log("youpi!");
            }
            else
                console.log("nope!");

        })

        //ground.tl.moveBy(200,0,60,enchant.Easing.LINEAR)
        //ground.tl.delay(10).then(function (){ground.frame=1}).delay(10).then(function (){ground.frame=2}).delay(10).then(function (){ground.frame=1}).delay(10).then(function (){ground.frame=0}).loop();

        game.rootScene.addChild(ground);
        game.rootScene.addChild(jeanjack);
        // ground.tl.rotateBy(-90,200,enchant.Easing.LINEAR);
    }

    // var bear = new Sprite(32, 32);
    // bear.image = game.assets['chara1.png'];
    // game.rootScene.addChild(bear);
    // bear.frame = [6, 6, 7, 7];   // select sprite frame


    game.start();
}

 */