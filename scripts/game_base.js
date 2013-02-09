game_base.run = function () {
    game_base.update();
    game_base.draw();
}

game_base.update = function(event) {

  player_unit_spawning(event);
  enemy_unit_spawning();
  unit_movement();
  melee_combat_detection();
}


player_unit_spawning = function(event) {

  if (KEYPRESSED != '') {
    if (KEYPRESSED == 80) {
	window.alert("Ken, it's paused!");
    }
    for (var i in SPAWN[KEYPRESSED]) {
      var character_name = SPAWN[KEYPRESSED][i];
      add_unit(character_name);
    }
    KEYPRESSED = '';
  }
}

enemy_unit_spawning = function() {

   if (active_level == 1){
     level1();
   }
   else if (active_level == 2) {
     level2();
   }
   else if (active_level == 3) {
     level3();
   }
   else if (active_level == 4) {
     level4();
   }
   else if (active_level == 5) {
     level5();
   }
}


unit_movement = function() {

//set button opacity based on cooldown
  rect1.setOpacity(player_cooldown/15); //scientist
  rect2.setOpacity(player_cooldown/20); //trooper
  rect3.setOpacity(player_cooldown/10); //pylon
  rect4.setOpacity(player_cooldown/15); //giant trooper
  rect5.setOpacity(player_cooldown/15); //grogon
  rect6.setOpacity(player_cooldown/15); //rocket
  rect7.setOpacity(player_cooldown/15); //scientist
  //rect8.setOpacity(player_cooldown/15); //scientist
//set button color based on available science
  if (science < 5) {
    rect1.setFill('gray'); //scientist
    rect1.setOpacity(.3);
  } else {
    rect1.setFill('green'); //scientist
  }
  if (science < 10) {
    rect2.setFill('gray'); //trooper
    rect2.setOpacity(.3);
  } else {
    rect2.setFill('green'); //trooper
  }
  if (science < 10) {
    rect3.setFill('gray'); //pylon
    rect3.setOpacity(.3);
  } else {
    rect3.setFill('green'); //pylon
  }
  if (science < 100) {
    rect4.setFill('gray'); //giant trooper
    rect4.setOpacity(.3);
  } else {
    rect4.setFill('green'); //giant trooper
  }
  if (science < 1000) {
    rect5.setFill('gray'); //grogon
    rect5.setOpacity(.3);
  } else {
    rect5.setFill('green'); //grogon
  }
  if (science < 5) {
    rect6.setFill('gray'); //rocket
    rect6.setOpacity(.3);
  } else {
    rect6.setFill('green'); //rocket
  }
  if (science < 300) {
    rect7.setFill('gray'); //ghost
    rect7.setOpacity(.3);
  } else {
    rect7.setFill('green'); //ghost
  }
  button_layer.draw();

for (var i in npcs) {
  if (i != 0){
    if (npcs[i].name == 'alien_rocket'){
      npcs[i].x = npcs[i].x - npcs[i].xspeed;
      npcs[i].y = npcs[i].y - npcs[i].yspeed;
      npcs[i].time_active++;
      npcs[i].yspeed = npcs[i].yspeed - .03;
      if (npcs[i].time_active > 200) {
        delete npcs[i];
        //active_npcs_count--;
      }
      if (npcs[i].yspeed > 5) {
        npcs[i].yspeed = npcs[i].yspeed + 3 * npcs[i].yspeed;
      }else if (npcs[i].yspeed < -5) {
        npcs[i].yspeed = npcs[i].yspeed - 3 * npcs[i].yspeed;
      }
    } else {
      npcs[i].x = npcs[i].x - npcs[i].xspeed - Math.random() + Math.random();
      npcs[i].y = npcs[i].y + npcs[i].yspeed - Math.random() + Math.random();
      if (npcs[i].name == "alien" && (turn_count % 9 == 0 || turn_count % 11 == 0)){
        add_enemy_unit('alien_rocket',npcs[i].x,npcs[i].y);
      }              
    }
  }
}

for (var j in chars) {
  if (j != 0){
    if (chars[j].name == 'pylon_rocket'){
      chars[j].x = chars[j].x + chars[j].xspeed;
      chars[j].y = chars[j].y - chars[j].yspeed;
      chars[j].time_active++;
      chars[j].yspeed = chars[j].yspeed - .02;
      if (chars[j].time_active > 200) {
        delete chars[j];
        //active_npcs_count--;
      }
    }
    if (chars[j].name == 'icbm') {
      chars[j].x = chars[j].x + chars[j].xspeed;
      chars[j].y = chars[j].y + chars[j].yspeed;
      chars[j].yspeed = chars[j].yspeed + .1;
      
    }else if (chars[j].name == 'pylon' || chars[j].name == 'defense_pylon') {
       //pylons don't move, they are pylons
       if (chars[j].name == "defense_pylon" && turn_count % 2 == 0){
         add_unit('pylon_rocket',chars[j].x,chars[j].y);
        }  
    }
    else {
      chars[j].x = chars[j].x + chars[j].xspeed - Math.random() + Math.random();
      chars[j].y = chars[j].y - Math.random() + Math.random();
                  
    }
  }
}
}

function melee_combat_detection() {

//melee combat detection
  for (var i in npcs) {
    for (var j in chars) {
      
        if (!npcs[i] || !chars[j]) {
          continue; // avoid deleted elements
        }
         

      if (Math.abs(chars[j].x - npcs[i].x) < 50 && Math.abs(chars[j].y - npcs[i].y) < 50)  {                
        //npc deals melee damage to character

        //add collision to collisions
        var coll = new collision(chars[j].x,chars[j].y,2,npcs[i].melee_damage);
        var coll1 = new collision(npcs[i].x,npcs[i].y,2,chars[j].melee_damage);        
        collisions[collision_count++] = coll;
        collisions[collision_count++] = coll1;
        
        if (npcs[i].name == 'repulsor'){
          //attack player speed
          chars[j].xspeed = ( -Math.random() * 0.1 );
          chars[j].yspeed = ( -Math.random() * 0.1 );
        } else {
          chars[j].hp = chars[j].hp - npcs[i].melee_damage;
        }        
        //character deals melee damage to npc
        if (chars[j].name == 'ghost'){
        //attack enemy speed and damage
          npcs[i].xspeed = 0;
          if ( i != 0) {
            npcs[i].melee_damage = npcs[i].melee_damage - 7;
          }
	}
        else {
          npcs[i].hp = npcs[i].hp - chars[j].melee_damage;
        }
        if (npcs[i].hp <= 0) {
          if (i != 0) {
            if (npcs[i].name == 'alien_rocket'){
              active_npcs_count++;
            }
            delete npcs[i];
            active_npcs_count--;
            score++;
            
          }
        }
        if (chars[j].hp <= 0) {
          if (chars[j].name == 'lab'){
            window.alert("Sadly, Science has been defeated by Superstition");
          }
          if (chars[j].name == 'pylon_rocket'){
          } else {
            active_chars_count--;
            score--;
          }
          delete chars[j];
          
          
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
        _canvasBufferContext.fillRect(0, 513 , 1097, 25); 
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.9)';
        _canvasBufferContext.fillText('score = ', 10, 5);
	_canvasBufferContext.fillText(score, 70, 5);        
        _canvasBufferContext.fillText('science = ', 200, 5);
        _canvasBufferContext.fillText(science, 270, 5);
        _canvasBufferContext.fillText('lab = ', 400, 5);
	_canvasBufferContext.fillText(Math.round(chars[0].hp), 470, 5);
        _canvasBufferContext.fillText('lair = ', 600, 5);
	_canvasBufferContext.fillText(lair.hp, 670, 5);
        _canvasBufferContext.fillText('superstition = ', 770, 5);
	_canvasBufferContext.fillText(superstition, 880, 5);
        _canvasBufferContext.fillText('v 0.4.0', 960, 5);
        _canvasBufferContext.fillStyle    = 'rgba(100, 100, 100, 0.5)';
        _canvasBufferContext.fillText("w = flying scientist 7", 10, 25);
        _canvasBufferContext.fillText("a = giant trooper 100",10, 40);
        _canvasBufferContext.fillText("d = scientist 5", 10, 55);
        _canvasBufferContext.fillText("s = science trooper 10", 10, 70);
        _canvasBufferContext.fillText("q = pylon 7", 10, 85);
        _canvasBufferContext.fillText("e = grogon 1000", 10, 100);
        _canvasBufferContext.fillText("space = rocket 5", 10, 115);
        _canvasBufferContext.fillText("z = ghost 300", 10, 130);
        _canvasBufferContext.fillText("r = icbm 200", 10, 145);
        _canvasBufferContext.fillText("x = defense pylon 500", 10, 160);
        _canvasBufferContext.fillText("p = pause", 10, 175);
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.9)';
        _canvasBufferContext.fillText('Science Force = ', 10, 520);
	_canvasBufferContext.fillText(active_chars_count, 140, 520);
        _canvasBufferContext.fillText('Level', 400, 520);
	_canvasBufferContext.fillText(active_level, 450, 520);
	_canvasBufferContext.fillText(level_display_name, 475, 520);

        _canvasBufferContext.fillText('Agents of Superstition = ', 800, 520);
	_canvasBufferContext.fillText(active_npcs_count, 1000, 520);

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

add_unit = function (char_name,x,y) {

  var char = new unit(char_name);
  if (science < char.cost || player_cooldown < char.cooldown) {
    return 0;
  }
  if (active_chars_count >= 75 && char_name == "pylon") {
    return 0;
  }
  chars[chars_count] = char;
  if (chars[chars_count].name == 'pylon'){
    chars[chars_count].x = pylon_spawn_x;
    pylon_spawn_x = pylon_spawn_x + 2;
    if (pylon_spawn_x > 105){
      pylon_spawn_x = 26;
    }
  } 
  if (chars[chars_count].name == 'pylon_rocket'){
    chars[chars_count].x = x;
    chars[chars_count].y = y;
    chars[chars_count].yspeed = 2 * Math.random();
    chars[chars_count].xspeed = 3;
    chars[chars_count].time_active = 0;    
  }  else {
    active_chars_count++;     
    player_cooldown = 0;
    //display cooldown by changing button opacity - moved to game loop
    //rect1.setOpacity(.1);
    //rect1.setFill('red');
    //button_layer.draw();
  }
  chars_count++;    
  science = science - char.cost;
  return 1;
}

add_enemy_unit = function(npc_name,x,y){

  var npc = new unit(npc_name);
  if (superstition < npc.cost) {
    return 0;
  }

  npcs[npcs_count] = npc;
  npcs[npcs_count].xspeed = Math.random() * npcs[npcs_count].xspeed
  if (npcs[npcs_count].name == 'alien_rocket'){
          npcs[npcs_count].x = x;
          npcs[npcs_count].y = y;
          npcs[npcs_count].yspeed = 1.5 * Math.random();
          npcs[npcs_count].xspeed = 5;
          npcs[npcs_count].time_active = 0;
          //active_npcs_count--;
          
          
   } else {
     active_npcs_count++;
   }
  npcs_count++;
  //active_npcs_count++;
  superstition = superstition - npc.cost;        
  return npc;
}    


