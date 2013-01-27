// create objects to use as associative arrays 
  var chars = new Object;
  var npcs = new Object;
  var collisions = new Object;

// clocks and counts
  var score = 1000;
  var science = 100;
  var superstition = 100;
  var chars_count = 0;
  var npcs_count = 0;
  var turn_count = 0;
  var player_cooldown = 100;
  game_base.fps = 50;
  var active_chars_count = 0;
  var active_npcs_count = 0;
  var collision_count = 0;
  var grogon_text = 0;

// unit definitions

  var scientist_cost = 5;
  var scientist_hp = 100;
  var scientist_damage = 3;
  var scientist_cooldown = 30;
  var scientist_speed = 2;

  var flying_scientist_cost = 7;
  var flying_scientist_hp = 75;
  var flying_scientist_damage = 5;
  var flying_scientist_cooldown = 30;
  var flying_scientist_speed = 4;
 
  var science_trooper_cooldown = 20;
  var science_trooper_cost = 10;
  var science_trooper_hp = 200;
  var science_trooper_damage = 4;
  var science_trooper_speed = 1;

  var werewolf_cooldown = 20;
  var werewolf_cost = 10;
  var werewolf_hp = 200;
  var werewolf_damage = 4;
  var werewolf_speed = 1;

  var giant_trooper_cooldown = 10;
  var giant_trooper_cost = 100;
  var giant_trooper_hp = 1250;
  var giant_trooper_damage = 7;
  var giant_trooper_speed = .2;

  var pylon_cooldown = 20;
  var pylon_cost = 10;
  var pylon_hp = 10;
  var pylon_damage = 1;
  var pylon_speed = 0;

  var grogon_cooldown = 1;
  var grogon_cost = 1000;
  var grogon_hp = 17500;
  var grogon_damage = 25;
  var grogon_speed = 2;  

  var rocket_cooldown = 1;
  var rocket_cost = 5;
  var rocket_hp = 5;
  var rocket_damage = 30;
  var rocket_speed = 15;

  var beast_cooldown = 1;
  var beast_cost = 250;
  var beast_hp = 700;
  var beast_damage = 15;
  var beast_speed = 5;

// create units that start in play
// unit params (x,y,speed,height,width,image_src,hp,melee_damage)

  var lab = new unit (25,505,0,96,96,"./content/images/scientist_base.png",500,3);
  chars[chars_count] = lab;
  chars_count++;

  var lair = new unit (1000,505,0,96,96,"./content/images/scientist_base.png",10000,3);
  npcs[npcs_count] = lair;
  npcs_count++;  
//background image
  var back = new Image();
  back.src = "./content/images/moon.png";
//init canvas and buffer
  var _canvas = document.getElementById('game_base');
  var _canvasContext = null;

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');

    _canvasBufferContext.fillStyle    = '#00f';
    _canvasBufferContext.font         = 'bold 15px sans-serif';
    _canvasBufferContext.textBaseline = 'top';
}