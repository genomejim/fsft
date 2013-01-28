unit = function(character_name) {

  var attr = CHR[character_name];

  //bookkeeping
  this.name = attr.name
  this.cost = attr.cost;
  this.cooldown = attr.cooldown;

  //location
  this.x = attr.x;
  this.y = attr.y;
  this.speed = attr.speed;
    
  //collison
  this.height = attr.height;
  this.width = attr.width;

  //display
  this.img = new Image();
  this.img.src = "content/images/" + attr.image; 

  //defensive combat stats
  this.hp = attr.hp;

  //offensive combat stats
  this.melee_damage = attr.melee_damage;
}


var get_characters = function() {
// CHR is a character hash with key of character name nad value a hash of attributes
// it is defined in characters.jsonp

  var characters = new Object();

  characters['lab'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 96,
    "hp": 500,
    "image": "lab.png",
    "spawn_keys": [],
    "speed": 0,
    "width": 96,
    "x": 55,
    "y": 505,
  };

  characters['lair'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 96,
    "hp": 10000,
    "image": "lair.png",
    "spawn_keys": [],
    "speed": 0,
    "width": 96,
    "x": 1000,
    "y": 505,
  };

  characters['scientist'] = {
    "cooldown": 30,
    "cost": 5,
    "melee_damage": 3,
    "height": 24,
    "hp": 100,
    "image": "scientist.png",
    "spawn_keys": ['RIGHT'],
    "speed": 2,
    "width": 24,
    "x": 50,
    "y": 505,
  };

  characters['flying_scientist'] = {
    "cooldown": 30,
    "cost": 7,
    "melee_damage": 5,
    "height": 24,
    "hp": 75,
    "image": "flying_scientist.png",
    "spawn_keys": ['UP'],
    "speed": 4,
    "width": 24,
    "x": 50,
    "y": 505,
  };

  characters['science_trooper'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 4,
    "height": 48,
    "hp": 200,
    "image": "science_trooper.png",
    "spawn_keys": ['DOWN'],
    "speed": 1,
    "width": 48,
    "x": 50,
    "y": 505,
  };

  characters['giant_trooper'] = {
    "cooldown": 10,
    "cost": 100,
    "melee_damage": 7,
    "height": 96,
    "hp": 1250,
    "image": "giant_trooper.png",
    "spawn_keys": ['LEFT'],
    "speed": 0.2,
    "width": 96,
    "x": 50,
    "y": 505,
  };

  characters['pylon'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 1,
    "height": 24,
    "hp": 10,
    "image": "pylon.png",
    "spawn_keys": ['q'],
    "speed": 0,
    "width": 24,
    "x": 50,
    "y": 505,
  };

  characters['grogon'] = {
    "cooldown": 1,
    "cost": 1000,
    "melee_damage": 25,
    "height": 126,
    "hp": 17500,
    "image": "grogon.png",
    "spawn_keys": ['e'],
    "speed": 2,
    "width": 96,
    "x": 50,
    "y": 505,
  };

  characters['rocket'] = {
    "cooldown": 1,
    "cost": 5,
    "melee_damage": 30,
    "height": 24,
    "hp": 5,
    "image": "rocket.png",
    "spawn_keys": ['SPACE'],
    "speed": 15,
    "width": 24,
    "x": 50,
    "y": 505,
  };
 
  characters['evil_scientist'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 24,
    "hp": 100,
    "image": "evil_scientist.png",
    "spawn_keys": [],
    "speed": Math.random() * 2,
    "width": 24,
    "x": 1024,
    "y": 505,
  };

  characters['bat'] = {
    "cooldown": 0,
    "cost": 0,
    "melee_damage": 3,
    "height": 24,
    "hp": 100,
    "image": "bat.png",
    "spawn_keys": [],
    "speed": Math.random() * 2,
    "width": 24,
    "x": 1024,
    "y": 505,
  };

  characters['werewolf'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 4,
    "height": 48,
    "hp": 200,
    "image": "werewolf.png",
    "spawn_keys": [],
    "speed": Math.random() * 1,
    "width": 48,
    "x": 1024,
    "y": 505,
  };

  characters['vampire'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 4,
    "height": 48,
    "hp": 200,
    "image": "vampire.png",
    "spawn_keys": [],
    "speed": Math.random() * 1,
    "width": 48,
    "x": 1024,
    "y": 505,
  };

  characters['evil_giant_robot'] = {
    "cooldown": 10,
    "cost": 100,
    "melee_damage": 7,
    "height": 96,
    "hp": 1250,
    "image": "evil_giant_robot.png",
    "spawn_keys": [],
    "speed": Math.random() * 0.2,
    "width": 48,
    "x": 1024,
    "y": 505,
  };

  characters['evil_pylon'] = {
    "cooldown": 20,
    "cost": 10,
    "melee_damage": 1,
    "height": 24,
    "hp": 10,
    "image": "pylon.png",
    "spawn_keys": [],
    "speed": 0,
    "width": 24,
    "x": 1024,
    "y": 505,
  };

  characters['beast'] = {
    "cooldown": 1,
    "cost": 250,
    "melee_damage": 15,
    "height": 48,
    "hp": 700,
    "image": "beast.png",
    "spawn_keys": [],
    "speed": Math.random() * 5,
    "width": 48,
    "x": 1024,
    "y": 505,
  };

  characters['mole'] = {
    "cooldown": 1,
    "cost": 250,
    "melee_damage": 15,
    "height": 48,
    "hp": 700,
    "image": "mole.png",
    "spawn_keys": [],
    "speed": Math.random() * 5,
    "width": 48,
    "x": 1024,
    "y": 505,
  };

  characters['evil_rocket'] = {
    "cooldown": 1,
    "cost": 5,
    "melee_damage": 30,
    "height": 24,
    "hp": 5,
    "image": "rocket.png",
    "spawn_keys": ['space'],
    "speed": 15,
    "width": 24,
    "x": 1024,
    "y": 505,
  };
 

  return characters;
}

