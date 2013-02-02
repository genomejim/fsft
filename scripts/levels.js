function level1(){

if (lair.hp > 0) {
  if (turn_count % 35 == 0 && active_npcs_count < 20){

    if (Math.random() > .5){
      if (Math.random() * superstition > 85){    
        add_enemy_unit('evil_scientist');
      }
    } else {        
      if (Math.random() * superstition > 85) {
        add_enemy_unit('werewolf');
      }
    }
  }
  


} else {
    //level transition
    lair.hp=10000;
    superstition = 100;
    turn_count = 0;
    active_chars_count = 0;
    active_level++; 
    for (var i in chars) {
      if (i != 0) {
        delete chars[i];
      }
    }
    for (var j in npcs) {
      if (j != 0) {
        delete npcs[j];
      }
    }
    window.alert("Starting Level 2");
    //init();
}

}
function level2(){
level_display_name = "For Love and Rockets!";
if (lair.hp > 0) {

  
if (npcs_count < 10000  && turn_count > 1000){
    // spawn enemy rocket
    if (Math.random()  > .9){
      add_enemy_unit('evil_rocket');
    }
  }

} else {

    //level transition
    lair.hp=10000;
    superstition = 100;
    turn_count = 0;
    active_chars_count = 0;
    active_level++; 
    for (var i in chars) {
      if (i != 0) {
        delete chars[i];
      }
    }
    for (var j in npcs) {
      if (j != 0) {
        delete npcs[j];
      }
    }
    window.alert("Starting Level 3");
    //init();
}

}

function level3(){
level_display_name = "SRSLY!";
if (lair.hp > 0) {
  if (active_npcs_count < 20){

    if (Math.random() > .5){
      if (Math.random() * superstition > 85){    
        add_enemy_unit('evil_scientist');
      }
    } else {        
      if (Math.random() * superstition > 85) {
        add_enemy_unit('bat');
      }
    }
  }
  

  if (turn_count % 35 == 0  && active_npcs_count < 40){

    if (Math.random() * superstition > 90){
      add_enemy_unit('werewolf');
    } else if (Math.random() * superstition > 85) {
      add_enemy_unit('vampire');
    }
  }
  if (turn_count % 50 == 0 && active_npcs_count < 52){
    if (Math.random() * superstition > 150){
      add_enemy_unit('evil_giant_robot');
    }
  }

  if (turn_count % 40 == 0 && active_npcs_count < 50){
    if (Math.random() * superstition > 80 ){
      add_enemy_unit('evil_pylon');
    }
  }

if (turn_count % 10 == 0  ){
    if (Math.random() * superstition > 999){
      add_enemy_unit('grogon');
    }
  }

if (turn_count % 60 == 0 && npcs_count < 10000){
  var beast_meta = CHR['beast'];
  if (Math.random() > .5){
    if (Math.random() * superstition > beast_meta.cost - 1  && active_npcs_count < 57){   
      add_enemy_unit('beast');
    }
  } else { 
    if (Math.random() * superstition > beast_meta.cost - 1  && active_npcs_count < 57){   
      add_enemy_unit('mole');
    }
  }
}
if (turn_count % 100 == 0 && npcs_count < 10000){
    // spawn enemy rocket
    if (Math.random()  > .75){
      add_enemy_unit('evil_rocket');
    }
  }

} else { 
    //level transition
    lair.hp=10000;
    superstition = 100;
    turn_count = 0;
    active_chars_count = 0;
    active_level++; 
    for (var i in chars) {
      if (i != 0) {
        delete chars[i];
      }
    }
    for (var j in npcs) {
      if (j != 0) {
        delete npcs[j];
      }
    }
    window.alert("Starting Level 4");
}

}

function level4(){
level_display_name = "Give us a sampling of your power!";
if (lair.hp > 0) {
  if (active_npcs_count < 30){

    if (Math.random() > .5){
      if (Math.random() * superstition > 85){    
        add_enemy_unit('evil_scientist');
      }
    } else {        
      if (Math.random() * superstition > 85) {
        add_enemy_unit('bat');
      }
    }
  }
  

  if (turn_count % 20 == 0  && active_npcs_count < 40){

    if (Math.random() * superstition > 90){
      add_enemy_unit('werewolf');
    } else if (Math.random() * superstition > 85) {
      add_enemy_unit('vampire');
    }
  }
  if (turn_count % 30 == 0 && active_npcs_count < 50){
    if (Math.random() * superstition > 150){
      add_enemy_unit('evil_giant_robot');
    }
  }

  if (turn_count % 40 == 0 && active_npcs_count < 70){
    if (Math.random() * superstition > 80 ){
      add_enemy_unit('evil_pylon');
    }
  }

if (turn_count % 10 == 0  ){
    if (Math.random() * superstition > 999){
      add_enemy_unit('evil_grogon');
    }
  }

if (turn_count % 60 == 0 && npcs_count < 10000){
  var beast_meta = CHR['beast'];
  if (Math.random() > .5){
    if (Math.random() * superstition > beast_meta.cost - 1  && active_npcs_count < 57){   
      add_enemy_unit('beast');
    }
  } else { 
    if (Math.random() * superstition > beast_meta.cost - 1  && active_npcs_count < 57){   
      add_enemy_unit('mole');
    }
  }
}
if (turn_count % 100 == 0 && npcs_count < 10000){
    // spawn enemy rocket
    if (Math.random()  > .5){
      add_enemy_unit('evil_rocket');
    }
  }

}

else { 
    //level transition
    lair.hp=10000;
    superstition = 100;
    turn_count = 0;
    active_chars_count = 0;
    active_level++; 
    for (var i in chars) {
      if (i != 0) {
        delete chars[i];
      }
    }
    for (var j in npcs) {
      if (j != 0) {
        delete npcs[j];
      }
    }
    window.alert("Starting Level 5");
}

}

function level5(){

if (lair.hp > 0) {
  if (active_npcs_count < 30){

    if (Math.random() > .5){
      if (Math.random() * superstition > 85){    
        add_enemy_unit('evil_scientist');
      }
    } else {        
      if (Math.random() * superstition > 85) {
        add_enemy_unit('bat');
      }
    }
  }
  

  if (turn_count % 20 == 0  && active_npcs_count < 40){

    if (Math.random() * superstition > 90){
      add_enemy_unit('werewolf');
    } else if (Math.random() * superstition > 85) {
      add_enemy_unit('vampire');
    }
  }
  if (turn_count % 30 == 0 && active_npcs_count < 50){
    if (Math.random() * superstition > 150){
      add_enemy_unit('evil_giant_robot');
    }
  }

  if (turn_count % 40 == 0 && active_npcs_count < 70){
    if (Math.random() * superstition > 80 ){
      add_enemy_unit('evil_pylon');
    }
  }

if (turn_count % 10 == 0  ){
    if (Math.random() * superstition > 500){
      add_enemy_unit('evil_grogon');
    }
  }

if (turn_count % 60 == 0 && npcs_count < 10000){
  var beast_meta = CHR['beast'];
  if (Math.random() > .5){
    if (Math.random() * superstition > beast_meta.cost - 1  && active_npcs_count < 57){   
      add_enemy_unit('beast');
    }
  } else { 
    if (Math.random() * superstition > beast_meta.cost - 1  && active_npcs_count < 57){   
      add_enemy_unit('mole');
    }
  }
}
if (turn_count % 100 == 0 && npcs_count < 10000){
    // spawn enemy rocket
    if (Math.random()  > .5){
      add_enemy_unit('evil_rocket');
    }
  }

}

else { 
    //level transition
    lair.hp=10000;
    superstition = 100;
    turn_count = 0;
    active_chars_count = 0;
    active_level++; 
    for (var i in chars) {
      if (i != 0) {
        delete chars[i];
      }
    }
    for (var j in npcs) {
      if (j != 0) {
        delete npcs[j];
      }
    }
    window.alert("You Win! Science Prevails!");
}

}