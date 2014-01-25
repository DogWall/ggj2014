
/* global enchant, Class */

enchant();

var SceneOneUpper = Class.create(enchant.Group, {
  initialize: function (game) {

    enchant.Group.call(this);

    // ROAD
    var ground = new enchant.Sprite(287,499);
    ground.image = game.assets['img/route-jour.png'];
    ground.width = 10000;
    // ground.x = window.innerWidth/2-ground.width/2;
    ground.x = 0;
    ground.y = -30;
    //ground.scale(0.33);
    this.addChild(ground);

    // BUILDINGS
    for (var i = 0; i < 60; i++) {
      var building = new enchant.Sprite(287, 499);
      building.image = game.assets['img/imm' + ((i%6)+1) + '-j.png'];
      building.x = i * 70;
      building.y = -300;
      building.scale(0.3, 0.3);
      this.addChild(building);      
    }

  }
});
SceneOneUpper.preload = ['img/route-jour.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('img/imm' + (i+1) + '-j.png'); }

var SceneOneLower = Class.create(enchant.Group, {
  initialize: function (game) {

    enchant.Group.call(this);

    // ROAD
    var ground = new enchant.Sprite(287, 499);
    ground.image = game.assets['img/route-nuit.png'];
    ground.width = 10000;
    // ground.x = window.innerWidth/2-ground.width/2;
    ground.x = 0;
    ground.y = -30;
    // ground.scale(0.33);
    this.addChild(ground);

    // BUILDINGS
    for (var i = 0; i < 60; i++) {
      var building = new enchant.Sprite(287, 499);
      building.image = game.assets['img/imm' + ((i%6)+1) + '-n.png'];
      building.x = i * 70;
      building.y = -300;
      building.scale(0.3, 0.3);
      this.addChild(building);      
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
    sprite: 'img/jeanjacques.png',
  },
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

  game = this.game = new enchant.Core(window.innerWidth / 2 , window.innerHeight / 2); //screen res
  game.fps = 30;

  var preload = [ settings.player.sprite ];

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
    game.stagesScene = new enchant.Group();
    game.rootScene.addChild(game.stagesScene);

    game.player = new Player();
    game.rootScene.addChild(game.player);

    self.loadLevel(0);
  };

  game.start();
};


Game.prototype.loadLevel = function(levelIndex) {

  if (this.upperScene || this.lowerScene) {
    game.stagesScene.removeChild(this.upperScene);
    game.stagesScene.removeChild(this.lowerScene);    
  }

  this.upperScene = new settings.levels[levelIndex].upperScene(game);
  this.upperScene.y = 0;
  game.stagesScene.addChild(this.upperScene);

  this.lowerScene = new settings.levels[levelIndex].lowerScene(game);
  this.lowerScene.y = game.height / 2;
  game.stagesScene.addChild(this.lowerScene);
};

Game.prototype.twist = function() {

  this.twisted = !this.twisted;
  game.stagesScene.tl.scaleTo(1, this.twisted ? -1 : 1, 10, enchant.Easing.LINEAR);
  // game.stagesScene.tl.rotateTo(this.twisted ? 180 : 0, 10, enchant.Easing.LINEAR);
};

var Player = Class.create(enchant.Sprite, {
  initialize: function () {
    var self = this;

    enchant.Sprite.call(this, 200, 358);
    this.image = game.assets[settings.player.sprite];
    this.x = this.y = 0;
    this.scale(0.3, 0.3);
    this.lives = settings.player.lives;
    this.walking = true;
    this.frame = 1;
    this.frames = [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ];

    this.addEventListener('enterframe', function () {

      /*

      //game.rootScene.scale(0.3,0.3);

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
      // 

      */
     

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





window.ggj = new Game();

})();



