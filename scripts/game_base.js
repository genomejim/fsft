game_base.run = function () {
    game_base.update();
    game_base.draw();
    turn_count++;
    player_cooldown++;
}


game_base.update = function(event) {

  if (pressed_right && player_cooldown > 50){
    var chars_loc = new character_location(true,50,505,"lobby");
    var chars_appearance = new appearance(256,256,"./content/images/scientist.png","./content/images/scientist.png","labcoat");
    var chars_stats= new base_stats(2,"hero","rawr",false,0);
    var chars_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

    var char = new character (chars_loc,chars_appearance,chars_stats,chars_combat_stats);
    chars[chars_count] = char;
    chars_count++;
    player_cooldown = 0;
  }
  if (turn_count % 200 == 0 && npcs_count < 100){
    var npcs_loc = new character_location(true,3150,505,"lobby");
    var npcs_appearance = new appearance(256,256,"./content/images/evil_scientist.png","./content/images/evil_scientist.png","labcoat");
    var npcs_stats= new base_stats(2,"hero","rawr",false,0);
    var npcs_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

    var npc = new character (npcs_loc,npcs_appearance,npcs_stats,npcs_combat_stats);
    npcs[npcs_count] = npc;
    npcs_count++;    
  }

  for (var i in npcs) {
    npcs[i].x = npcs[i].x - npcs[i].speed;
  }
  for (var j in chars) {
    
    chars[j].x = chars[j].x + chars[j].speed;
    
  }  

//melee combat detection
  for (var i in npcs) {
    for (var j in chars) {
      if (Math.abs(chars[j].x - npcs[i].x) < 100)  {                
        //npc deals melee damage to character
        chars[j].hp = chars[j].hp - npcs[i].melee_damage;
                
        //character deals melee damage to npc
        npcs[i].hp = npcs[i].hp - chars[j].melee_damage;

        if (npcs[i].hp <= 0) {
          delete npcs[i];
        }
        if (chars[j].hp <= 0) {
          delete chars[j];
        }
      }               
    }
  }
}

game_base.draw = function() {
        
  //clear the canvas and the buffer for the next frame
  _canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
  _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);

  //draw active scene        
  _canvasBufferContext.drawImage(scenes.moon.img, 0, 0);              
        
//draw active npcs

  for (var i in npcs) {
    _canvasBufferContext.drawImage(npcs[i].img, npcs[i].x, npcs[i].y);
  }   
	
  for (var j in chars) {
    _canvasBufferContext.drawImage(chars[j].img, chars[j].x, chars[j].y);
  }   
	
  _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}


game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);