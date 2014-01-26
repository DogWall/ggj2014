
/* global enchant, Class, HEIGHT, WIDTH, SPEED, TRANSITION */

//init enchant.js
HEIGHT = window.innerHeight * 2;
WIDTH = window.innerWidth * 2;
SPEED = 800;
TRANSITION = 10;

var FALLING_OBJECTS = [
  'distimg/falling_alien.png', 'distimg/falling_baleine.png', 'distimg/falling_godzilla.png',
  'distimg/falling_meteorite.png', 'distimg/falling_petunias.png', 'distimg/falling_piano.png',
  'distimg/falling_poubellesfire.png', 'distimg/falling_teckel.png' ];

var CARS_DAY = [ 'img/elem-voit2-j.png','img/elem-voit1-j.png' ];
var CARS_NIGHT = [ 'img/elem-voit2-n.png','img/elem-voit1-n.png' ];

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
        direction = (modifier == 'n' ? 1 : -1),
        i = 0;

  var direction = (modifier == 'n') ? 1 : -1;

  var asset = game.assets['distimg/' + prefix + '-' + modifier + '.png'];

  for (i = 0; xoffset < WIDTH; i++) {
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

      xoffset += WIDTH / 5 + Math.random() * 1000;
  }

  return objects;
}


function addCar (game, scene, ground,asset, direction,speed) {


    var car = new enchant.Sprite(asset.width, asset.height);
    car.image = asset;
    if (direction ==-1)
    {
        car.x = WIDTH+asset.width*(1+speed);
        car.y = HEIGHT/2 - asset.height;//ground.y + ground.width/2;
        car.tl.moveBy(-WIDTH-car.width*50,0,150).moveTo(WIDTH+asset.width*(1+speed),car.y,0).loop();
    }
    else
    {
        car.x = -asset.width*(1+speed);
        car.y = HEIGHT/2 - asset.height*1.5;//ground.y + ground.width/2;
        car.tl.moveBy(WIDTH+car.width*50,0,150).moveTo(-asset.width*(1+speed) ,car.y,0).loop();
    }

    car.touchEnabled = false;
    car.onenterframe = function () {

    }
    scene.addChild(car);
    car.disableCollection();

}

//////////////////  SCENES  /////////////////////

var SceneInfos = Class.create(enchant.Group, {
    initialize: function (game) {
      enchant.Group.call(this);

      this.x = 100;
      this.y = 100;
      this.width = 3 * 70;
      this.height = 70;
      this.game = game;

      this.hearts = [];

      this.coeurgris = this.game.assets['distimg/coeurgris.png'];
      this.coeurrouge = game.assets['distimg/coeurrouge.png'];

      for (var i = 0; i < 3; i++) {
        this.hearts[i] = new enchant.Sprite(this.coeurgris.width, this.coeurgris.height);
        this.hearts[i].image = this.coeurrouge;
        this.hearts[i].y = 10;
        this.hearts[i].x = (3-i) * 70;
        this.hearts[i].width = 62;
        this.hearts[i].height = 53;
        this.hearts[i].coeurrouge = true;
        this.addChild(this.hearts[i]);
      }
    },
    lostALife: function () {
      var lost = false;

      for (var i = 0; i < 3; i++) {
        if (this.hearts[i].coeurrouge) {
          this.hearts[i].image = this.coeurgris;
          lost = true;
          break;
        }
      }
      if (! lost) {
        this.game.loose();
      } else {
        setTimeout(function(){
          window.ggj.twist();
        }, 0);
      }
    }
});

var SceneOneUpperFG = Class.create(enchant.Group, {
    initialize: function (game) {
      var self = this;
      enchant.Group.call(this);

      this.width = WIDTH;
      this.height = HEIGHT;
      this.originX = WIDTH / 2;
      this.originY = HEIGHT / 2;

     // this.bg = addDecor(game, this, 'jour');

      this.ground = addRoad(game, this, 'jour', -1);
      this.removeChild(this.ground);
      //this.ground = game.assets['distimg/route-jour.png'];
      this.objects = [
        [], // bin for new objects
        // addBuildings(game, this, this.ground, 'j'),
        // [this.addChild(game.player)],
        // [this.addChild(FGMarker)],
        addCommon(game, this, this.ground, 3, 'elem-arbre', 'j'),
        addCommon(game, this, this.ground, 2, 'elem-lampe', 'j'),
        addTrashes(game, this, this.ground, 'j')
      ];
      addCar(game,this,this.ground,game.assets['img/elem-voit2-j.png'],1,0);
      addCar(game,this,this.ground,game.assets['img/elem-voit2-j.png'],1,30);
      addCar(game,this,this.ground,game.assets['img/elem-voit1-j.png'],-1,15);
      addCar(game,this,this.ground,game.assets['img/elem-voit1-j.png'],-1,7);

      // METEORS
      var meteorsPool = new Pool();

      for (var i = 0; i < FALLING_OBJECTS.length; i++) {
        var asset = game.assets[FALLING_OBJECTS[i]];
        var meteor = new enchant.Sprite(asset.width, asset.height);
        meteor.image = asset;
        meteor.frames = [0,1,2];
        meteor.touchEnabled = false;
        meteor.reset = function (){
          this.remove();
          meteorsPool.add(this);
        };
        meteor.reset();
      }
      
      game.rootScene.tl
        .delay(30)
        .then(function() {
          var meteor = meteorsPool.get();
          meteor.x = WIDTH/2 - (0.5-Math.random())*WIDTH/1.5;
          meteor.y = - HEIGHT;
          meteor.age = 0;
          meteor._intersected = false;
          self.addChild(meteor);
          meteor.tl
            .clear()
            .moveTo(game.player.x+(0.5-Math.random())*game.player.width*10, game.player.y+100, 60, enchant.Easing.EXPO_EASEIN)
            .moveBy(-1 * SPEED * 20, 0, 500)
            .then(function(){
              meteor.reset();
            });

          meteor.onenterframe = function(){
            // too old
            if (this.age > 100) {
              meteor.reset();

            // too low
            } else if (this.y + this.height > game.player.y + game.player.height) {
              this._intersected = true;

            // test intersections
            } else if (! game.twisting && ! this._intersected) {
              if (this.intersect(game.player)) {
                console.log('Yo, you are dead bitch !');
                game.infos.lostALife();
                this._intersected = true;
                meteor.reset();
              }
            }
          };

        })
        .loop();
    }
});

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
      addBuildings(game, this, this.ground, 'j')
      // [this.addChild(game.player)],
      // [this.addChild(FGMarker)],
      //  addCommon(game, this, this.ground, 3, 'elem-arbre', 'j'),
      //  addCommon(game, this, this.ground, 2, 'elem-lampe', 'j'),
      // addTrashes(game, this, this.ground, 'j')
    ];

  }
});
SceneOneUpper.preload = ['sounds/Jour.mp3','sounds/Nuit.mp3','distimg/route-jour-fs8.png', 'distimg/elem-poubelles-j.png', 'distimg/elem-arbre-j.png', 'distimg/elem-lampe-j.png', 'distimg/fond-jour.png', 'distimg/decor-jour.png'];
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
      addBuildings(game, this, this.ground, 'n')
      //[this.addChild(game.player)],
      //[this.addChild(FGMarker)],
      //addCommon(game, this, this.ground, 3, 'elem-arbre', 'n'),
     // addCommon(game, this, this.ground, 2, 'elem-lampe', 'n'),
      //addTrashes(game, this, this.ground, 'n')
    ];

    addCar(game,this,this.ground,game.assets['img/elem-voit2-n.png'],1,0);
    addCar(game,this,this.ground,game.assets['img/elem-voit2-n.png'],1,30);
    addCar(game,this,this.ground,game.assets['img/elem-voit1-n.png'],-1,15);
    addCar(game,this,this.ground,game.assets['img/elem-voit1-n.png'],-1,7);
  }
});

var SceneOneLoweFG = Class.create(enchant.Group, {
  initialize: function (game) {
    enchant.Group.call(this);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.originX = WIDTH / 2;
    this.originY = HEIGHT / 2;

   // this.bg = addDecor(game, this, 'nuit');
   this.ground = addRoad(game, this, 'nuit', 1);
    this.removeChild(this.ground);
    this.objects = [
        [], // bin for new objects
       // addBuildings(game, this, this.ground, 'n'),
        //[this.addChild(game.player)],
        //[this.addChild(FGMarker)],
        addCommon(game, this, this.ground, 3, 'elem-arbre', 'n'),
        addCommon(game, this, this.ground, 2, 'elem-lampe', 'n'),
        addTrashes(game, this, this.ground, 'n')
    ];
    addCar(game,this,this.ground,game.assets['img/elem-voit2-n.png'],1,0);
    addCar(game,this,this.ground,game.assets['img/elem-voit2-n.png'],1,30);
    addCar(game,this,this.ground,game.assets['img/elem-voit1-n.png'],-1,15);
    addCar(game,this,this.ground,game.assets['img/elem-voit1-n.png'],-1,7);
  }
});
SceneOneLower.preload = ['distimg/route-nuit-fs8.png', 'distimg/elem-poubelles-n.png', 'distimg/elem-arbre-n.png', 'distimg/elem-lampe-n.png', 'distimg/fond-nuit.png', 'distimg/decor-nuit.png'];
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
      lowerScene: SceneOneLower,
      playerScene: enchant.Group,
      lowerScenefg: SceneOneLoweFG,
      upperScenefg: SceneOneUpperFG,
       Boss: enchant.Sprite
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
  game.fps = 30;

  var preload = [ settings.player.sprite_j, settings.player.sprite_n, 'sounds/Transition.mp3', 'distimg/fantome.png', 'distimg/coeurgris.png', 'distimg/coeurrouge.png' ]
    .concat(FALLING_OBJECTS)
    .concat(CARS_DAY)
    .concat(CARS_NIGHT);

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

    self.sndTransition = game.assets['sounds/Transition.mp3'].clone();
    self.sndJour = game.assets['sounds/Jour.mp3'].clone();
    self.sndJour.play();

    self.sndNuit = game.assets['sounds/Nuit.mp3'].clone();
    self.sndNuit.play();
    self.sndNuit.volume = 0;

    //FGMarker = new enchant.Marker();

    // self.backgroundScene = new enchant.Group();
    // self.backSprite = new enchant.Sprite(WIDTH, HEIGHT);
    //self.backSprite.backgroundColor = 'lightblue';
    //self.backgroundScene.addChild(self.backSprite);
    // game.rootScene.addChild(self.backgroundScene);

    //game.upperScene = new enchant.Scene();
    //game.lowerScene = new enchant.Scene();

    game.player = new Player();

    // game.playerScene = new enchant.Group();
    // game.playerScene.addChild(game.player);
    //game.upperScene.insertBefore(game.player,FGMarker);

    self.loadLevel(0);
    //game.rootScene.addChild(game.playerScene);

    //game.playerScene.y = HEIGHT / 2;
  };

  game.fireTwistEvent = function () {
    var event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('touchstart', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = 'touchstart';
    }

    event.eventName = 'touchstart';

    if (document.createEvent) {
      document.dispatchEvent(event);
    } else {
      document.fireEvent('on' + event.eventType, event);
    }

  };

  game.rootScene.addEventListener('touchstart', function() {
    self.twist();
  });

  function changevisibility() {
    if (document.hidden === false || document.webkitHidden === false) {
      game.resume();
      self.sndNuit.play();
      self.sndJour.play();
    } else {
      self.game.pause();
      self.sndNuit.pause();
      self.sndJour.pause();
    }
  }
  document.addEventListener('visibilitychange', changevisibility, false);
  document.addEventListener('webkitvisibilitychange', changevisibility, false);

  game.start();
};


Game.prototype.loadLevel = function(levelIndex) {

  if (this.upperScene || this.lowerScene) {
    game.rootScene.removeChild(this.upperScene);
    game.rootScene.removeChild(this.upperScenefg);
    game.rootScene.removeChild(this.lowerScene);
    game.rootScene.removeChild(this.lowerScenefg);
  }

  this.upperScene = new settings.levels[levelIndex].upperScene(game);
  this.upperScenefg = new settings.levels[levelIndex].upperScenefg(game);
  this.Boss = new Sprite(game.assets['distimg/fantome.png'].width,game.assets['distimg/fantome.png'].height);
  this.Boss.image= game.assets['distimg/fantome.png'];
  game.rootScene.addChild(this.upperScene);

  this.playerScene = new settings.levels[levelIndex].playerScene();
  this.player = new Player();
  game.player = this.player;
  this.playerScene.addChild(this.player);

  this.lowerScene = new settings.levels[levelIndex].lowerScene(game);
  this.lowerScenefg = new settings.levels[levelIndex].lowerScenefg(game);
  this.lowerScene.rotation = -180;
  this.lowerScenefg.rotation =- 180;
  game.rootScene.addChild(this.lowerScene);

  game.rootScene.addChild(this.playerScene);
  game.rootScene.addChild(this.upperScenefg);
  game.rootScene.addChild(this.lowerScenefg);
  this.lowerScenefg.addChild(this.Boss);

  this.upperScenefg.y = HEIGHT / 2;
  this.playerScene.y = HEIGHT / 2;
  this.upperScene.y = HEIGHT / 2;
  this.lowerScene.y = HEIGHT / 2;
  this.lowerScenefg.y = HEIGHT / 2;

  game.infos = new SceneInfos(game);
  game.rootScene.addChild(game.infos);
};

Game.prototype.twist = function() {

  var self = this;

  if (! game.twisting){

    game.twisting = true;

    game.twisted = !game.twisted;
    game.player.twist();

    if (game.twisted) {

      self.sndTransition.play();
      self.sndJour.volume = 0.5;
      self.Boss.tl.clear();
      self.Boss.x=WIDTH-self.Boss.width;//self.player.x;
      self.Boss.y=self.player.y;
      self.Boss.tl.moveTo(WIDTH/2,self.Boss.y,100+Math.random()*100).then(function(){
        game.infos.lostALife();
      });
      //self.lowerScenefg.addChild(self.Boss);
      self.upperScene.tl.rotateBy(-180, TRANSITION);self.upperScenefg.tl.rotateBy(-180, TRANSITION);
      self.lowerScene.tl.rotateBy(-180, TRANSITION);self.lowerScenefg.tl.rotateBy(-180, TRANSITION)
          .then(function(){
              game.twisting = false;
              self.sndJour.volume = 0;
              self.sndNuit.volume = 1;
              self.sndTransition.stop();
          });

    } else {

      self.Boss.tl.clear();
      self.sndTransition.play();
      self.sndNuit.volume = 0.5;
      self.upperScenefg.tl.rotateBy(180, TRANSITION);
      self.lowerScene.tl.rotateBy(180, TRANSITION);self.lowerScenefg.tl.rotateBy(180, TRANSITION);
      self.upperScene.tl.rotateBy(180, TRANSITION).then(function(){
          game.twisting = false;
          self.sndNuit.volume = 0;
          self.sndJour.volume = 1;

      });

    }
  }
};

Game.prototype.loose = function() {
  alert('GAME OVER');
  setTimeout(function(){
    window.location.reload();
  }, 3000);
};

window.ggj = new Game();

})();



