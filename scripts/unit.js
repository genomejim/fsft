unit = function(x,y,speed,height,width,image_src,hp,melee_damage){
    
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

    //defensive combat stats
    this.hp = hp;
    //offensive combat stats
    this.melee_damage = melee_damage;

}