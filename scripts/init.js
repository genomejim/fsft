

// create objects to use as associative arrays 
  var chars = new Object;
  var npcs = new Object;
  var collisions = new Object;

// clocks and counts
  var score = 1500;
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
  var active_level = 1;
  var level_display_name = "Howl on the Moon!";
  var spray_speed = 2;

  var snd = new Audio("./content/sounds/Howl.m4a");
  snd.play();

KEY_CODES = {
  'SPACE': [32, 70],
   'LEFT': [37, 65],
     'UP': [38, 87],
  'RIGHT': [39, 68],
   'DOWN': [43, 83],
      'e': [69],
      'q': [81],
      'z': [90],
      'p': [80],
      'r': [82],
};


var get_key_codes = function(characters) {
/* SPAWN is a hash that describes the characters to spawn by key code
SPAWN = {
  39: ['scientist'],
  68: ['scientist'],
  ...
}       */
  var s = new Object();
  for (var character_name in characters) {
    var spawn_keys = characters[character_name].spawn_keys;
    for (var i in spawn_keys) {
      var key_codes = KEY_CODES[spawn_keys[i]];
      for (var j in key_codes) {
          var key_code = key_codes[j];
        if (! s[key_code]) {
          s[key_code] = new Array();
        }
        s[key_code].push(character_name);
      }
    }
  }

  return s;
}

KEYPRESSED = '';  // set to key code when key pressed
CHR = get_characters();
SPAWN = get_key_codes(CHR);

// create units that start in play
// unit params (x,y,speed,height,width,image_src,hp,melee_damage)


  var lab = new unit("lab");
  chars[chars_count] = lab;
  chars_count++;

  //var lab = add_unit('lab');
  var lair = new unit("lair");
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

// Entry point here :>
game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);


