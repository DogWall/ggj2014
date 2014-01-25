
/* global enchant, Class */

enchant();


var SceneOneUpper = Class.create(enchant.Sprite, {
  initialize: function (game) {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets['img/route-jour.png'];
  }
});
SceneOneUpper.preload = ['img/route-jour.png'];

var SceneOneLower = Class.create(enchant.Sprite, {
  initialize: function (game) {
    enchant.Sprite.call(this, 32, 32);
    this.image = game.assets['img/route-jour.png'];
  }
});
SceneOneLower.preload = ['img/route-jour.png'];




(function () {

var game;

var settings = {
  playerSprite: 'img/jeanjacques.png',
  levels: [
    {
      upperScene: SceneOneUpper,
      lowerScene: SceneOneLower,
    }
  ]
};

/**
 * Main
 */
var Game = function () {

  var self = this;

  game = new enchant.Core(window.innerWidth / 2 , window.innerHeight / 2); //screen res
  game.fps = 30;

  var preload = [ settings.playerSprite ];

  for (var i = 0; i < settings.levels.length; i++) {
    var j;
    for (j = 0; j < settings.levels[i].upperScene.preload.length; j++) {
      preload.push(settings.levels[i].upperScene.preload[j]);
    }
    for (j = 0; j < settings.levels[i].lowerScene.preload.length; j++) {
      preload.push(settings.levels[i].lowerScene.preload[j]);
    }
  }

  game.preload(preload); //preload assets png, wav etc

  game.onload = function () {
    game.player = new Player();
    game.rootScene.addChild(game.player);

    self.loadLevel(0);
  };

  game.start();
};


Game.prototype.loadLevel = function(levelIndex) {

  if (this.upperScene || this.lowerScene) {
    game.rootScene.removeChild(this.upperScene);
    game.rootScene.removeChild(this.lowerScene);    
  }

  this.upperScene = new settings.levels[levelIndex].upperScene(game);
  game.rootScene.addChild(this.upperScene);

  this.lowerScene = new settings.levels[levelIndex].lowerScene(game);
  game.rootScene.addChild(this.lowerScene);
};

Game.prototype.twist = function() {

};

var Player = Class.create(enchant.Sprite, {
  initialize: function () {
    var self = this;

    enchant.Sprite.call(this, 200, 358);
    this.image = game.assets[settings.playerSprite];
    this.x = this.y = 0;
    this.walking = false;
    this.frame = 1;
    this.frames = [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ];

    this.addEventListener('enterframe', function () {
      self.frame = self.walking ? self.frames : 1;
    });
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
    this.addEventListener('touchstart', function () {
      this.image = game.assets[downPic];
      this.textLabel.color = 'black';
    });
    this.addEventListener('touchend', function () {
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





new Game();

})();
