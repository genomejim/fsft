game_base.run = function () {
    game_base.update();
    game_base.draw();
}

game_base.update = function(event) {

  player_unit_spawning(event);
  enemy_unit_spawning();
  update_buttons();
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
  if (!npcs[i]) {
    continue; // avoid deleted elements
  }

  if (i != 0){


    if (npcs[i].name == 'alien_rocket'){
      //plain jane movement
      npcs[i].x = npcs[i].x - npcs[i].xspeed;
      npcs[i].y = npcs[i].y - npcs[i].yspeed;

      //increment time active so unit will time out
      npcs[i].age++;

      //this unit affected by gravity
      npcs[i].yspeed = npcs[i].yspeed - .03;

      //remove unit after 200 turns
      if (npcs[i].age > npcs[i].maximum_age) {
        remove_unit(npcs[i],i);
      }

      
      
    } else {

      //trying non random wiggly movement for a while 
      npcs[i].x = npcs[i].x - npcs[i].xspeed; 
      if (turn_count  % 30 >= 15) {
        npcs[i].y = npcs[i].y - npcs[i].yspeed - .3;
      } else {
        npcs[i].y = npcs[i].y - npcs[i].yspeed + .3;
      }

      //periodically add rockets fired by the alien
      if (npcs[i].name == "alien" && (turn_count % 9 == 0 || turn_count % 11 == 0)){
        add_enemy_unit('alien_rocket',npcs[i].x,npcs[i].y,npcs[i].xspeed,npcs[i].yspeed);
      }              
    }
  }
}

for (var j in chars) {
  if (j != 0){
    if (!chars[j]) {
      continue; // avoid deleted elements
    }
    // move rockets and the plane
    if (chars[j].name == 'pylon_rocket' || chars[j].name == 'pogo_rocket' || chars[j].name == 'pogo_plane'){
      chars[j].x = chars[j].x + chars[j].xspeed;
      chars[j].y = chars[j].y - chars[j].yspeed;
      chars[j].age++;

      //pogo plane affected by gravity
      if (chars[j].name == 'pogo_plane'){
        if (chars[j].yspeed > -1){
          chars[j].yspeed = chars[j].yspeed - .006;
        }
      } else {
        chars[j].yspeed = chars[j].yspeed - .02;
      }
      if (chars[j].age > 75 && (chars[j].name == 'pylon_rocket' || chars[j].name == 'pogo_rocket')) {
        remove_unit(chars[j],j);
         
      } else if ( chars[j].age > 190 &&  chars[j].name == 'pogo_plane'){
        remove_unit(chars[j],j);
        
      }
    }

    //move the icbm
    if (chars[j].name == 'icbm') {
      //plain jane movement
      chars[j].x = chars[j].x + chars[j].xspeed;
      chars[j].y = chars[j].y + chars[j].yspeed;
      
      //icbm moving affected by gravity
      chars[j].yspeed = chars[j].yspeed + .1;
      continue;
    }

    //dont move pylons, have the defense pylon and pogo plane spawn rockets
    if (chars[j].name == 'pylon' || chars[j].name == 'defense_pylon') {
      //pylons don't move, they are pylons
      if (chars[j].name == "defense_pylon" && turn_count % 5 == 0){
        add_unit('pylon_rocket',chars[j].x,chars[j].y);
      }  
    }
    else if (chars[j].name == 'pogo_plane') {
      if (turn_count % 4 == 0 || turn_count % 5 == 0 ) {     
        add_unit('pogo_rocket',chars[j].x,chars[j].y,chars[j].xspeed,chars[j].yspeed);
      }
        chars[j].x = chars[j].x + chars[j].xspeed - Math.random() + Math.random();
        chars[j].y = chars[j].y - Math.random() + Math.random();
          
    }
    else {
      //the default case for unit movement (with bounce)

      //trying movement without random bounce
      chars[j].x = chars[j].x + chars[j].xspeed;
      if (turn_count  % 30 >= 15) {
        chars[j].y = chars[j].y - chars[j].yspeed - .3;
      } else {
        chars[j].y = chars[j].y - chars[j].yspeed + .3;
      }
                  
    }
    if (emily_count > 0) {
       if (chars[j].hp < chars[j].starting_hp){
         chars[j].hp = chars[j].hp + 1;
       
         if (turn_count % 3 == 0) {
           var heal = new collision(chars[j].x,chars[j].y,2,2);
           heals[heal_count++] = heal;
         }
    }
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
      if (turn_count % 10 == 0){
        chars[j].xspeed = chars[j].starting_xspeed;
        npcs[i].xspeed = npcs[i].starting_xspeed;   
      }
      if (Math.abs(chars[j].x - npcs[i].x) < 50 && Math.abs(chars[j].y - npcs[i].y) < 50)  {
        //units stop to fight
        chars[j].xspeed = 0;
        chars[j].yspeed = 0;
        npcs[i].xspeed = 0;
        npcs[i].yspeed = 0;                
        //npc deals melee damage to character

        //add collision to collisions
        if (turn_count % 2 == 0) {
          var coll = new collision(chars[j].x,chars[j].y,2,npcs[i].melee_damage/2);
          var coll1 = new collision(npcs[i].x,npcs[i].y,2,chars[j].melee_damage/2);        
          collisions[collision_count++] = coll;
          collisions[collision_count++] = coll1;
        }
        if (npcs[i].name == 'repulsor'){
          //attack player speed
          chars[j].xspeed = ( -Math.random() * 0.1 );
          chars[j].yspeed = ( -Math.random() * 0.1 );
          chars[j].starting_xspeed = ( -Math.random() * 0.1 );
          chars[j].starting_yspeed = ( -Math.random() * 0.1 );
        } else {
          chars[j].hp = chars[j].hp - npcs[i].melee_damage;
        }        
        //character deals melee damage to npc
        if (chars[j].name == 'ghost'){
        //attack enemy speed and damage
          npcs[i].xspeed = 0;
          npcs[i].starting_xspeed = 0;
          chars[j].xspeed = chars[j].starting_xspeed;
          if ( i != 0) {
            npcs[i].melee_damage = npcs[i].melee_damage - 7;
          }
	} else if (chars[j].name == 'energy_emily'){
            //make the enemy fly into the air and then fall, finally disappearing
            
            npcs[i].xspeed = -2;
            npcs[i].yspeed = 6 * Math.random() ;
            npcs[i].starting_xspeed = -2;
            npcs[i].starting_yspeed = ( -Math.random() * 0.1 );
            //set unit name to make it obey gravity and begin timeout clock (this doesnt so much work)
            npcs[i].maximum_age = npcs[i].age + 200;
            npcs[i].affected_by_gravity = "true";
        }
        else {
          npcs[i].hp = npcs[i].hp - chars[j].melee_damage;
        }
        if (npcs[i].hp <= 0) {
          if (i != 0) {
            
            //reset movement speed of victor
            chars[j].xspeed = chars[j].starting_xspeed;
            chars[j].yspeed = chars[j].starting_yspeed;
            remove_unit(npcs[i],i);
            if (npcs[i].contributes_science == "true"){
               score++;
            }
            
            
          }
        }
        if (chars[j].hp <= 0) {
          if (chars[j].name == 'lab'){
            window.alert("Sadly, Science has been defeated by Superstition");
            chars[j].hp = 500;
            lair.hp=10000;
            superstition = 100;
            turn_count = 0;
            active_level = 1; 
            for (var i in chars) {
              if (i != 0) {
                remove_unit(chars[i],i);
              }
          }
            for (var j in npcs) {
              if (j != 0) {
                remove_unit(npcs[j],j);
              }
          }
          //window.alert("Restarting with Level 1");
          //  level1();
            
          }
          
          if (chars[j].name == 'energy_emily'){            
            emily_count--;
            remove_unit(chars[j],j);            
          }
          else if (chars[j].name != 'lab'){
            //reset movement speed of victor
            npcs[i].xspeed = npcs[i].starting_xspeed;
            npcs[i].yspeed = npcs[i].starting_yspeed;            
            remove_unit(chars[j],j);
          }
          
          
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
        _canvasBufferContext.fillText('v 0.5.0t', 960, 5);
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
        _canvasBufferContext.fillText("t = pogo plane 200", 10, 175);
        _canvasBufferContext.fillText("p = pause", 10, 190);
        _canvasBufferContext.fillStyle    = 'rgba(1000, 1000, 1000, 0.65)';
        _canvasBufferContext.fillText("1 = energy emily 500 ", 10, 205);
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
  
        
//draw active npcs and collisions

  for (var i in npcs) {
    _canvasBufferContext.globalAlpha =  npcs[i].hp / npcs[i].starting_hp + .2;  
    _canvasBufferContext.drawImage(npcs[i].img, npcs[i].x - npcs[i].width / 2, npcs[i].y - npcs[i].height / 2);
    _canvasBufferContext.globalAlpha =  1;
  }   

  for (var j in chars) {
    _canvasBufferContext.globalAlpha =  chars[j].hp / chars[j].starting_hp + .2; 
    _canvasBufferContext.drawImage(chars[j].img, chars[j].x - chars[j].width / 2 , chars[j].y - chars[j].height / 2);
    _canvasBufferContext.globalAlpha =  1;
  }
 

  for (var k in collisions) {
    if (!collisions[k]) {
          continue; // avoid deleted elements
        }
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

for (var m in heals) {
    if (heals[m].display_time > 0) {
      _canvasBufferContext.strokeStyle = 'rgba(0, 600, 0, 0.35)';
      _canvasBufferContext.lineWidth   = 5;
      _canvasBufferContext.beginPath();
      _canvasBufferContext.arc(heals[m].x,heals[m].y,heals[m].radius,1.5* Math.PI ,.5 * Math.PI);
      _canvasBufferContext.stroke();
      _canvasBufferContext.closePath();
      heals[m].radius = heals[m].radius + 24;
      heals[m].display_time--;
    } else {
        delete heals[m];
    }
  }
  	
  _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}

add_unit = function (char_name,x,y,xspeed,yspeed) {

  var char = new unit(char_name);
  //don't allow more than one hero unit in play at a time
  if (char.name == 'energy_emily' && emily_count > 0){
    return 1;
  } 
  else if (char.name == 'energy_emily' && science > char.cost) {
    emily_count++;
  }
  
  //don't add a unit if there is not enough science to pay for it 
  //or if the cooldown time is not satisfied
  if (science < char.cost || player_cooldown < char.cooldown) {
    return 0;
  }

  //don't add a pylon if there are already 75 active units
  if (active_chars_count >= 75 && char_name == "pylon") {
    return 0;
  }

  //add unit
  chars[chars_count] = char;

  //calculate position to add pylons
  if (chars[chars_count].name == 'pylon'){
    chars[chars_count].x = pylon_spawn_x;
    pylon_spawn_x = pylon_spawn_x + 2;
    if (pylon_spawn_x > 105){
      pylon_spawn_x = 26;
    }
  }

  //add rockets with the velocity and position of the unit that fired them 
  if (chars[chars_count].name == 'pylon_rocket' || chars[chars_count].name == 'pogo_rocket'){
    chars[chars_count].x = x;
    chars[chars_count].y = y;
    if (chars[chars_count].name == 'pylon_rocket'){
      chars[chars_count].yspeed = 2 * Math.random();
      chars[chars_count].xspeed = 3;
    }
    else if (chars[chars_count].name == 'pogo_rocket'){
      chars[chars_count].xspeed = xspeed + 3 * Math.random();
      chars[chars_count].yspeed = yspeed - 3 * Math.random();
    }
    
    chars[chars_count].age = 0;    
  }  else {
    if(chars[chars_count].contributes_science == "true"){
      active_chars_count++;
    }     
    player_cooldown = 0;
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
          npcs[npcs_count].age = 0;                   
   } else {
     if (npcs[npcs_count].contributes_science == "true"){
       active_npcs_count++;
     }
     npcs[npcs_count].starting_xspeed = npcs[npcs_count].starting_xspeed * Math.random();
   }
  npcs_count++;  
  superstition = superstition - npc.cost;        
  return npc;
}    

remove_unit = function(unit,unit_hash_key) {

  if (unit.contributes_science == "true" && unit.allegiance == "science") {
    active_chars_count--;  
  }
  if (unit.contributes_science == "true" && unit.allegiance == "superstition") {
    active_npcs_count--;  
  }
  if (unit.allegiance == "science") {
    delete chars[unit_hash_key];
  }
  if (unit.allegiance == "superstition") {
    delete npcs[unit_hash_key];
  }
     
}

update_buttons = function(){
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
}