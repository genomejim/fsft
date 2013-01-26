//create objects to use as associative arrays 
var chars = new Object;
var npcs = new Object;
var scenes = new Object;
var collisions = new Object;

//clocks and counts
var score = 1000;
var science = 100;
var evil_science = 100;
var chars_count = 0;
var npcs_count = 0;
var turn_count = 0;
var player_cooldown = 100;
game_base.fps = 50;
var active_chars_count = 0;
var active_npcs_count = 0;
var collision_count = 0;
var grogon_text = 0;


//instantiate scenes and stuff them in the associative array scenes

var moon = new scene(true,'moon',"./content/images/moon.png",'none','elevator',true);
scenes.moon = moon;

var lab_loc = new character_location(true,25,505,"lobby");
var lab_appearance = new appearance(96,96,"./content/images/scientist_base.png","./content/images/scientist_base.png","labcoat");
var lab_stats= new base_stats(0,"hero","rawr",false,0);
var lab_combat_stats = new combat_stats("active",500,500,1,25,25,25,1,200,false,3,3);

var lab = new character (lab_loc,lab_appearance,lab_stats,lab_combat_stats);
chars[chars_count] = lab;
chars_count++;

var evil_lab_loc = new character_location(true,1025,505,"lobby");
var evil_lab_appearance = new appearance(96,96,"./content/images/scientist_base.png","./content/images/scientist_base.png","labcoat");
var evil_lab_stats= new base_stats(0,"hero","rawr",false,0);
var evil_lab_combat_stats = new combat_stats("active",10000,10000,1,25,25,25,1,200,false,3,3);

var evil_lab = new character (evil_lab_loc,evil_lab_appearance,evil_lab_stats,evil_lab_combat_stats);
npcs[npcs_count] = evil_lab;
npcs_count++;  

//instantiate the walkbox
var box = new walkbox(1920,1200,0,0);




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