
//init enchant.js

enchant();


/**
 * Main
 */
window.onload = function () {
    H = window.innerHeight *2;
    W = window.innerWidth *2;
    var game = new Core(W, H); //screen res

    game.fps = 24;
    game.preload("img/jeanjacques-j.png","img/jeanjacques-n.png","img/route-jour.png","img/route-nuit.png","img/imm1-j.png","img/imm1-n.png"/*'foo.png','bar.png'*/); //preload assets png, wav etc
    game.onload = function(){
        jour = new Scene();
        nuit = new Scene();

    jj = new Sprite(66,119);
        jj2 = new Sprite(66,119);
    console.log("sprite ok")
        jj.image=game.assets["img/jeanjacques-j.png"];
        jj.x=W/2-jj.width/2;
        jj.y= H/2-jj.height-150;
        jj.frame=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2];

        jj2.image=game.assets["img/jeanjacques-n.png"];
        jj2.x=W/2-jj2.width/2;
        jj2.y= H/2-jj2.height-150;
        jj2.frame=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2];
        jj2.tl.fadeOut(0);
        jj2.scale(-1,1);

        ground = new Sprite(95,166);
        ground.image=game.assets["img/route-jour.png"];
        ground.width=W*2;
        ground.x=W/2-ground.width/2;
        ground.y= H/2-ground.height;

        ground2 = new Sprite(95,166);
        ground2.image=game.assets["img/route-nuit.png"];
        ground2.width=W*2;
        ground2.x=W/2-ground2.width/2;
        ground2.y= H/2-ground2.height;

        building =new Sprite(game.assets["img/imm1-j.png"].width,game.assets["img/imm1-j.png"].height);
        building.image=game.assets["img/imm1-j.png"];
        building.x=building.width/2;
        building.y=H/2-ground.height-building.height;

        building2 =new Sprite(game.assets["img/imm1-n.png"].width,game.assets["img/imm1-n.png"].height);
        building2.image=game.assets["img/imm1-n.png"];
        building2.x=building2.width/2;
        building2.y=H/2-ground2.height-building2.height;

        //game.rootScene.addChild(ground);
       // nuit.tl;//rotation=180 does not work ...
        nuit.rotation=-180;
        jour.addChild(ground);
        jour.addChild(building);
        nuit.addChild(ground2);
        nuit.addChild(building2);

        actors_jour = new Scene()
        actors_jour.addChild(jj);
        actors_nuit = new Scene()
        actors_nuit.addChild(jj2);
        game.rootScene.addChild(nuit);
        game.rootScene.addChild(jour);

        game.rootScene.addChild(actors_jour);
        game.rootScene.addChild(actors_nuit);

        ground.tl.moveBy(-900,0,300);
        ground2.tl.moveBy(900,0,300);
        building.tl.moveBy(-700,0,300);
        building2.tl.moveBy(700,0,300);
        jour.tl.delay(100).rotateBy(-180,25);
        nuit.tl.delay(100).rotateBy(-180,25);
        jj2.tl.delay(115).fadeIn(10);
        jj.tl.delay(115).fadeOut(10);//scaleBy(-1,1,25,enchant.Easing.LINEAR);
        //ground.tl.moveBy(200,0,60,enchant.Easing.LINEAR)


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