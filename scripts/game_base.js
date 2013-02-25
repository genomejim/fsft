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

    for (var i in units) {
        if (!units[i]) {
            continue; // avoid deleted elements
        }

        //restart units that previously stopped to fight
        if (turn_count % 10 == 0){
            units[i].xspeed = units[i].starting_xspeed;           
        }

        if (units[i].affected_by_gravity == "TRUE"){
            units[i].x = units[i].x - units[i].xspeed;
            units[i].y = units[i].y + units[i].yspeed;
            units[i].yspeed = units[i].yspeed + units[i].gravity;      
        }else{
            //this periodic bouncing movement is meant to evoke walking
            if (units[i].allegiance == 'science'){ 
                units[i].x = units[i].x + units[i].xspeed;
            } else if (units[i].allegiance == 'superstition') {
                units[i].x = units[i].x - units[i].xspeed;
            }
            if (turn_count  % 30 >= 15) {
                units[i].y = units[i].y - units[i].yspeed - .3;
            } else {
                units[i].y = units[i].y - units[i].yspeed + .3;
            }
        }

        //periodically add projectiles for units that fire projectiles
        if (units[i].name == "alien" && (turn_count % 9 == 0 || turn_count % 11 == 0)){
            add_enemy_unit('alien_rocket',units[i].x,units[i].y,units[i].xspeed,units[i].yspeed);
        }              
        if (units[i].name == "defense_pylon" && turn_count % 5 == 0){
            add_unit('pylon_rocket',units[i].x,units[i].y);
        }  
        if (units[i].name == 'pogo_plane' && (turn_count % 4 == 0 || turn_count % 5 == 0 )) {     
            add_unit('pogo_rocket',units[i].x,units[i].y,units[i].xspeed,units[i].yspeed);
        }
        //if emily is active heal friendly units
        if (emily_count > 0 && units[i].allegiance == 'science') {
            if (units[i].hp < units[i].starting_hp){
                units[i].hp = units[i].hp + 2;
            if (turn_count % 3 == 0) {
                var heal = new collision(units[i].x,units[i].y,2,2);
                heals[heal_count++] = heal;
            }
        }
        //remove units that have exceeded their maximum age
        if (units[i].age > units[i].maximum_age) {
            remove_unit(units[i],i);
        }
        //increment unit age
        units[i].age++;
    }    
}
}
          

function melee_combat_detection() {

    //melee combat detection
    for (var i in units) {
        if (!units[i]) {
            continue; // avoid deleted elements
        }
        //during the combat loop we will only act on the object units (j)
        for (var j in units) {
            if (!units[j] || i == j || units[i].allegiance == units[j].allegiance) {
                continue; // avoid deleted elements and prevent a unit from acting on itself or own team
            }
            //detect proximity of units to start fights
            if (Math.abs(units[i].x - units[j].x) < 50 && Math.abs(units[i].y - units[j].y) < 50)  {
                //units stop to fight
                units[j].xspeed = 0;
                units[j].yspeed = 0;
    
                //add collision to collisions
                if (turn_count % 2 == 0) {
                    var coll = new collision(units[j].x,units[j].y,2,units[i].melee_damage/2);                
                    collisions[collision_count++] = coll;        
                }

                //apply combat effects to object unit(j)
                if (units[i].name == 'repulsor'){
                    //attack player speed
                    units[j].xspeed = ( -Math.random() * 0.1 );
                    //units[j].yspeed = ( -Math.random() * 0.1 );
                    units[j].starting_xspeed = ( -Math.random() * 0.1 );
                    //units[j].starting_yspeed = ( -Math.random() * 0.1 );
                } else if (units[i].name == 'ghost'){
                    units[j].xspeed = 0;
                    units[j].starting_xspeed = 0;
                    units[i].xspeed = units[i].starting_xspeed;
                    if ( units[j].name != 'lair') {
                        units[i].melee_damage = units[i].melee_damage - 7;
                    }
                } else if (units[i].name == 'energy_emily'){
                    //make the enemy fly into the air and then fall, finally disappearing
            
                    units[j].xspeed = -2;
                    units[j].yspeed = 6 * Math.random() ;
                    units[j].starting_xspeed = -2;
                    units[j].starting_yspeed = ( -Math.random() * 0.1 );
                    //set unit to obey gravity and begin timeout clock
                    units[j].maximum_age = units[j].age + 200;
                    units[j].affected_by_gravity = "TRUE";
                
                } else {
                    units[j].hp = units[j].hp - units[i].melee_damage;
                }        
            }            
            //remove object unit if it has been defeated    	
            if (units[j].hp <= 0 && units[j].name != 'lab') {      
                remove_unit(units[j],j);            
            }

            //test for game loss
            if (units[j].name == 'lab' && units[j].hp <= 0){
                window.alert("Sadly, Science has been defeated by Superstition");
                units[i].hp = 500;
                lair.hp=10000;
                superstition = 100;
                turn_count = 0;
                active_level = 1; 
                for (var k in units) {
                    if (k != 0) {
                        remove_unit(units[k],k);
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
	_canvasBufferContext.fillText(Math.round(lab.hp), 470, 5);
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

    for (var i in units) {
        _canvasBufferContext.globalAlpha =  units[i].hp / units[i].starting_hp + .2;  
        _canvasBufferContext.drawImage(units[i].img, units[i].x - units[i].width / 2, units[i].y - units[i].height / 2);
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
    } else if (char.name == 'energy_emily' && science > char.cost) {
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
    units[units_count] = char;

    //calculate position to add pylons
    if (units[units_count].name == 'pylon'){
        units[units_count].x = pylon_spawn_x;
        pylon_spawn_x = pylon_spawn_x + 2;
        if (pylon_spawn_x > 105){
            pylon_spawn_x = 26;
        }
    }

    //add rockets with the velocity and position of the unit that fired them 
    if (units[units_count].name == 'pylon_rocket' || units[units_count].name == 'pogo_rocket'){
        units[units_count].x = x;
        units[units_count].y = y;
        if (units[units_count].name == 'pylon_rocket'){
            units[units_count].yspeed = 2 * Math.random();
            units[units_count].xspeed = 3;
        }
    } else if (units[units_count].name == 'pogo_rocket'){
        units[units_count].xspeed = xspeed + 3 * Math.random();
        units[units_count].yspeed = yspeed - 3 * Math.random();
    }
    
    units[units_count].age = 0;    
    
    if(units[units_count].contributes_science == "TRUE"){
        active_chars_count++;
    }     
    player_cooldown = 0; 
    units_count++;    
    science = science - char.cost;
    return 1;
}

add_enemy_unit = function(npc_name,x,y){

  var npc = new unit(npc_name);
  if (superstition < npc.cost) {
    return 0;
  }

  units[units_count] = npc;
  units[units_count].xspeed = Math.random() * units[units_count].xspeed
  if (units[units_count].name == 'alien_rocket'){
          units[units_count].x = x;
          units[units_count].y = y;
          units[units_count].yspeed = 1.5 * Math.random();
          units[units_count].xspeed = 5;
          units[units_count].age = 0;                   
   } else {
     if (units[units_count].contributes_science == "true"){
       active_npcs_count++;
     }
     units[units_count].starting_xspeed = units[units_count].starting_xspeed * Math.random();
   }
  units_count++;  
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
    delete units[unit_hash_key];
  }
  if (unit.allegiance == "superstition") {
    delete units[unit_hash_key];
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
