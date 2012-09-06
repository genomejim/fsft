//create objects to use as associative arrays 
var chars = new Object;
var npcs = new Object;
var scenes = new Object;
var chars_count = 0;

/* cheat sheet for initializing characters,npcs,enemies
character_location
                     draw,x,y,scene,

appearance           
                     height,width,src,defeated_src,suit
base_stats
                     speed,role,text,contact,xp,
combat_stats
                     state,hp,max_hp,hp_regen_rate,hp_regen_baseline,shield,max_shield,shield_regen_rate,
                     ammo,beam,beam_damage,melee_damage
*/

//generic base and combat stats
//var npc_base_appearance = new appearance (96,96,"./content/images/redshirt.png","./content/images/redshirt.png","labcoat")
//var npc_base_stats= new base_stats(1,"npc","hi",false,0);
//var npc_combat_stats = new combat_stats("active",0,0,0,0,0,0,0,0,false,0,0);


//character
//var maxer_loc = new character_location(true,50,505,"lobby");
//var maxer_appearance = new appearance(256,256,"./content/images/scientist.png","./content/images/scientist.png","labcoat");
//var maxer_stats= new base_stats(10,"hero","rawr",false,0);
//var maxer_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

//var maxer = new character (maxer_loc,maxer_appearance,maxer_stats,maxer_combat_stats);
//chars.maxer = maxer;


//enemies - Lab level 
var ninja_appearance = new appearance(96,96,"./content/images/evil_scientist.png","./content/images/evil_scientist.png","ninja");
var ninja_base_stats = new base_stats(2,"enemy","HIIIIYAGH",false,50);
var ninja_combat_stats = new combat_stats("active",50,50,0,0,0,0,0,1,false,0,2);

var ninja_loc = new character_location(false,500,505,"elevator");
var ninja = new character(ninja_loc, ninja_appearance,ninja_base_stats, ninja_combat_stats);
ninja.speed = Math.round(((Math.random()*4) - 1 )) * ninja.speed;

npcs.ninja = ninja;




//npcs



//var bunny = new character (true,10,600,505,"./content/images/bunny.png","./content/images/bunny.png",96,'lobby','tutorial',50,'active','press space for Science beam!');

//npcs.redshirt = redshirt;
//npcs.annie = annie;
//npcs.meepo = meepo;
//npcs.pogo = pogo;
//npcs.portal = portal;
//npcs.ninja_palace2_trigger = ninja_palace2_trigger;

//instantiate scenes and stuff them in the associative array scenes


var moon = new scene(true,'moon',"./content/images/moon.png",'none','elevator',true);
scenes.moon = moon;

//var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','lab1');
//var lab1 = new scene(false,'lab1',"./content/images/lab1.png",'elevator','lab2');
//var lab2 = new scene(false,'lab2',"./content/images/lab2.png",'lab1','none');

//var launch = new scene(false,'launch',"./content/images/launch.png",'lab2','none');


//instantiate the walkbox
var box = new walkbox(1920,1200,0,0);

//init sounds
//var snd_lobby = new Audio("./content/sounds/lobby.mp3");
//var snd_hit = new Audio("./content/sounds/thunder.wav");

//init filthy global variables
game_base.fps = 50;



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

