

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
          chars[j].speed = ( -Math.random() * 0.1 );
        } else {
          chars[j].hp = chars[j].hp - npcs[i].melee_damage;
        }        
        //character deals melee damage to npc
        if (chars[j].name == 'ghost'){
        //attack enemy speed and damage
          npcs[i].speed = 0;
          if ( i != 0) {
            npcs[i].melee_damage = npcs[i].melee_damage - 7;
          }
	}
        else {
          npcs[i].hp = npcs[i].hp - chars[j].melee_damage;
        }
        if (npcs[i].hp <= 0) {
          if (i != 0) {
            delete npcs[i];
            score++;
            active_npcs_count--;
          }
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
        _canvasBufferContext.fillRect(0, 513 , 1097, 25); 
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.9)';
        _canvasBufferContext.fillText('score = ', 10, 5);
	_canvasBufferContext.fillText(score, 70, 5);        
        _canvasBufferContext.fillText('science = ', 200, 5);
        _canvasBufferContext.fillText(science, 270, 5);
        _canvasBufferContext.fillText('lab = ', 400, 5);
	_canvasBufferContext.fillText(chars[0].hp, 470, 5);
        _canvasBufferContext.fillText('lair = ', 600, 5);
	_canvasBufferContext.fillText(lair.hp, 670, 5);
        _canvasBufferContext.fillText('superstition = ', 770, 5);
	_canvasBufferContext.fillText(superstition, 880, 5);
        _canvasBufferContext.fillText('v 0.3.2', 960, 5);
        _canvasBufferContext.fillStyle    = 'rgba(100, 100, 100, 0.5)';
        _canvasBufferContext.fillText("w = flying scientist 7", 10, 25);
        _canvasBufferContext.fillText("a = giant trooper 100",10, 40);
        _canvasBufferContext.fillText("d = scientist 5", 10, 55);
        _canvasBufferContext.fillText("s = science trooper 10", 10, 70);
        _canvasBufferContext.fillText("q = pylon 7", 10, 85);
        _canvasBufferContext.fillText("e = grogon 1000", 10, 100);
        _canvasBufferContext.fillText("space = rocket 5", 10, 115);
        _canvasBufferContext.fillText("z = ghost 300", 10, 130);
        _canvasBufferContext.fillText("p = pause", 10, 145);
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

add_unit = function (char_name) {

  var char = new unit(char_name);
  if (science < char.cost || player_cooldown < char.cooldown) {
    return 0;
  }
  if (active_chars_count >= 50 && char_name == "pylon") {
    return 0;
  }
  chars[chars_count] = char;
  chars_count++;
  player_cooldown = 0;
  active_chars_count++;
  science = science - char.cost;
  return 1;
}

add_enemy_unit = function(npc_name){

  var npc = new unit(npc_name);
  if (superstition < npc.cost) {
    return 0;
  }

  npcs[npcs_count] = npc;
  npcs[npcs_count].speed = Math.random() * npcs[npcs_count].speed
  npcs_count++;
  active_npcs_count++;
  superstition = superstition - npc.cost;        
  return npc;
}    


