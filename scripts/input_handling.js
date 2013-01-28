//event handler for movement
document.onkeydown = down;
document.onkeyup = up;

function up(event) {
  return down(event);
}

function down(event) {
  KEYPRESSED = KEY_NAME[event.keyCode];
}


