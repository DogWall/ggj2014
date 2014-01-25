
/* global enchant, Class */

//init enchant.js
HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;

enchant();

var SceneOneUpper = Class.create(enchant.Scene, {
  initialize: function (game) {

    enchant.Scene.call(this);

    // ROAD
    var ground = new enchant.Sprite(game.assets['img/route-jour.png'].width, game.assets['img/route-jour.png'].height);
    ground.image = game.assets['img/route-jour.png'];
    ground.width = 20000;
    ground.x = WIDTH / 2 - ground.width / 2;
    ground.y = HEIGHT / 2 - ground.height;
    ground.tl.moveBy(-1500, 0, 300).moveBy(1500, 0, 0).loop();
    ground.touchEnabled = false;
    this.addChild(ground);

    this.buildings = [];

    // BUILDINGS
    var xoffset = 0;
    for (var i = 0; xoffset < WIDTH * 2.5; i++) {
      var asset = game.assets['img/imm' + ((i%6)+1) + '-j.png'];
      var building = this.buildings[i] = new enchant.Sprite(asset.width, asset.height);
      building.image = asset;
      building.x = building.width +xoffset;
      building.y = HEIGHT / 2 - ground.height - building.height;
      // building.tl.moveBy(-1000, 0, 300);
      building.touchEnabled = false;
      this.addChild(building);

      xoffset += asset.width;
    }

    // this.actors = new enchant.Scene();
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
    ground.image = assetroad;
    ground.width = 20000;
    ground.x = WIDTH / 2 - ground.width / 2;
    ground.y = HEIGHT / 2 - ground.height;
    ground.tl.moveBy(1500, 0, 300).moveBy(-1500, 0, 0).loop();
    ground.touchEnabled = false;
    this.addChild(ground);

    this.buildings = [];

    // BUILDINGS
    var xoffset = 0;
    for (var i = 0; xoffset < WIDTH * 2; i++) {
      var asset = game.assets['img/imm' + ((i%6)+1) + '-n-fs8.png'];
      var building = this.buildings[i] = new enchant.Sprite(asset.width, asset.height);
      building.image = asset;
      building.x = asset.width+xoffset;
      building.y = HEIGHT / 2 - ground.height - building.height;
      // building.tl.moveBy(1000, 0, 300);
      building.touchEnabled = false;

      this.addChild(building);

      xoffset += asset.width;
    }


  }
});
SceneOneLower.preload = ['img/route-nuit.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('img/imm' + (i+1) + '-n-fs8.png'); }



(function () {

var game;

var settings = {
  player: {
    lives: 3,
    sprite_j: 'img/jeanjacques-j-fs8.png',
    sprite_n: 'img/jeanjacques-n-fs8.png'
  },
  levels: [
    {
      upperScene: SceneOneUpper,
      lowerScene: SceneOneLower
    }
  ]
};
/*
* Dropping objects
 */
Droppable = Class.create(enchant.Sprite, {
    initialize: function (x,y) {
        enchant.Sprite.call(x,y);
        this.callback = function (){}
    },
    trajectory: function(){this.y+=3;},
    onexitframe:function(){
        if (this.intersect(game.player))
            callback();
    }
});
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
     this.frame=this.frames;

    this.walking = true;
  },
  twist: function(){

    this.tl.fadeOut(10).then(function(){this.image = (game.twisted ? this.image_n : this.image_j)}).fadeIn(10);
  },
  onenterframe: function() {


    //06.2 Intersect

    //06.3 Within

    //this.frame = this.walking ? this.frames : 1;
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
    preload.push("enchant.js/images/space1.png");

  game.preload(preload); //preload assets png, wav etc
   // game.preload(["enchant.js/images/space1.png"])

  game.fps = 24;
  game.onload = function () {


    self.backgroundScene = new enchant.Scene();
    self.backSprite = new enchant.Sprite(WIDTH, HEIGHT);
    self.backSprite.backgroundColor = 'lightblue';
    self.backgroundScene.addChild(self.backSprite);
    // game.rootScene.addChild(self.backgroundScene);

    //game.rootScene = new enchant.Group();
    //game.rootScene.addChild(game.rootScene);

    game.player = new Player();
    game.playerScene = new enchant.Scene();
    game.playerScene.addChild(game.player);

    self.loadLevel(0);
    game.rootScene.addChild(game.playerScene);
    game.playerScene.y = HEIGHT / 2;

      game.onexitframe = function() {

          if (game.rootScene.age%8 == 0)
          {

              test = new Sprite(64,64);

              test.image=game.assets["enchant.js/images/space1.png"]
              test.x=WIDTH/2-WIDTH/1.5
              test.y=-HEIGHT
              game.rootScene.addChild(test)
              console.log("incoming")
              //test.x=this.player.x;
              if (game.twisted){
                  self.lowerScene.addChild(test);}
              else{
                  self.upperScene.addChild(test);}

              test.tl.moveBy(WIDTH/1.5,HEIGHT,30);
              test.onenterframe=function(){
              if (!game.twisting)
              {

                if (this.intersect(game.player))
                {
                    console.log("Yo, you're dead bitch!")
                }
              }


          }
          }

      }


  };

  game.shiftBuildings = function (scene, direction) {
    if (scene.buildings && scene.buildings.length > 0) {
      var tmp, last = scene.buildings.length - 1;

      // move all the things
      for (var i = 0; i <= last; i++) {
        scene.buildings[i].x += (10 * direction);
      }

      // reuse buildings
      if (scene.buildings[0].x < WIDTH * - 1.5) {
        tmp = scene.buildings.shift();
        tmp.x = scene.buildings[last-1].x + scene.buildings[last-1].width;
        // console.log('push the unshifted to %o', tmp.x);
        scene.buildings.push( tmp );
      }
      if (scene.buildings[last].x > WIDTH * 1.5) {
        tmp = scene.buildings.pop();
        tmp.x = scene.buildings[0].x - scene.buildings[0].width;
        scene.buildings.unshift( tmp );
        // console.log('shift the poped to %o', tmp.x);
      }
    }
  };

  game.rootScene.addEventListener('enterframe', function () {

    game.shiftBuildings(self.upperScene, -1);
    game.shiftBuildings(self.lowerScene, +1);

  });

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

  this.upperScene = new settings.levels[levelIndex].upperScene(game);
  game.rootScene.addChild(this.upperScene);

  this.lowerScene = new settings.levels[levelIndex].lowerScene(game);
  this.lowerScene.rotation = -180;
  game.rootScene.addChild(this.lowerScene);
  this.lowerScene.y = HEIGHT / 2;
  this.upperScene.y = HEIGHT / 2;
};

Game.prototype.twist = function() {

  var self = this;

  if (! game.twisting) {

    game.twisting = true;

    game.twisted = !game.twisted;
    // game.rootScene.tl.scaleTo(1, this.twisted ? -1 : 1, 10, enchant.Easing.LINEAR);
    // game.rootScene.tl.rotateTo(this.twisted ? 180 : 0, 10, enchant.Easing.LINEAR);

    // this.player.tl.fadeOut(0);
    game.player.scale(-1, 1); // this.twisted
    game.player.twist();
    if (game.twisted) {

      this.upperScene.tl.rotateBy(-180, 10).then(function(){
        game.twisting = false;
      });
      this.lowerScene.tl.rotateBy(-180, 10);


      //  this.rootScene.tl.rotateBy(-180,15);


    } else {

      this.upperScene.tl.rotateBy(180, 10);
      this.lowerScene.tl.rotateBy(180, 10).then(function(){game.twisting = false; });
       // this.rootScene.tl.rotateBy(180,15);

    }
  }

};


window.ggj = new Game();

})();



