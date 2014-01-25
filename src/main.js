
/* global enchant, Class */

//init enchant.js
var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;

enchant();

var SceneOneUpper = Class.create(enchant.Scene, {
  initialize: function (game) {

    enchant.Scene.call(this);

    // ROAD
    var ground = new enchant.Sprite(game.assets['img/route-jour.png'].width, game.assets['img/route-jour.png'].height);
    ground.image = game.assets['img/route-jour.png'];
    ground.width = WIDTH * 2;
    ground.x = WIDTH / 2 - ground.width / 2;
    ground.y = HEIGHT / 2 - ground.height;
    ground.tl.moveBy(-1500, 0, 300);
     ground.touchEnabled=false
    this.addChild(ground);

    // // BUILDINGS
      xoffset =0;
      // BUILDINGS
      for (var i = 0; i < 60; i++) {
          var asset = game.assets['img/imm' + ((i%6)+1) + '-j.png'];
          var building = new enchant.Sprite(asset.width, asset.height);
          building.image = asset;
          building.x = building.width / 2+xoffset;
          building.y = HEIGHT / 2 - ground.height - building.height;
          building.tl.moveBy(-1000, 0, 300);
          building.touchEnabled=false
          this.addChild(building);
          xoffset+=asset.width
      }

    // this.actors = new Scene();
    // this.actors.addChild(jj);
  }
});
SceneOneUpper.preload = ['img/route-jour.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('img/imm' + (i+1) + '-j.png'); }



var SceneOneLower = Class.create(enchant.Scene, {
  initialize: function (game) {

    enchant.Scene.call(this);

    // ROAD
    var assetroad = game.assets['img/route-nuit.png'];
    var ground = new enchant.Sprite(assetroad.width, assetroad.height);
      ground.image = assetroad
      ground.width = WIDTH * 2;
      ground.x = WIDTH / 2 - ground.width / 2;
      ground.y = HEIGHT / 2 - ground.height;
      ground.tl.moveBy(1500, 0, 300);
      ground.touchEnabled=false
    this.addChild(ground);

    xoffset =0;
    // BUILDINGS
    for (var i = 0; i < 60; i++) {
       var asset = game.assets['img/imm' + ((i%6)+1) + '-n.png'];
       var building = new enchant.Sprite(asset.width, asset.height);
       building.image = asset;
       building.x = building.width / 2+xoffset;
       building.y = HEIGHT / 2 - ground.height - building.height;
       building.tl.moveBy(1000, 0, 300);
        building.touchEnabled=false
       this.addChild(building);

        xoffset+=asset.width
    }


  }
});
SceneOneLower.preload = ['img/route-nuit.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('img/imm' + (i+1) + '-n.png'); }



(function () {

var game;

var settings = {
  player: {
    lives: 3,
    sprite_j: 'img/jeanjacques-j.png',
    sprite_n: 'img/jeanjacques-n.png',
  },
  levels: [
    {
      upperScene: SceneOneUpper,
      lowerScene: SceneOneLower,
    }
  ]
};



/**
 * Player
 */
var Player = Class.create(enchant.Sprite, {
  initialize: function () {

    this.image_j = game.assets[settings.player.sprite_j];
    this.image_n = game.assets[settings.player.sprite_n];

    enchant.Sprite.call(this, this.image_j.width, this.image_j.height);

    enchant.Sprite.call(this, this.image_j.width/3, this.image_j.height);
    this.image = this.image_j;

    this.x = WIDTH / 2;
    this.y = HEIGHT / 2 - this.height - 150;
    this.frames = [0,0,0,0,0,1,1,1,1,1,2,2,2,2,2];

    this.walking = true;
  },

  onenterframe: function() {

    this.image = (game.twisted ? this.image_n : this.image_j);

    //06.2 Intersect

    //06.3 Within

    this.frame = this.walking ? this.frames : 1;
  }
});



/**
 * Main
 */
var Game = function () {

  var self = this;

  game = this.game = new enchant.Core(WIDTH, HEIGHT); //screen res
  game.fps = 24;

  var preload = [ settings.player.sprite_j, settings.player.sprite_n ];

  for (var i = 0; i < settings.levels.length; i++) {
    var j;
    for (j = 0; j < settings.levels[i].upperScene.preload.length; j++) {
      preload.push(settings.levels[i].upperScene.preload[j]);
    }
    for (j = 0; j < settings.levels[i].lowerScene.preload.length; j++) {
      preload.push(settings.levels[i].lowerScene.preload[j]);
    }
  }

  /*
        jj = new JeanJacques();
        jj2.tl.fadeOut(0);
        jj2.scale(-1,1);
        jj2.onenterframe = function(){if (this.intersect(building2)) console.log("that's a hit");}


 
  
        ground2.tl.moveBy(1500,0,300);
  
        building2.tl.moveBy(1000,0,300);
        //scaleBy(-1,1,25,enchant.Easing.LINEAR);
        //ground.tl.moveBy(200,0,60,enchant.Easing.LINEAR)
  */


  game.preload(preload); //preload assets png, wav etc

  game.onload = function () {

    self.backgroundScene = new enchant.Scene();
    self.backSprite = new enchant.Sprite(WIDTH, HEIGHT);
    self.backSprite.backgroundColor = 'lightblue';
    self.backgroundScene.addChild(self.backSprite);
    // game.rootScene.addChild(self.backgroundScene);

    //game.rootScene = new enchant.Group();
    //game.rootScene.addChild(game.rootScene);

    game.player = new Player();
    game.playerScene = new Scene();
    game.playerScene.addChild(game.player);

    self.loadLevel(0);
     game.rootScene.addChild(game.playerScene);
      game.playerScene.y=HEIGHT/2;
  };

  game.rootScene.addEventListener('touchstart', function() {
    self.twist();
  });

  game.start();
};


Game.prototype.loadLevel = function(levelIndex) {

  if (this.upperScene || this.lowerScene) {
    game.rootScene.removeChild(this.upperScene);
    game.rootScene.removeChild(this.lowerScene);

  }
 //   game.rootScene.removeChild(this.player);

  this.upperScene = new settings.levels[levelIndex].upperScene(game);
  //this.upperScene.y = 0;
  game.rootScene.addChild(this.upperScene);

  this.lowerScene = new settings.levels[levelIndex].lowerScene(game);
  //this.lowerScene.y = game.height / 2;
  this.lowerScene.rotation = -180;
  game.rootScene.addChild(this.lowerScene);
    this.lowerScene.y=HEIGHT/2;
    this.upperScene.y=HEIGHT/2;

   // game.rootScene.addChild(game.player);
};

Game.prototype.twist = function() {

  var self = this;

  game.twisted = !game.twisted;
  // game.rootScene.tl.scaleTo(1, this.twisted ? -1 : 1, 10, enchant.Easing.LINEAR);
  // game.rootScene.tl.rotateTo(this.twisted ? 180 : 0, 10, enchant.Easing.LINEAR);

  // this.player.tl.fadeOut(0);
  game.player.scale(-1, 1); // this.twisted

  if (game.twisted) {
    game.player.tl.delay(10).fadeIn(10);
    // jj.tl.fadeOut(10);
    this.upperScene.tl.rotateBy(-180, 15);
    this.lowerScene.tl.rotateBy(-180, 15);
    //  this.rootScene.tl.rotateBy(-180,15);
    this.backSprite.tl.delay(15).then(function(){
      self.backSprite.backgroundColor = 'darkgrey';
    });

  } else {
    game.player.tl.delay(10).fadeIn(10);
    // jj2.tl.fadeOut(10);
    this.upperScene.tl.rotateBy(-180, 15);
    this.lowerScene.tl.rotateBy(-180, 15);
     // this.rootScene.tl.rotateBy(180,15);
    this.backSprite.tl.delay(15).then(function(){
      self.backSprite.backgroundColor = 'lightblue';
    });
  }

};


window.ggj = new Game();

})();



