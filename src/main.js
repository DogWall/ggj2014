
/* global enchant, Class, HEIGHT, WIDTH, SPEED, TRANSITION */

//init enchant.js
HEIGHT = window.innerHeight;
WIDTH = window.innerWidth;
SPEED = 800;
TRANSITION = 10;

// enchant.ENV.USE_ANIMATION  = false;
enchant.ENV.TOUCH_ENABLED  = false;
enchant.ENV.RETINA_DISPLAY = false;

enchant();

var Marker = Class.create(enchant.Node, { });

////////////////////////////

function Pool () {
  this.pools = [];
}
Pool.prototype.get = function() {
  if ( this.pools.length > 0 ) {
    return this.pools.pop();
  }
  // console.log('pool ran out!');
  return null;
};
Pool.prototype.add = function(v) {
  this.pools.push(v);
};

////////////////////////////

function regularFrameMove() {
  if (this.x >= WIDTH) {
    this.x = 1 - this.width + (WIDTH - this.x); //compensate frame exces
  }
}

function inverseFrameMove() {
  if ((this.x + this.width) < 0) {
    this.x = WIDTH - (0 - this.x - this.width); //compensate frame exces
  }
}

// ROAD
function addRoad (game, scene, modifier, direction) {

  var asset = game.assets['distimg/route-' + modifier + '-fs8.png'];
  var ground = new enchant.Sprite(asset.width, asset.height);
  ground.image = asset;
  ground.width = 20000;
  ground.x = WIDTH / 2 - ground.width / 2;
  ground.y = HEIGHT / 2 - ground.height;
  ground.tl
    .moveBy(direction * SPEED, 0, 100)
    .moveBy(- direction * SPEED, 0, 0)
    .loop();

  ground.touchEnabled = false;
    ground.disableCollection();
  scene.addChild(ground);
  return ground;
}

// DECOR
function addDecor (game, scene, modifier) {

  var asset = game.assets['distimg/fond-' + modifier + '.png'];
  var bg = new enchant.Sprite(asset.width, asset.height);
  bg.image = asset;
  bg.width = WIDTH;
  bg.x = 0 ;
  bg.y = HEIGHT / 2 - bg.height;
  bg.touchEnabled = false;
  bg.disableCollection();
  scene.addChild(bg);

  asset = game.assets['distimg/decor-' + modifier + '.png'];
  bg = new enchant.Sprite(asset.width, asset.height);
  bg.image = asset;
  bg.width = WIDTH;
  bg.x = 0;
  bg.y = HEIGHT / 2 - bg.height;
  bg.touchEnabled = false;
  scene.addChild(bg);

  return bg;
}

// BUILDINGS
function addBuildings (game, scene, ground, modifier) {
  var objects = [],
      xoffset = 0,
      direction = (modifier == 'n' ? 1 : -1),
      i = 0;

  for (i = 0; xoffset < WIDTH ; i++) {
    var asset = game.assets['distimg/imm' + ((i%6)+1) + '-' + modifier + '-fs8.png'];
    objects[i] = new enchant.Sprite(asset.width, asset.height);
    objects[i].image = asset;
    objects[i].x = asset.width/2+xoffset;
    objects[i].y = HEIGHT / 2 - ground.height - objects[i].height;
    // objects[i].bycount = 20;
    // objects[i].tl.moveBy(-1000, 0, 300);
    objects[i].touchEnabled = false;
    objects[i].scene = scene;

    if (modifier == 'n') {
      objects[i].onenterframe = regularFrameMove;
    } else {
      objects[i].onenterframe = inverseFrameMove;
    }

    objects[i].tl
      .moveBy(direction * SPEED, 0, 100)
      .moveBy(direction * SPEED, 0, 100)
      .loop();

    scene.addChild(objects[i]);

    xoffset += asset.width;
  }

  return objects;
}

// TRASHES
function addTrashes (game, scene, ground, modifier) {
  var objects = [],
      xoffset = 0,
      direction = (modifier == 'n' ? 1 : -1),
      i = 0;

  var asset = game.assets['distimg/elem-poubelles-' + modifier + '.png'];

  for (i = 0; xoffset < WIDTH; i++) {
    objects[i] = new enchant.Sprite(asset.width, asset.height);
    objects[i].image = asset;
    objects[i].x = objects[i].width / 2+xoffset;
    objects[i].y = HEIGHT / 2 - ground.height - (Math.random() * objects[i].height * 0.8);
    objects[i].touchEnabled = false;
    objects[i].disableCollection();

    if (modifier == 'n') {
      objects[i].onenterframe = regularFrameMove;
    } else {
      objects[i].onenterframe = inverseFrameMove;
    }

    objects[i].tl
      .moveBy(direction * SPEED, 0, 100)
      .moveBy(direction * SPEED, 0, 100)
      .loop();

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

  if (modifier == 'n') { xoffset = WIDTH; limit = 0; }
  else { xoffset = 0; limit = WIDTH; }

  var direction = (modifier == 'n') ? 1 : -1;

  var asset = game.assets['distimg/' + prefix + '-' + modifier + '.png'];

  for (i = 0; xoffset < limit; i++) {
    objects[i] = new enchant.Sprite(asset.width, asset.height);
    objects[i].image = asset;
    objects[i].x = objects[i].width / 2+xoffset;
    objects[i].y = HEIGHT / 2 - ground.height - objects[i].height * 0.9;
    objects[i].touchEnabled = false;
    objects[i].bycount = count;
    objects[i].disableCollection();

    if (modifier == 'n') {
      objects[i].onenterframe = regularFrameMove;
    } else {
      objects[i].onenterframe = inverseFrameMove;
    }

    objects[i].tl
      .moveBy(direction * SPEED, 0, 100)
      .moveBy(direction * SPEED, 0, 100)
      .loop();

    scene.addChild(objects[i]);

    if (modifier == 'n')
      xoffset -= WIDTH / count - Math.random() * 100 + 50;
    else
      xoffset += WIDTH / count + Math.random() * 100 - 50;
  }

  return objects;
}



//////////////////  SCENES  /////////////////////

var SceneOneUpper = Class.create(enchant.Group, {
  initialize: function (game) {
    var self = this;
    enchant.Group.call(this);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.originX = WIDTH / 2;
    this.originY = HEIGHT / 2;

    this.bg = addDecor(game, this, 'jour');

    this.ground = addRoad(game, this, 'jour', -1);

    this.objects = [
      [], // bin for new objects
      addBuildings(game, this, this.ground, 'j'),
      // [this.addChild(game.player)],
     // [this.addChild(FGMarker)],
      addCommon(game, this, this.ground, 3, 'elem-arbre', 'j'),
      addCommon(game, this, this.ground, 2, 'elem-lampe', 'j'),
      addTrashes(game, this, this.ground, 'j')
    ];

    // METEORS
    var asset = game.assets['distimg/falling_meteorite.png'];
    var meteorsPool = new Pool();
    for (var i = 0; i < 5; i++) {
      var meteor = new enchant.Sprite(asset.width, asset.height);
      meteor.image = asset;
      meteor.touchEnabled = false;
      meteorsPool.add(meteor);
    }
    game.rootScene.tl
      .delay(30)
      .then(function() {
        var meteor = meteorsPool.get();
        meteor._image = asset;
        meteor.x = WIDTH/2 - (0.5-Math.random())*WIDTH/1.5;
        meteor.y = - HEIGHT;
        meteor.age = 0;
        meteor._intersected = false;
        self.addChild(meteor);
        meteor.tl
          .clear()
          .moveTo(game.player.x+(0.5-Math.random())*game.player.width*10, game.player.y+100, 35,enchant.Easing.EXPO_EASEIN)
          .then(function(){
            meteor.onenterframe = function(){ };
            self.objects[0].push(meteor);
          })
          .delay(100)
          .then(function(){
            self.removeChild(meteor);
            meteorsPool.add(meteor);
          });

        meteor.onenterframe = function(){
          if (this.age > 100) {

            self.removeChild(this);
            meteorsPool.add(meteor);

          } else if (! game.twisting && ! this._intersected) {
            if (game.frame % 3 === 0 && this.intersect(game.player)) {
              // console.log('Yo, you are dead bitch !');
              this._intersected = true;
              self.removeChild(this);
              meteorsPool.add(meteor);
            }
          }
        };

      })
      .loop();
  }
});
SceneOneUpper.preload = ['sounds/Jour_1_0.wav','sounds/Nuit_1_0.wav','distimg/route-jour-fs8.png', 'distimg/elem-poubelles-j.png', 'distimg/elem-arbre-j.png', 'distimg/elem-lampe-j.png', 'distimg/fond-jour.png', 'distimg/decor-jour.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('distimg/imm' + (i+1) + '-j-fs8.png'); }



var SceneOneLower = Class.create(enchant.Group, {
  initialize: function (game) {
    enchant.Group.call(this);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.originX = WIDTH / 2;
    this.originY = HEIGHT / 2;

    this.bg = addDecor(game, this, 'nuit');
    this.ground = addRoad(game, this, 'nuit', 1);
    
    this.objects = [
      [], // bin for new objects
      addBuildings(game, this, this.ground, 'n'),
      //[this.addChild(game.player)],
      //[this.addChild(FGMarker)],
      addCommon(game, game.lowerScenefg, this.ground, 3, 'elem-arbre', 'n'),
      addCommon(game, game.lowerScenefg, this.ground, 2, 'elem-lampe', 'n'),
      addTrashes(game, this, this.ground, 'n')
    ];

  }
});
SceneOneLower.preload = ['distimg/route-nuit-fs8.png', 'distimg/falling_meteorite.png', 'distimg/elem-poubelles-n.png', 'distimg/elem-arbre-n.png', 'distimg/elem-lampe-n.png', 'distimg/fond-nuit.png', 'distimg/decor-nuit.png'];
for (var i = 0; i < 6; i++) { SceneOneUpper.preload.push('distimg/imm' + (i+1) + '-n-fs8.png'); }



(function () {

var game;

var settings = {
  player: {
    lives: 3,
    sprite_j: 'distimg/jeanjacques-j-fs8.png',
    sprite_n: 'distimg/darkjj.png'
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
      .fadeOut(TRANSITION / 2)
      .then(function(){
        if (game.twisted) {
          //game.upperScene.removeChild(this);
          this.image = this.image_n;
          //game.lowerScene.addChild(this);
        } else {
          // game.lowerScene.removeChild(this);
          this.image =  this.image_j;
          //game.upperScene.addChild(this);
        }
      })
      .fadeIn(TRANSITION / 2);
  }
});



/**
 * Main
 */
var Game = function () {

  var self = this;

  game = this.game = new enchant.Core(WIDTH, HEIGHT); //screen res

  var preload = [ settings.player.sprite_j, settings.player.sprite_n, 'sounds/Transition_2.wav' ];

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

    self.sndTransition = game.assets['sounds/Transition_2.wav'].clone();
    self.sndJour = game.assets['sounds/Jour_1_0.wav'].clone();
    self.sndJour.play();

    self.sndNuit = game.assets['sounds/Nuit_1_0.wav'].clone();
    self.sndNuit.play();
    self.sndNuit.volume = 0;

    //FGMarker = new enchant.Marker();

    self.backgroundScene = new enchant.Group();
    self.backSprite = new enchant.Sprite(WIDTH, HEIGHT);
    self.backSprite.backgroundColor = 'lightblue';
    self.backgroundScene.addChild(self.backSprite);
    // game.rootScene.addChild(self.backgroundScene);
    game.upperScene = new Scene();
    game.lowerScene = new Scene();
    game.player = new Player();
    game.playerScene = new enchant.Group();
    game.playerScene.addChild(game.player);
    //game.upperScene.insertBefore(game.player,FGMarker);

    self.loadLevel(0);
    game.rootScene.addChild(game.playerScene);

    game.playerScene.y = HEIGHT / 2;
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

  this.upperScene = new settings.levels[levelIndex].upperScene(game);

  game.rootScene.addChild(this.upperScene);

  this.lowerScene = new settings.levels[levelIndex].lowerScene(game);
  this.lowerScene.rotation = -180;
  game.lowerScenefg =- 180;
  game.rootScene.addChild(this.lowerScene);
  this.upperScene.y = HEIGHT / 2;
  this.lowerScene.y = HEIGHT / 2;
};

Game.prototype.twist = function() {

  var self = this;

  if (! game.twisting){


    game.twisting = true;

    game.twisted = !game.twisted;
    game.player.twist();
      if(game.twisted){
    self.sndTransition.play();
    self.sndJour.volume = 0.5;

    self.upperScene.tl.rotateBy(-180, TRANSITION);
    self.lowerScene.tl.rotateBy(-180, TRANSITION)
      .then(function(){
        game.twisting = false;
        self.sndJour.volume = 0;
        self.sndNuit.volume = 1;
        self.sndTransition.stop();

      });

  } else {

    self.sndTransition.play();
    self.sndNuit.volume = 0.5;

    self.upperScene.tl.rotateBy(180, TRANSITION).then(function(){
      game.twisting = false;
      self.sndNuit.volume = 0;
      self.sndJour.volume = 1;
      self.sndTransition.stop();

      // this.insertBefore(game.player, FGMarker);
      // this.addChild(game.player);
      // game.player.tl.fadeIn(10);
      // self.sndNuit.volume=1;
    });
    self.lowerScene.tl.rotateBy(180, TRANSITION);

    // this.rootScene.tl.rotateBy(180, 15);
  }
  }
};


window.ggj = new Game();

})();



