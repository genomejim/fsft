game_base.run = function () {
    var chars_count = 0;
    game_base.update();
    game_base.draw();
}


game_base.update = function(event) {

  if (pressed_right){
    var maxer_loc = new character_location(true,50,505,"lobby");
    var maxer_appearance = new appearance(256,256,"./content/images/scientist.png","./content/images/scientist.png","labcoat");
    var maxer_stats= new base_stats(10,"hero","rawr",false,0);
    var maxer_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

    var maxer = new character (maxer_loc,maxer_appearance,maxer_stats,maxer_combat_stats);
    chars[chars_count] = maxer;
    chars_count++;
  }

  for (var i in npcs) {
    npcs[i].x = npcs[i].x - 1;
  }
  for (var j in chars) {
    chars[j].x = chars[j].x + 1;
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