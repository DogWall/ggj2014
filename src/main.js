
/* global enchant, Class, HEIGHT, WIDTH */

//init enchant.js
HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;

enchant();

// ROAD
function addRoad (game, scene, modifier, direction) {
  var asset = game.assets['img/route-' + modifier + '-fs8.png'];
  var ground = new enchant.Sprite(asset.width, asset.height);
  ground.image = asset;
  ground.width = 20000;
  ground.x = WIDTH / 2 - ground.width / 2;
  ground.y = HEIGHT / 2 - ground.height;
  ground.tl.moveBy(direction * 1500, 0, 300).moveBy(- direction * 1500, 0, 0).loop();
  ground.touchEnabled = false;
  scene.addChild(ground);
  return ground;
}

// DECOR
function addDecor (game, scene, modifier) {
  var asset = game.assets['img/decor-' + modifier + '.png'];
  var bg = new enchant.Sprite(asset.width, asset.height);
  bg.image = asset;
  bg.width = WIDTH;
  bg.x = WIDTH / 2 - bg.width / 2;
  bg.y = HEIGHT / 2 - bg.height;
  bg.touchEnabled = false;
  scene.addChild(bg);

  asset = game.assets['img/fond-' + modifier + '.png'];
  bg = new enchant.Sprite(asset.width, asset.height);
  bg.image = asset;
  bg.width = WIDTH;
  bg.x = WIDTH / 2 - bg.width / 2;
  bg.y = HEIGHT / 2 - bg.height;
  bg.touchEnabled = false;
  scene.addChild(bg);

  return bg;
}

// BUILDINGS
function addBuildings (game, scene, ground, modifier) {
  var objects = [],
      xoffset = 0,
      i = 0;

  for (i = 0; xoffset < WIDTH * 3; i++) {
    var asset = game.assets['img/imm' + ((i%6)+1) + '-' + modifier + '-fs8.png'];
    objects[i] = new enchant.Sprite(asset.width, asset.height);
    objects[i].image = asset;
    objects[i].x = objects[i].width / 2+xoffset;
    objects[i].y = HEIGHT / 2 - ground.height - objects[i].height;
    // objects[i].bycount = 20;
    // objects[i].tl.moveBy(-1000, 0, 300);
    objects[i].touchEnabled = false;
    scene.addChild(objects[i]);

    xoffset += asset.width;
  }
  return objects;
}

// TRASHES
function addTrashes (game, scene, ground, modifier) {
  var objects = [],
      xoffset = 0,
      i = 0;

  for (i = 0; xoffset < WIDTH * 3; i++) {
    var asset = game.assets['img/elem-poubelles-' + modifier + '.png'];
    objects[i] = new enchant.Sprite(asset.width, asset.height);
    objects[i].image = asset;
    objects[i].x = objects[i].width / 2+xoffset;
    objects[i].y = HEIGHT / 2 - ground.height - (Math.random() * objects[i].height * 0.8);
    objects[i].touchEnabled = false;
    scene.addChild(objects[i]);

    xoffset += WIDTH / 5 + Math.random() * 1000;
  }
  return objects;
}

// COMMONS
function addCommon (game, scene, ground, count, prefix, modifier) {
  var objects = [],
      xoffset = 0,
      i = 0;

  for (i = 0; xoffset < WIDTH * count; i++) {
    var asset = game.assets['img/' + prefix + '-' + modifier + '.png'];
    objects[i] = new enchant.Sprite(asset.width, asset.height);
    objects[i].image = asset;
    objects[i].x = objects[i].width / 2+xoffset;
    objects[i].y = HEIGHT / 2 - ground.height - objects[i].height * 0.9;
    objects[i].touchEnabled = false;
    objects[i].bycount = count;
    scene.addChild(objects[i]);

    xoffset += WIDTH / count + Math.random() * 100 - 50;
  }
  return objects;
}






//////////////////  SCENES  /////////////////////

var SceneOneUpper = Class.create(enchant.Scene, {
  initialize: function (game) {
    var self = this;
    enchant.Scene.call(this);

    this.bg = addDecor(game, this, 'jour');
    this.ground = addRoad(game, this, 'jour', -1);

    this.objects = [
      [], // bin for new objects
      addBuildings(game, this, this.ground, 'j'),
      addCommon(game, this, this.ground, 3, 'elem-arbre', 'j'),
      addCommon(game, this, this.ground, 2, 'elem-lampe', 'j'),
      addTrashes(game, this, this.ground, 'j')
    ];

    // METEORS
    game.rootScene.tl.delay(30).then(function() {
      var meteor = new enchant.Sprite(64, 64);
      meteor.image = game.assets['enchant.js/images/space1.png'];
      meteor.x = WIDTH/2 - WIDTH/1.5;
      meteor.y = - HEIGHT;
      self.addChild(meteor);
      meteor.tl
        .moveTo(game.player.x+(0.5-Math.random())*game.player.width*10, game.player.y+100, 35,enchant.Easing.EXPO_EASEIN)
        .then(function(){
          // self.removeChild(meteor);
          meteor.onenterframe = function(){ };
          self.objects[0].push(meteor);
        })
        .delay(100)
        .then(function(){
          self.removeChild(meteor);
        });
      meteor.onenterframe = function(){
        if (! game.twisting && ! this._intersected) {
          var now = new Date();
          if (this.intersect(game.player)) {
            console.log('Yo, you are dead bitch, you were in scene since %o ms !', now - game.player.inSceneSince);
            this._intersected = true;
            self.removeChild(this);
          }
        }
      };
    }).loop();

  }
});
SceneOneUpper.preload = ['img/route-jour-fs8.png', 'img/elem-poubelles-j.png', 'img/elem-arbre-j.png', 'img/elem-lampe-j.png', 'img/fond-jour.png', 'img/decor-jour.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('img/imm' + (i+1) + '-j-fs8.png'); }



var SceneOneLower = Class.create(enchant.Scene, {
  initialize: function (game) {
    enchant.Scene.call(this);

    this.bg = addDecor(game, this, 'nuit');
    this.ground = addRoad(game, this, 'nuit', 1);
    
    this.objects = [
      [], // bin for new objects
      addBuildings(game, this, this.ground, 'n'),
      addCommon(game, this, this.ground, 3, 'elem-arbre', 'n'),
      addCommon(game, this, this.ground, 2, 'elem-lampe', 'n'),
      addTrashes(game, this, this.ground, 'n')
    ];

  }
});
SceneOneLower.preload = ['img/route-nuit-fs8.png', 'enchant.js/images/space1.png', 'img/elem-poubelles-n.png', 'img/elem-arbre-n.png', 'img/elem-lampe-n.png', 'img/fond-nuit.png', 'img/decor-nuit.png'];
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



/**
 * Player
 */
var Player = Class.create(enchant.Sprite, {
  initialize: function () {

    this.image_j = game.assets[settings.player.sprite_j];
    this.image_n = game.assets[settings.player.sprite_n];

    //enchant.Sprite.call(this, this.image_j.width, this.image_j.height);

    enchant.Sprite.call(this, this.image_j.width/5, this.image_j.height);
    this.image = this.image_j;

    this.x = WIDTH / 2;
    this.y = HEIGHT / 2 - this.height - 150;
    this.frames = [0,1,2,3,4,3,2,1];
    this.frame = this.frames;

    this.walking = true;
  },
  twist: function(){
    this.tl
      .then(function(){ 
        this.inSceneSince = new Date();
      })
      .fadeOut(10)
      .then(function(){
          this.image = (game.twisted ? this.image_n : this.image_j);
      })
      .fadeIn(10);
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
  //game.fps = 10;

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

  game.preload(preload); //preload assets png, wav etc
 // game.fps = 24;
  game.onload = function () {

    self.backgroundScene = new enchant.Scene();
    self.backSprite = new enchant.Sprite(WIDTH, HEIGHT);
    self.backSprite.backgroundColor = 'lightblue';
    self.backgroundScene.addChild(self.backSprite);
    // game.rootScene.addChild(self.backgroundScene);

    game.player = new Player();
    game.playerScene = new enchant.Scene();
    game.playerScene.addChild(game.player);

    self.loadLevel(0);
    game.rootScene.addChild(game.playerScene);
    game.playerScene.y = HEIGHT / 2;

  };

  game.shiftObjects = function (scene, direction) {
    // for each type
    if (scene.objects && scene.objects.length > 0) {
      for (var m = 0; m < scene.objects.length; m++) {

        var tmp, last = scene.objects[m].length - 1;
        if (last < 0) { continue; }

        // move all the things
        for (var i = 0; i <= last; i++) {
          scene.objects[m][i].x += (10 * direction);
        }

        // never reuse the first batch (new objects)
        if (m === 0) { continue; }

        // reuse object
        if (scene.objects[m][0].x < WIDTH * - 1.5) {
          tmp = scene.objects[m].shift();
          tmp.x = scene.objects[m][last-1].x + scene.objects[m][last-1].width /* + WIDTH / (scene.objects[m][last-1].bycount || 3) */;
          // console.log('push the unshifted to %o', tmp.x);
          scene.objects[m].push( tmp );
        }
        if (scene.objects[m][last].x > WIDTH * 1.5) {
          tmp = scene.objects[m].pop();
          tmp.x = scene.objects[m][0].x - scene.objects[m][0].width /* - WIDTH / (scene.objects[m][last-1].bycount || 3) */;
          scene.objects[m].unshift( tmp );
          // console.log('shift the poped to %o', tmp.x);
        }
      }
    }
  };

  game.rootScene.addEventListener('enterframe', function () {

    game.shiftObjects(self.upperScene, -1);
    game.shiftObjects(self.lowerScene, +1);

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



