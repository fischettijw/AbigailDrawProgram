//  https://p5js.org/reference/#/p5.Vector/reflect      DRAW ARROW

let colorPicker;
let thicknessSlider;
let drawColor;
let penThickness;
let smouseX;
let smouseY;
let CAS;
let caS;
let cAs;
let Cas;

function setup(){
  createCanvas(windowWidth,windowHeight-40);
  initializeDraw();
}

function initializeDraw(){
  strokeCap(ROUND);
  drawColor = color(255);
  penThickness = 5;
  background(0);
  colorPicker = createColorPicker('#FFFFFF');
  drawColor = colorPicker.color();
  colorPicker.position(5, height + 5);
  thicknessSlider = createSlider(1,70,10,1);
  thicknessSlider.position(60,height+9);
}

function draw(){
  drawColor = colorPicker.color();
  penThickness = thicknessSlider.value();
  if(mouseIsPressed){ drawLine(); }
  drawColorIcon();
}

function drawLine(){
  CAS = keyIsDown(CONTROL)==true && keyIsDown(ALT)==true && keyIsDown(SHIFT)==true;
  caS = keyIsDown(CONTROL)==false && keyIsDown(ALT)==false && keyIsDown(SHIFT)==true;
  cAs = keyIsDown(CONTROL)==false && keyIsDown(ALT)==true && keyIsDown(SHIFT)==false;
  Cas = keyIsDown(CONTROL)==true && keyIsDown(ALT)==false && keyIsDown(SHIFT)==false;
  CAs = keyIsDown(CONTROL)==true && keyIsDown(ALT)==true && keyIsDown(SHIFT)==false;  

  stroke(drawColor);
  strokeWeight(penThickness);

  if(cAs){
    line(smouseX,smouseY,mouseX,mouseY);
  }else if (CAs){
    if (dist(smouseX,smouseY,mouseX, mouseY) > 5){    
       drawLineWithArrow(createVector(smouseX,smouseY), 
       createVector(mouseX,mouseY), drawColor);
    }
  }else if (caS) {
    line(smouseX,smouseY,mouseX,smouseY);    
    mouseY = smouseY; 
  }else if (Cas) {
    line(smouseX,smouseY,smouseX,mouseY);    
    mouseX = smouseX; 
  }else{
    line(pmouseX,pmouseY,mouseX,mouseY); 
  }

  smouseX = mouseX;
  smouseY = mouseY;
  //  https://p5js.org/reference/#p5/keyCode
  //  BACKSPACE, DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, 
  //  OPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
}

function drawColorIcon(){
  noStroke();
  fill(drawColor);
  ellipse(50, 50, 90,90);
  fill(128);
  ellipse(50, 50, 80, 80);
  fill(drawColor);
  ellipse(50, 50, penThickness, penThickness);       
}

function keyPressed(){
    if(key == 'r') {drawColor = color(255,0,0);}      // Red
    if(key == 'g') {drawColor = color(0,255,0);}      // Green
    if(key == 'b') {drawColor = color(0,0,255);}      // Blue
    if(key == 'R') {background(255,0,0);}             // Red Background
    if(key == 'G') {background(0,255,0);}             // Green Background
    if(key == 'B') {background(0,0,255);}             // Blue Background

    if(key == 'c') {drawColor = color(0,255,255);}    // Cyan
    if(key == 'y') {drawColor = color(255,255,0);}    // Yellow
    if(key == 'm') {drawColor = color(255,0,255);}    // Magenta
    if(key == 'C') {background(0,255,255);}           // Cyan Background
    if(key == 'Y') {background(255,255,0);}           // Yellow Background
    if(key == 'M') {background(255,0,255);}           // Magenta Background

    if(key == 'w') {drawColor = color(255,255,255);}  // White
    if(key == 'k') {drawColor = color(0,0,0);}        // Black
    if(key == 'W') {background(255,255,255);}         // White Background
    if(key == 'K') {background(0,0,0);}               // Black Background

    if(key == 'x') {drawColor = color(random(0,255), random(0,255), random(0,255));}  // Random Color
    if(key == 'X') {background(random(0,255), random(0,255), random(0,255));}         // Random Background Color

    if(key == '+' && penThickness < 60) {penThickness += 1; }    // increase penThickness up to 60
    if(key == '-' && penThickness > 1) {penThickness -= 1; }    // decrease penThickness down to 1

    if(key > '0' && key < '7'){ penThickness = key * 10;}

    if(key == '!') {initializeDraw();}       // clear screen
  }

function drawLineWithArrow(base, vec, myColor) {
  vec.sub(base);
  push();
  stroke(myColor);
  strokeWeight(penThickness);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);  
  triangle(0, (arrowSize / 2) , 0, (-arrowSize / 2) , arrowSize , 0);
  pop();
}

