//event handler for movement
document.onkeydown = down;
document.onkeyup = up;

var pressed_up = false;
var pressed_down = false;
var pressed_right = false;
var pressed_left = false;
var pressed_space = false;
var pressed_q = false;
var pressed_e = false;
var pressed_space = false;


function down (event) {


        var key = event.keyCode;

        switch (key) {
    
    case 87: // W
            pressed_up = true;
        break;

        case 38: // W
            pressed_up = true;
        break;
        
         

case 65: // A

            
            pressed_left = true;
        break;

         

case 37: // left arrow
            
            pressed_left = true;
        break;




        case 68: // D
            
            pressed_right= true;
    
    break;

        case 39: // D
            pressed_right= true;
    
    break;






        case 83: // S
            pressed_down = true;
        
break;

        case 40: // down arrow
            pressed_down = true;
        
break;

        case 32: // Space bar : SCIENCE BEAM
        pressed_space = true;

        break;
        case 70: // f : SCIENCE BEAM
        pressed_space = true;  
        break;
        
        case 81: // q 
        pressed_q = true;  
        break;

        case 69: // e 
        pressed_e = true;  
        break;

        case 32: // space 
        pressed_space = true;  
        break;


    }

}

function up (event) {


        var key = event.keyCode;

        switch (key) {
    
    case 87: // W
            pressed_up = false;
    
    break;
        case 38: // up arrow
            pressed_up = false;
    
    break;

        

case 65: // A

            pressed_left = false;
        break;
        case 37: // left arrow

            pressed_left = false;
        break;


        case 68: // D
            pressed_right= false;
    
    break;
        case 39: // right arrow
            pressed_right= false;
    
    break;



        case 83: // S
            pressed_down = false;       
        
break;
        case 40: // down arrow
            pressed_down = false;
        
break;

        case 32: // Space bar : SCIENCE BEAM
        pressed_space = false;
        break;
        case 70: // f : SCIENCE BEAM
        pressed_space = false;
        break;

        case 81: // q 
        pressed_q = false;  
        break;

        case 69: // e 
        pressed_e = false;  
        break;

        case 32: // space 
        pressed_space = false;  
        break;

    }

}