//event handler for movement
document.onkeydown = down;
document.onkeyup = up;

function up(event) {
  // ...
}

function down(event) {
  KEYPRESSED = event.keyCode;
}

//Kinect JS stuffs
  var stage = new Kinetic.Stage({
        container: 'container',
        width: 1097,
        height: 60
      });

      var button_layer = new Kinetic.Layer();
      var text_layer = new Kinetic.Layer();


  //var group = new Kinetic.Group({
  //});

  var rect1 = new Kinetic.Rect({

    x: 100,
    y: 5,
    width: 80,
    height: 35,
    fill: "green",
    stroke: "black",
    strokeWidth: 2

  });
  var text1 = new Kinetic.Text({
        x: 105,
        y: 15,
        text: 'scientist (d)',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white'
  });

  var rect2 = new Kinetic.Rect({

    x: 190,
    y: 5,
    width: 80,
    height: 35,
    fill: "green",
    stroke: "black",
    strokeWidth: 2

  });
  var text2 = new Kinetic.Text({
        x: 200,
        y: 15,
        text: 'trooper (s)',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white'
  });

  var rect3 = new Kinetic.Rect({

    x: 280,
    y: 5,
    width: 80,
    height: 35,
    fill: "green",
    stroke: "black",
    strokeWidth: 2

  });

  var text3 = new Kinetic.Text({
        x: 290,
        y: 15,
        text: 'pylon (q)',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white'
  });

  var rect4 = new Kinetic.Rect({

    x: 370,
    y: 5,
    width: 80,
    height: 35,
    fill: "green",
    stroke: "black",
    strokeWidth: 2

  });

  var text4 = new Kinetic.Text({
        x: 372,
        y: 15,
        text: 'giant trpr (a)',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white'
  });

  var rect5 = new Kinetic.Rect({

    x: 460,
    y: 5,
    width: 80,
    height: 35,
    fill: "green",
    stroke: "black",
    strokeWidth: 2

  });

  var text5 = new Kinetic.Text({
        x: 470,
        y: 15,
        text: 'grogon (e)',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white'
  });

  var rect6 = new Kinetic.Rect({

    x: 550,
    y: 5,
    width: 80,
    height: 35,
    fill: "green",
    stroke: "black",
    strokeWidth: 2

  });
  var text6 = new Kinetic.Text({
        x: 555,
        y: 15,
        text: 'rocket (spc)',
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: 'white'
  });

      // add the shape to the layer
      button_layer.add(rect1);
      button_layer.add(text1);
      button_layer.add(rect2);
      button_layer.add(text2);
      button_layer.add(rect3);
      button_layer.add(text3);
      button_layer.add(rect4);
      button_layer.add(text4);
      button_layer.add(rect5);
      button_layer.add(text5);
      button_layer.add(rect6);
      button_layer.add(text6);
            

      // add the layer to the stage
      stage.add(button_layer);
      

      rect1.on('mousedown click tap', function() {
        add_unit('scientist');
      });
      rect2.on('mousedown click tap', function() {
        add_unit('science_trooper');
      });
      rect3.on('mousedown click tap', function() {
        add_unit('pylon');
      });
      rect4.on('mousedown click tap', function() {
        add_unit('giant_trooper');
      });
      rect5.on('mousedown click tap', function() {
        add_unit('grogon');
      });
      rect6.on('mousedown click tap', function() {
        add_unit('rocket');
      });
      text1.on('mousedown click tap', function() {
        add_unit('scientist');
      });
      text2.on('mousedown click tap', function() {
        add_unit('science_trooper');
      });
      text3.on('mousedown click tap', function() {
        add_unit('pylon');
      });
      text4.on('mousedown click tap', function() {
        add_unit('giant_trooper');
      });
      text5.on('mousedown click tap', function() {
        add_unit('grogon');
      });
      text6.on('mousedown click tap', function() {
        add_unit('rocket');
      });