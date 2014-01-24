
<<<<<<< HEAD
/* global enchant, Class */

enchant();

(function() {

var game;
=======
//init enchant.js

enchant();

>>>>>>> 3268107a2f43e116c918b926b970828e20e260f2

/**
 * Main
 */
window.onload = function () {

    var game = new Core(window.innerWidth / 2 , window.innerHeight / 2); //screen res
    game.fps = 24;
    game.preload("img/jeanjacques.png"/*'foo.png','bar.png'*/); //preload assets png, wav etc

    game.onload = function(){
      ground = new Sprite(200,358);
      ground.image=game.assets["img/jeanjacques.png"];
      ground.x=0;
      ground.y=0;
      ground.frame=0;
      //ground.tl.moveBy(200,0,60,enchant.Easing.LINEAR)
      ground.tl.delay(10).then(function (){ground.frame=1}).delay(10).then(function (){ground.frame=2}).delay(10).then(function (){ground.frame=1}).delay(10).then(function (){ground.frame=0}).loop();
      game.rootScene.addChild(ground);

      var talkBubbles = new enchant.Group();

      game.start();
  }

  game.twist = function () {

  }

}

var Road = Class.create(enchant.Sprite, {
  initialize:function() {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets[''];
  }
});

var Player = Class.create(enchant.Sprite, {
  initialize:function() {
    enchant.Sprite.call(this, 200, 358);
    this.image = game.assets['img/jeanjacques.png'];
    this.x = this.y = 0;
    this.frame=0;
  }
});

/*
var GGJButton = Class.create(enchant.Sprite,{
  initialize: function(x, y, scene, height, width, upPic, downPic, text) {
    enchant.Sprite.call(this,width,height);
    this.x = x;
    this.y = y;
    scene.addChild(this);
    this.image = game.assets[upPic];
    this.imageUp = game.assets[upPic];
    this.imageDown = game.assets[downPic];
    this.color='cyan';
    this.addEventListener('touchstart', function() {
      this.image = game.assets[downPic];
      this.textLabel.color = 'black';
    });
    this.addEventListener('touchend', function() {
      this.image = game.assets[upPic];
      this.textLabel.color = this.color;
    });
    this.textLabel = new enchant.Label();
    this.textLabel.text = text;
    this.textLabel.x = x + 10;
    this.textLabel.y = y + 5;
    this.textLabel.width = width - 20;
    if (height-10 > 5) {
      this.textLabel.height = height-10;
    } else {
      this.textLabel.height = 6;
    }
    this.textLabel.font = this.textLabel.height + 'px sans';
    this.textLabel.textAlign = 'center';
    this.textLabel.touchEnabled = false;
    this.textLabel.color = 'cyan';
    scene.addChild(this.textLabel);
  }
});
*/


Game();

})();
