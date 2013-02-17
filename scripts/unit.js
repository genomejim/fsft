unit = function(character_name) {

  var attr = CHR[character_name];

  //bookkeeping
  this.name = attr.name
  this.cost = attr.cost;
  this.cooldown = attr.cooldown;
  this.time_active = attr.time_active;

  //location
  this.x = attr.x;
  this.y = attr.y;
//  this.speed = attr.speed;
  this.xspeed = attr.xspeed
  this.yspeed = attr.yspeed
  this.starting_xspeed = attr.starting_xspeed;
  this.starting_yspeed = attr.starting_yspeed;
  
  //collison
  this.height = attr.height;
  this.width = attr.width;

  //display
  this.img = new Image();
  this.img.src = "content/images/" + attr.image;
  this.img.style.filter = "alpha(opacity=75)"; 

  //defensive combat stats
  this.hp = attr.hp;
  this.starting_hp = attr.starting_hp

  //offensive combat stats
  this.melee_damage = attr.melee_damage;
}


var get_characters = function() {
// CHR is a character hash with key of character name and value a hash of attributes
// it is defined in (??characters.jsonp??)?

  var characters = new Object();

  characters['lab'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 96,
    "hp": 500,
    "starting_hp": 500,
    "image": "lab.png",
    "spawn_keys": [],
    "xspeed": 0,
    "yspeed": 0,
    "starting_xspeed": 0,
    "starting_yspeed": 0,
    "width": 96,
    "x": 55,
    "y": 450,
    "name" : 'lab',
  };

  characters['lair'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 96,
    "hp": 10000,
    "starting_hp": 10000,
    "image": "lair.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 0,
    "starting_xspeed": 0,
    "starting_yspeed": 0,
    "width": 96,
    "x": 900,
    "y": 450,
    "name" : 'lair',
  };

  characters['scientist'] = {
    "cooldown": 15,
    "cost": 5,
    "melee_damage": 3,
    "height": 24,
    "hp": 100,
    "starting_hp": 100,
    "image": "scientist.png",
    "spawn_keys": ['RIGHT'],
    "starting_xspeed": 2,
    "starting_yspeed": 0,
    "yspeed": 0,
    "xspeed": 2,
    "width": 24,
    "x": 50,
    "y": 475,
    "name" : 'scientist',
  };

  characters['flying_scientist'] = {
    "cooldown": 30,
    "cost": 7,
    "melee_damage": 5,
    "height": 24,
    "hp": 75,
    "starting_hp": 75,
    "image": "flying_scientist.png",
    "spawn_keys": ['UP'],
    "yspeed": 0,
    "xspeed": 4,
    "starting_xspeed": 4,
    "starting_yspeed": 0,
    "width": 24,
    "x": 50,
    "y": 475,
    "name" : 'flying_scientist',
  };

  characters['science_trooper'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 4,
    "height": 48,
    "hp": 200,
    "starting_hp": 200,
    "image": "science_trooper.png",
    "spawn_keys": ['DOWN'],
    "starting_xspeed": 1,
    "starting_yspeed": 0,
    "yspeed": 0,
    "xspeed": 1,
    "width": 48,
    "x": 50,
    "y": 475,
    "name" : 'science_trooper',
  };

  characters['giant_trooper'] = {
    "cooldown": 20,
    "cost": 100,
    "melee_damage": 7,
    "height": 96,
    "hp": 1250,
    "starting_hp": 1250,
    "image": "giant_trooper.png",
    "spawn_keys": ['LEFT'],
    "yspeed": 0,
    "xspeed": 0.4,
    "starting_xspeed": 0.4,
    "starting_yspeed": 0,
    "width": 96,
    "x": 50,
    "y": 475,
    "name" : 'giant_trooper',
  };

  characters['pylon'] = {
    "cooldown": 10,
    "cost": 10,
    "melee_damage": 1,
    "height": 24,
    "hp": 10,
    "starting_hp": 10,
    "image": "pylon.png",
    "spawn_keys": ['q'],
    "yspeed": 0,
    "xspeed": 0,
    "starting_xspeed": 0,
    "starting_yspeed": 0,
    "width": 24,
    "x": 50,
    "y": 475,
    "name" : 'pylon',
  };

  characters['grogon'] = {
    "cooldown": 1,
    "cost": 1000,
    "melee_damage": 25,
    "height": 126,
    "hp": 17500,
    "starting_hp": 17500,
    "image": "grogon.png",
    "spawn_keys": ['e'],
    "yspeed": 0,
    "xspeed": 2,
    "starting_xspeed": 2,
    "starting_yspeed": 0,
    "width": 96,
    "x": 50,
    "y": 475,
    "name" : 'grogon',
  };

  characters['rocket'] = {
    "cooldown": 1,
    "cost": 5,
    "melee_damage": 30,
    "height": 24,
    "hp": 5,
    "starting_hp": 5,
    "image": "rocket.png",
    "spawn_keys": ['SPACE'],
    "yspeed": 0,
    "xspeed": 15,
    "starting_xspeed": 15,
    "starting_yspeed": 0,
    "width": 24,
    "x": 50,
    "y": 475,
    "name" : 'rocket',
  };
 
  characters['evil_scientist'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 24,
    "hp": 100,
    "starting_hp": 100,
    "image": "evil_scientist.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 2,
    "starting_xspeed": 2,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 475,
    "name" : 'evil_scientist',
  };

  characters['bat'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 24,
    "hp": 100,
    "starting_hp": 100,
    "image": "bat.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 2,
    "starting_xspeed": 2,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 475,
    "name" : 'bat',
  };

  characters['werewolf'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 4,
    "height": 48,
    "hp": 200,
    "starting_hp": 200,
    "image": "werewolf.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 1,
    "starting_xspeed": 1,
    "starting_yspeed": 0,
    "width": 48,
    "x": 924,
    "y": 475,
    "name" : 'werewolf',
  };

  characters['vampire'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 4,
    "height": 48,
    "hp": 200,
    "starting_hp": 200,
    "image": "vampire.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 1,
    "starting_xspeed": 1,
    "starting_yspeed": 0,
    "width": 48,
    "x": 924,
    "y": 475,
    "name" : 'vampire',
  };

  characters['evil_giant_robot'] = {
    "cooldown": 10,
    "cost": 100,
    "melee_damage": 7,
    "height": 96,
    "hp": 1250,
    "starting_hp": 1250,
    "image": "evil_giant_robot.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 0.5,
    "starting_xspeed": 0.5,
    "starting_yspeed": 0,
    "width": 48,
    "x": 924,
    "y": 475,
    "name" : 'evil_giant_robot',
  };

  characters['evil_pylon'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 1,
    "height": 24,
    "hp": 10,
    "starting_hp": 10,
    "image": "pylon.png",
    "spawn_keys": [],
    "xspeed": 0,
    "yspeed": 0,
    "starting_xspeed": 0,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 475,
    "name" : 'evil_pylon',
  };

  characters['beast'] = {
    "cooldown": 1,
    "cost": 250,
    "melee_damage": 15,
    "height": 48,
    "hp": 700,
    "starting_hp": 700,
    "image": "beast.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 5,
    "starting_xspeed": 5,
    "starting_yspeed": 0,
    "width": 48,
    "x": 924,
    "y": 475,
    "name" : 'beast',
  };

  characters['mole'] = {
    "cooldown": 1,
    "cost": 250,
    "melee_damage": 15,
    "height": 48,
    "hp": 700,
    "starting_hp": 700,
    "image": "mole.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 5,
    "starting_xspeed": 5,
    "starting_yspeed": 0,
    "width": 48,
    "x": 924,
    "y": 475,
    "name" : 'mole',
  };

  characters['evil_grogon'] = {
    "cooldown": 100,
    "cost": 500,
    "melee_damage": 25,
    "height": 222,
    "hp": 1400,
    "starting_hp": 1400,
    "image": "evil_grogon.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 5,
    "starting_xspeed": 5,
    "starting_yspeed": 0,
    "width": 256,
    "x": 924,
    "y": 475,
    "name" : 'evil_grogon',
  };

  characters['evil_rocket'] = {
    "cooldown": 1,
    "cost": 5,
    "melee_damage": 30,
    "height": 24,
    "hp": 5,
    "starting_hp": 5,
    "image": "rocket.png",
    "spawn_keys": ['space'],
    "yspeed": 0,
    "xspeed": 15,
    "starting_xspeed": 15,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 475,
    "name" : 'evil_rocket',
  };

  characters['ghost'] = {
    "cooldown": 1,
    "cost": 300,
    "melee_damage": 0,
    "height": 24,
    "hp": 100,
    "starting_hp": 100,
    "image": "ghost.png",
    "spawn_keys": ['z'],
    "yspeed": 0,
    "xspeed": 12,
    "starting_xspeed": 12,
    "starting_yspeed": 0,
    "width": 24,
    "x": 50,
    "y": 475,
    "name" : 'ghost',
  };

  characters['repulsor'] = {
    "cooldown": 10,
    "cost": 20,
    "melee_damage": 0,
    "height": 24,
    "hp": 1,
    "starting_hp": 1,
    "image": "repulsor.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 12,
    "starting_xspeed": 12,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 475,
    "name" : 'repulsor',
  };

  characters['icbm'] = {
    "cooldown": 10,
    "cost": 200,
    "melee_damage": 100,
    "height": 48,
    "hp": 50,
    "starting_hp": 50,
    "image": "icbm.png",
    "spawn_keys": ['r'],
    "yspeed": -5.5,
    "xspeed": 8,
    "starting_xspeed": 8,
    "starting_yspeed": -5.5,
    "width": 48,
    "x": 50,
    "y": 475,
    "name" : 'icbm',
  };

  characters['alien'] = {
    "cooldown": 10,
    "cost": 100,
    "melee_damage": .1,
    "height": 24,
    "hp": 25,
    "starting_hp": 25,
    "image": "alien.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 1,
    "starting_xspeed": 1,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 460,
    "name" : 'alien',
  };

  characters['alien_rocket'] = {
    "cooldown": 10,
    "cost": 0,
    "melee_damage": 3,
    "height": 24,
    "hp": 8,
    "starting_hp": 8,
    "image": "alien_rocket.png",
    "spawn_keys": [],
    "yspeed": 0,
    "xspeed": 4,
    "starting_xspeed": 4,
    "starting_yspeed": 0,
    "width": 24,
    "x": 924,
    "y": 475,
    "name" : 'alien_rocket',
    "time_active": 0,
  };

  characters['defense_pylon'] = {
    "cooldown": 100,
    "cost": 500,
    "melee_damage": 15,
    "height": 24,
    "hp": 2000,
    "starting_hp": 2000,
    "image": "pylon.png",
    "spawn_keys": ['x'],
    "yspeed": 0,
    "xspeed": 0,
    "starting_xspeed": 0,
    "starting_yspeed": 0,
    "width": 24,
    "x": 200,
    "y": 475,
    "name" : 'defense_pylon',
    "time_active": 0,
  };

  characters['pylon_rocket'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 24,
    "hp": 8,
    "starting_hp": 8,
    "image": "alien_rocket.png",
    "spawn_keys": [],
    "yspeed": -1,
    "xspeed": 3,
    "starting_xspeed": 3,
    "starting_yspeed": -1,
    "width": 24,
    "x": 0,
    "y": 475,
    "name" : 'pylon_rocket',
    "time_active": 0,
  };

  characters['pogo_plane'] = {
    "cooldown": 20,
    "cost": 200,
    "melee_damage": 15,
    "height": 63,
    "hp": 300,
    "starting_hp": 300,
    "image": "pogo_plane.png",
    "spawn_keys": ['t'],
    "yspeed": 0,
    "xspeed": 2.5,
    "starting_xspeed": 2.5,
    "starting_yspeed": 0,
    "width": 64,
    "x": 50,
    "y": 300,
    "name" : 'pogo_plane',
    "time_active": 0,
  };

 characters['pogo_rocket'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 7,
    "height": 24,
    "hp": 24,
    "starting_hp": 8,
    "image": "alien_rocket.png",
    "spawn_keys": [],
    "yspeed": 1,
    "xspeed": 4,
    "starting_xspeed": 4,
    "starting_yspeed": 1,
    "width": 24,
    "x": 0,
    "y": 475,
    "name" : 'pogo_rocket',
    "time_active": 0,
  };

characters['energy_emily'] = {
    "cooldown": 0,
    "cost": 500,
    "melee_damage": 1,
    "height": 24,
    "hp": 500,
    "starting_hp": 500,
    "image": "energy_emily.png",
    "spawn_keys": ['1'],
    "yspeed": 0,
    "xspeed": .07,
    "starting_xspeed": .1,
    "starting_yspeed": 0,
    "width": 24,
    "x": 0,
    "y": 475,
    "name" : 'energy_emily',
    "time_active": 0,
  };

  return characters;
}

