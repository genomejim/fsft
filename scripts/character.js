character = function(x,y,speed,height,width,image_src,role,state,melee_damage){
    this.draw = character_location.draw;
    //location
    this.x = x;
    this.y = y;
    this.speed = speed;
    
    //collison
    this.height = height;
    this.width = width;
    //display
    this.img = new Image();
    this.img.src = image_src;

    //roles (enemy,quest,inactive,tutorial)
    this.role = role;
    

    //defensive combat stats
    this.state = state;
    this.hp = hp;
    //offensive combat stats
    this.melee_damage = melee_damage;

}