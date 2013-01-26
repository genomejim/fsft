game_base.run = function () {
    game_base.update();
    game_base.draw();
    turn_count++;
    player_cooldown++;
    if (turn_count % 20 == 0 && science < 5000) {
      science = Math.round(science + 1);
      evil_science = Math.round(evil_science + 1);      
    }
    if (turn_count % 100 == 0 && lab.hp > 0 && evil_lab.hp >= 0){
      score = score - 1;
    }
}


game_base.update = function(event) {

//player unit spawning
  var scientist_cooldown = 30;
  var scientist_cost = 5;
  var scientist_hp = 100;
  var scientist_damage = 3;
  
  var flying_scientist_cooldown = 30;
  var flying_scientist_cost = 7;
  var flying_scientist_hp = 75;
  var flying_scientist_damage = 5;

  var armor_scientist_cooldown = 20;
  var armor_scientist_cost = 10;
  var armor_scientist_hp = 200;
  var armor_scientist_damage = 4;

  var giant_armor_scientist_cooldown = 10;
  var giant_armor_scientist_cost = 100;
  var giant_armor_scientist_hp = 1250;
  var giant_armor_scientist_damage = 7;

  var pylon_cooldown = 20;
  var pylon_cost = 10;
  var pylon_hp = 10;
  var pylon_damage = 1;

  var grogon_cooldown = 1;
  var grogon_cost = 1000;
  var grogon_hp = 17500;
  var grogon_damage = 25;

  var rocket_cooldown = 1;
  var rocket_cost = 5;
  var rocket_hp = 5;
  var rocket_damage = 30;


  if (pressed_right && player_cooldown > scientist_cooldown && science > scientist_cost -1){
    var chars_loc = new character_location(true,50,505,"lobby");
    var chars_appearance = new appearance(24,24,"./content/images/scientist_24.png","./content/images/scientist_24.png","labcoat");
    var chars_stats= new base_stats(2,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",scientist_hp,scientist_hp,1,25,25,25,1,200,false,3,scientist_damage);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - scientist_cost;
    active_chars_count++;
  }
  if (pressed_up && player_cooldown > flying_scientist_cooldown && science > flying_scientist_cost - 1){
    var chars_loc = new character_location(true,50,505,"lobby");
    var chars_appearance = new appearance(24,24,"./content/images/flying_scientist_24.png","./content/images/flying_scientist_24.png","labcoat");
    var chars_stats= new base_stats(4,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",flying_scientist_hp,flying_scientist_hp,1,25,25,25,1,200,false,3,flying_scientist_damage);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - flying_scientist_cost;
    active_chars_count++;
  }
  if (pressed_down && player_cooldown > armor_scientist_cooldown && science > armor_scientist_cost -1){
    var chars_loc = new character_location(true,50,505,"lobby");
    var chars_appearance = new appearance(24,24,"./content/images/armor_scientist_24.png","./content/images/armor_scientist_24.png","labcoat");
    var chars_stats= new base_stats(1,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",175,175,1,25,25,25,1,200,false,3,4);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - armor_scientist_cost;
    active_chars_count++;
  }
  if (pressed_left && player_cooldown > 20 && science > giant_armor_scientist_cost - 1){
    var chars_loc = new character_location(true,50,505,"lobby");
    var chars_appearance = new appearance(96,96,"./content/images/armor_scientist.png","./content/images/armor_scientist.png","labcoat");
    var chars_stats= new base_stats(.2,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",1250,1250,1,25,25,25,1,200,false,3,7);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - giant_armor_scientist_cost;
    active_chars_count++;
  }

  if (pressed_q && player_cooldown > pylon_cooldown && science > pylon_cost -1 && active_chars_count < 50){
    var chars_loc = new character_location(true,100,505,"lobby");
    var chars_appearance = new appearance(24,24,"./content/images/pylon.png","./content/images/pylon.png","labcoat");
    var chars_stats= new base_stats(0,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",pylon_hp,pylon_hp,1,25,25,25,1,200,false,3,pylon_damage);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - pylon_cost;
    active_chars_count++;
  }

  if (pressed_e && player_cooldown > grogon_cooldown && science > grogon_cost -1){
    var chars_loc = new character_location(true,100,505,"lobby");
    var chars_appearance = new appearance(256,256,"./content/images/grogon.png","./content/images/grogon.png","labcoat");
    var chars_stats= new base_stats(1,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",grogon_hp,grogon_hp,1,25,25,25,1,200,false,3,grogon_damage);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - grogon_cost;
    active_chars_count++;
    grogon_text=500;
    
  }

if (pressed_space && player_cooldown > rocket_cooldown && science > rocket_cost -1){
    var chars_loc = new character_location(true,100,505,"lobby");
    var chars_appearance = new appearance(24,24,"./content/images/rocket.png","./content/images/rocket.png","labcoat");
    var chars_stats= new base_stats(20,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",rocket_hp,rocket_hp,1,25,25,25,1,200,false,3,rocket_damage);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    science = science - rocket_cost;
    active_chars_count++;
  }


//enemy unit spawning

if (evil_lab.hp > 0) {
  if (turn_count % 30 == 0 && npcs_count < 10000){
    if (Math.random() * evil_science > 85 && active_npcs_count < 20){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(24,24,"./content/images/evil_scientist_24.png","./content/images/evil_scientist_24.png","labcoat");
    var npcs_stats= new base_stats(Math.random() * 2,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science -5;
    npcs_count++;
    active_npcs_count++;    
    }
  }
  if (turn_count % 35 == 0 && npcs_count < 10000){
    if (Math.random() * evil_science > 90 && active_npcs_count < 40){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(24,24,"./content/images/evil_armor_scientist_24.png","./content/images/evil_armor_scientist_24.png","labcoat");
    var npcs_stats= new base_stats(Math.random() * 2,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science -10;
    npcs_count++;    
    active_npcs_count++;
    }
  }
  if (turn_count % 50 == 0 && npcs_count < 10000 && active_npcs_count < 52){
    if (Math.random() * evil_science > 150){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(96,96,"./content/images/evil_armor_scientist.png","./content/images/evil_armor_scientist.png","labcoat");
    var npcs_stats= new base_stats(Math.random() * .5,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",1250,1250,1,25,25,25,1,200,false,3,7);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science -100;
    npcs_count++;    
    active_npcs_count++;
    }
  }

  if (turn_count % 40 == 0 && npcs_count < 10000){
    if (Math.random() * evil_science > 80 && active_npcs_count < 50){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(24,24,"./content/images/pylon.png","./content/images/pylon.png","labcoat");
    var npcs_stats= new base_stats(0,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",10,10,1,25,25,25,1,200,false,3,1);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science - 10;
    npcs_count++;    
    active_npcs_count++;
    }
  }

if (turn_count % 10 == 0 && npcs_count < 10000){
    if (Math.random() * evil_science > 999){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(256,256,"./content/images/evil_grogon.png","./content/images/evil_grogon.png","labcoat");
    var npcs_stats= new base_stats(1,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",17500,17500,1,25,25,25,1,200,false,3,25);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science - grogon_cost;
    npcs_count++;    
    active_npcs_count++;
    }
  }

if (turn_count % 60 == 0 && npcs_count < 10000){
    if (Math.random() * evil_science > 174 && active_npcs_count < 57){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(48,48,"./content/images/evil_beast.png","./content/images/evil_beast.png","labcoat");
    var npcs_stats= new base_stats(2,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",700,700,1,25,25,25,1,200,false,3,15);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science - 175;
    npcs_count++;    
    active_npcs_count++;
    }
  }


if (turn_count % 100 == 0 && npcs_count < 10000){
    if (Math.random()  > .5){
    
    var npcs_loc = new character_location(true,1024,505,"lobby");
    var npcs_appearance = new appearance(24,24,"./content/images/rocket.png","./content/images/rocket.png","labcoat");
    var npcs_stats= new base_stats(5,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",rocket_hp * 2,rocket_hp * 2,1,25,25,25,1,200,false,3,rocket_damage * 2);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    evil_science = evil_science - rocket_cost;
    npcs_count++;    
    active_npcs_count++;
    }
  }

}

//unit movement

  for (var i in npcs) {
    if (i != 0){
      npcs[i].x = npcs[i].x - npcs[i].speed - Math.random() + Math.random();
      npcs[i].y = npcs[i].y - Math.random() + Math.random();
   
    }
  }
  for (var j in chars) {
    if (j != 0){
      chars[j].x = chars[j].x + chars[j].speed - Math.random() + Math.random();
      chars[j].y = chars[j].y - Math.random() + Math.random();
      
    }
  }  

//melee combat detection
  for (var i in npcs) {
    for (var j in chars) {
      if (Math.abs(chars[j].x - npcs[i].x) < 50 && Math.abs(chars[j].y - npcs[i].y) < 50)  {                
        //npc deals melee damage to character

        //add collision to collisions
        var coll = new collision(chars[j].x,chars[j].y,2,npcs[i].melee_damage);
        var coll1 = new collision(npcs[i].x,npcs[i].y,2,chars[j].melee_damage);        
        collisions[collision_count++] = coll;
        collisions[collision_count++] = coll1;

        chars[j].hp = chars[j].hp - npcs[i].melee_damage;
                
        //character deals melee damage to npc
        npcs[i].hp = npcs[i].hp - chars[j].melee_damage;

        if (npcs[i].hp <= 0) {
          delete npcs[i];
          score++;
          active_npcs_count--;
        }
        if (chars[j].hp <= 0) {
          delete chars[j];
          score--;
          active_chars_count--;
        }
      }               
    }
  }
  if (turn_count % 250 == 0) {
    science = science + active_chars_count * 1.5 + 10;
    evil_science = evil_science + active_npcs_count * 1.5 + 10;
  }
}

game_base.draw = function() {
        
  //clear the canvas and the buffer for the next frame
  _canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
  _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);

  //draw active scene        
  _canvasBufferContext.drawImage(scenes.moon.img, 0, 0);              

//draw HUD
        _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
        _canvasBufferContext.fillRect(0, 0 , 1097, 25);
        _canvasBufferContext.fillRect(0, 670 , 1097, 25); 
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.9)';
        _canvasBufferContext.fillText('score = ', 10, 5);
	_canvasBufferContext.fillText(score + lab.hp, 70, 5);        
        _canvasBufferContext.fillText('science = ', 200, 5);
        _canvasBufferContext.fillText(science, 270, 5);
        _canvasBufferContext.fillText('lab = ', 400, 5);
	_canvasBufferContext.fillText(lab.hp, 470, 5);
        _canvasBufferContext.fillText('lair = ', 600, 5);
	_canvasBufferContext.fillText(evil_lab.hp, 670, 5);
        _canvasBufferContext.fillText('superstition = ', 770, 5);
	_canvasBufferContext.fillText(evil_science, 880, 5);
        _canvasBufferContext.fillText('v 0.1.2', 960, 5);
        _canvasBufferContext.fillStyle    = 'rgba(100, 100, 100, 0.5)';
        _canvasBufferContext.fillText("w = flying scientist 7", 10, 25);
        _canvasBufferContext.fillText("a = giant scientist 100",10, 40);
        _canvasBufferContext.fillText("d = scientist 5", 10, 55);
        _canvasBufferContext.fillText("s = armor scientist 10", 10, 70);
        _canvasBufferContext.fillText("q = pylon 7", 10, 85);
        _canvasBufferContext.fillText("e = grogon 1000", 10, 100);
        _canvasBufferContext.fillText("space = rocket 5", 10, 115);
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.9)';
        _canvasBufferContext.fillText('active units = ', 10, 675);
	_canvasBufferContext.fillText(active_chars_count, 100, 675);
        _canvasBufferContext.fillText('active evil units = ', 850, 675);
	_canvasBufferContext.fillText(active_npcs_count, 960, 675);

  if (evil_lab.hp <= 0) {
    _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
    _canvasBufferContext.font="30px";
    _canvasBufferContext.fillText("SCIENCE PREVAILS!", 375, 375);
    _canvasBufferContext.font="15px";
    
  }
  if (turn_count < 500) {
    _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
    _canvasBufferContext.font="30px sans-serif";
    _canvasBufferContext.fillText("SCIENCE MUST PREVAIL!", 375, 375);
    _canvasBufferContext.font="15px sans-serif";  
  }
  if (grogon_text > 0){
    _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
    _canvasBufferContext.font="30px";
    _canvasBufferContext.fillText("GIVE US A SAMPLING OF YOUR POWER", 200, 375);
    _canvasBufferContext.font="15px";
    grogon_text--;
  }
        
//draw active npcs and collisions

  for (var i in npcs) {
    _canvasBufferContext.drawImage(npcs[i].img, npcs[i].x - npcs[i].width / 2, npcs[i].y - npcs[i].height / 2);
  }   
	
  for (var j in chars) {
    _canvasBufferContext.drawImage(chars[j].img, chars[j].x - chars[j].width / 2 , chars[j].y - chars[j].height / 2);
  }
 

  //if (turn_count % 20 == 0) {
  for (var k in collisions) {
    if (collisions[k].display_time > 0) {
      _canvasBufferContext.strokeStyle = 'rgba(200, 0, 0, 0.25)';
      _canvasBufferContext.lineWidth   = 5;
      _canvasBufferContext.beginPath();
      _canvasBufferContext.arc(collisions[k].x,collisions[k].y,collisions[k].radius,0,2*Math.PI);
      _canvasBufferContext.stroke();
      _canvasBufferContext.closePath();
      collisions[k].radius = collisions[k].radius + 4;
      collisions[k].display_time--;
    } else {
        delete collisions[k];
    }
    }
  //}	
  _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}


game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);