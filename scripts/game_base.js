game_base.run = function () {
    game_base.update();
    game_base.draw();
}


game_base.update = function(event) {

//player unit spawning

  
//unit params (x,y,speed,height,width,image_src,hp,melee_damage)
// spawn scientist
  if (pressed_right && player_cooldown > scientist_cooldown && science > scientist_cost -1){
    var char = new unit (50,505,scientist_speed,24,24,"./content/images/scientist.png",scientist_hp,scientist_damage);
    add_unit(char);     
    science = science - scientist_cost;
  }

// spawn flying scientist
  if (pressed_up && player_cooldown > flying_scientist_cooldown && science > flying_scientist_cost - 1){
    var char = new unit (50,505,flying_scientist_speed,24,24,"./content/images/flying_scientist.png",flying_scientist_hp,flying_scientist_damage);
    add_unit(char);    
    science = science - flying_scientist_cost;    
  }

// spawn sciene_trooper
  if (pressed_down && player_cooldown > science_trooper_cooldown && science > science_trooper_cost -1){
    var char = new unit (50,505,science_trooper_speed,48,48,"./content/images/science_trooper.png",science_trooper_hp,science_trooper_damage);
    add_unit(char);
    science = science - science_trooper_cost;    
  }

// spawn giant_trooper
  if (pressed_left && player_cooldown > giant_trooper_cooldown && science > giant_trooper_cost - 1){
    var char = new unit (50,505,giant_trooper_speed,96,96,"./content/images/giant_trooper.png",giant_trooper_hp,giant_trooper_damage);
    add_unit(char);
    science = science - giant_trooper_cost;
   }

//spawn pylon
  if (pressed_q && player_cooldown > pylon_cooldown && science > pylon_cost -1 && active_chars_count < 50){
    var char = new unit (50,505,pylon_speed,24,24,"./content/images/pylon.png",pylon_hp,pylon_damage);
    add_unit(char);
    science = science - pylon_cost;
  }

//spawn grogon
  if (pressed_e && player_cooldown > grogon_cooldown && science > grogon_cost -1){
    var char = new unit (50,505,grogon_speed,256,256,"./content/images/grogon.png",grogon_hp,grogon_damage);
    add_unit(char);
    science = science - grogon_cost;
    grogon_text=500;    
  }

//spawn rocket
if (pressed_space && player_cooldown > rocket_cooldown && science > rocket_cost -1){
    var char = new unit (50,505,rocket_speed,24,24,"./content/images/rocket.png",rocket_hp,rocket_damage);
    add_unit(char);
    science = science - rocket_cost;
  }


//enemy unit spawning

if (lair.hp > 0) {
  if (turn_count % 30 == 0 && active_npcs_count < 20){
    //spawn evil scientist
    if (Math.random() > .5){
      if (Math.random() * superstition > 85){    
        var npc = new unit (1024,505,Math.random() * scientist_speed,24,24,"./content/images/evil_scientist.png",scientist_hp,scientist_damage);
        add_enemy_unit(npc);
        superstition = superstition - scientist_cost;
      }
    } else {        
      if (Math.random() * superstition > 85) {
      //spawn bat
        var npc = new unit (1024,505,Math.random() * scientist_speed,24,24,"./content/images/bat.png",scientist_hp,scientist_damage);
        add_enemy_unit(npc);
        superstition = superstition - scientist_cost;
      }
    }
  }
  

  if (turn_count % 35 == 0  && active_npcs_count < 40){
    //spawn werewolf 
    if (Math.random() * superstition > 90){
      var npc = new unit (1024,505,Math.random() * werewolf_speed,48,48,"./content/images/werewolf.png",werewolf_hp,werewolf_damage);
      add_enemy_unit(npc);
      superstition = superstition - werewolf_cost;
    } else if (Math.random() * superstition > 85) {
      var npc = new unit (1024,505,Math.random() * werewolf_speed,48,48,"./content/images/vampire.png",werewolf_hp,werewolf_damage);
      add_enemy_unit(npc);
      superstition = superstition - werewolf_cost;
    }
  }
  if (turn_count % 50 == 0 && active_npcs_count < 52){
    //spawn giant trooper
    if (Math.random() * superstition > 150){
      var npc = new unit (1024,505,giant_trooper_speed,96,48,"./content/images/evil_giant_robot.png",giant_trooper_hp,giant_trooper_damage);
      add_enemy_unit(npc);
      superstition = superstition - giant_trooper_cost;        
    }
  }

  if (turn_count % 40 == 0 && active_npcs_count < 50){
    //spawn evil pylon
    if (Math.random() * superstition > 80 ){
      var npc = new unit (1024,505,pylon_speed,24,24,"./content/images/pylon.png",pylon_hp,pylon_damage);
      add_enemy_unit(npc);
      superstition = superstition - pylon_cost;        
    }
  }

if (turn_count % 10 == 0  ){
    //spawn evil grogon
    if (Math.random() * superstition > 999){
      var npc = new unit (1024,505,grogon_speed,256,256,"./content/images/evil_grogon.png",grogon_hp,grogon_damage);
      add_enemy_unit(npc);
      superstition = superstition - grogon_cost;        
    }
  }

if (turn_count % 60 == 0 && npcs_count < 10000){
    //spawn evil beast
  if (Math.random() > .5){
    if (Math.random() * superstition > beast_cost - 1  && active_npcs_count < 57){   
      var npc = new unit (1024,505,beast_speed,48,48,"./content/images/beast.png",beast_hp,beast_damage);
      add_enemy_unit(npc);
      superstition = superstition - beast_cost;        
    }
  } else { 
    if (Math.random() * superstition > beast_cost - 1  && active_npcs_count < 57){   
      var npc = new unit (1024,505,beast_speed,48,48,"./content/images/mole.png",beast_hp,beast_damage);
      add_enemy_unit(npc);
      superstition = superstition - beast_cost;        
    }
  }
  }


if (turn_count % 100 == 0 && npcs_count < 10000){
    // spawn enemy rocket
    if (Math.random()  > .75){
      var npc = new unit (1024,505,rocket_speed,24,24,"./content/images/rocket.png",rocket_hp,rocket_damage);
      add_enemy_unit(npc);
      superstition = superstition - rocket_cost;        
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
    superstition = superstition + active_npcs_count * 1.5 + 10;
  }
    turn_count++;
    player_cooldown++;
    if (turn_count % 20 == 0 && science < 5000) {
      science = Math.round(science + 1);
      superstition = Math.round(superstition + 1);      
    }
    if (turn_count % 100 == 0 && lab.hp > 0 && lair.hp >= 0){
      score = score - 1;
    }
}

game_base.draw = function() {
        
  //clear the canvas and the buffer for the next frame
  _canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
  _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);

  //draw background image       
  _canvasBufferContext.drawImage(back, 0, 0);              

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
	_canvasBufferContext.fillText(lair.hp, 670, 5);
        _canvasBufferContext.fillText('superstition = ', 770, 5);
	_canvasBufferContext.fillText(superstition, 880, 5);
        _canvasBufferContext.fillText('v 0.2.0', 960, 5);
        _canvasBufferContext.fillStyle    = 'rgba(100, 100, 100, 0.5)';
        _canvasBufferContext.fillText("w = flying scientist 7", 10, 25);
        _canvasBufferContext.fillText("a = giant trooper 100",10, 40);
        _canvasBufferContext.fillText("d = scientist 5", 10, 55);
        _canvasBufferContext.fillText("s = science trooper 10", 10, 70);
        _canvasBufferContext.fillText("q = pylon 7", 10, 85);
        _canvasBufferContext.fillText("e = grogon 1000", 10, 100);
        _canvasBufferContext.fillText("space = rocket 5", 10, 115);
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.9)';
        _canvasBufferContext.fillText('Science Force = ', 10, 675);
	_canvasBufferContext.fillText(active_chars_count, 140, 675);
        _canvasBufferContext.fillText('Agents of Superstition = ', 850, 675);
	_canvasBufferContext.fillText(active_npcs_count, 1040, 675);

  if (lair.hp <= 0) {
    _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
    _canvasBufferContext.font="bold 30px sans-serif";
    _canvasBufferContext.fillText("SCIENCE PREVAILS!", 375, 375);
    _canvasBufferContext.font="bold 15px sans-serif";
    
  }
  if (turn_count < 500) {
    _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
    _canvasBufferContext.font="30px sans-serif";
    _canvasBufferContext.fillText("SCIENCE MUST PREVAIL!", 375, 375);
    _canvasBufferContext.font="bold 15px sans-serif";  
  }
  if (grogon_text > 0){
    _canvasBufferContext.fillStyle = 'rgba(0, 500, 0, 0.5)';
    _canvasBufferContext.font="bold 30px sans-serif";
    _canvasBufferContext.fillText("GIVE US A SAMPLING OF YOUR POWER", 200, 375);
    _canvasBufferContext.font="bold 15px sans-serif";
    grogon_text--;
  }
        
//draw active npcs and collisions

  for (var i in npcs) {
    _canvasBufferContext.drawImage(npcs[i].img, npcs[i].x - npcs[i].width / 2, npcs[i].y - npcs[i].height / 2);
  }   

  for (var j in chars) {
    _canvasBufferContext.drawImage(chars[j].img, chars[j].x - chars[j].width / 2 , chars[j].y - chars[j].height / 2);
  }
 

  //if (turn_count % 30 == 0) {
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
  	
  _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}


game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);

add_unit = function (char){
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
    active_chars_count++;
}

add_enemy_unit = function(npc){
    npcs[npcs_count] = npc;
    npcs_count++;
    active_npcs_count++;
}    