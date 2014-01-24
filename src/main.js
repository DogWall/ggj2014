
/* global enchant, Class */

enchant();

(function() {

var game;

enchant();

/**
 * Main
 */
var Game = function () {

  var game = new enchant.Core(window.innerWidth / 2 , window.innerHeight / 2); //screen res
  game.fps = 30;
  game.preload('img/jeanjacques.png'/*'foo.png','bar.png'*/); //preload assets png, wav etc

  game.onload = function() {
    game.player = new Player();
    game.rootScene.addChild(game.player);
  };

  game.twist = function () {

  };

  game.start();
};

var RoadDay = Class.create(enchant.Sprite, {
  initialize:function() {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets['img/route-jour.png'];
  }
});

var Player = Class.create(enchant.Sprite, {
  initialize:function() {
    enchant.Sprite.call(this, 200, 358);
    this.image = game.assets['img/jeanjacques.png'];
    this.x = this.y = 0;
    this.frame = 0;
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
