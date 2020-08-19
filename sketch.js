//  https://p5js.org/reference/#/p5.Vector/reflect      DRAW ARROW

let ctrlFlag, btnClear, cbxRandomColors, colorPicker, thicknessSlider;
let drawColor, penThickness;
let smouseX, smouseY;
let CAS, caS, cAs, Cas, CAs;

function setup(){
  createCanvas(windowWidth,windowHeight-40);
  initializeDraw();
}

function initializeDraw(){
  strokeCap(ROUND);
  drawColor = color(255);
  penThickness = 10;
  background(0);
  if(ctrlFlag == null){;
    colorPicker = createColorPicker(drawColor);
    drawColor = colorPicker.color();
    colorPicker.position(5, height + 5);
    thicknessSlider = createSlider(1,120,penThickness,1);
    thicknessSlider.position(60,height+9);
    cbxRandomColors = createCheckbox('Random Colors', false);
    cbxRandomColors.position(200,height + 9);
    btnClear = createButton('CLEAR');
    btnClear.position(330,height+9);
    btnClear.mousePressed(btnClearClicked);
    ctrlFlag = true;
  }
}

function btnClearClicked(){
   initializeDraw();
}

function draw(){
  if(cbxRandomColors.checked()){
    drawColor = color(random(0,255), random(0,255), random(0,255));
  }else
  {
    drawColor = colorPicker.color();
  }

  penThickness = thicknessSlider.value();
  if(mouseIsPressed){ drawLine(); }
}


function drawLine(){
  if(mouseX >= width || mouseY >= height) { return;}

  CAS = keyIsDown(CONTROL)==true && keyIsDown(ALT)==true && keyIsDown(SHIFT)==true;
  caS = keyIsDown(CONTROL)==false && keyIsDown(ALT)==false && keyIsDown(SHIFT)==true;
  cAs = keyIsDown(CONTROL)==false && keyIsDown(ALT)==true && keyIsDown(SHIFT)==false;
  Cas = keyIsDown(CONTROL)==true && keyIsDown(ALT)==false && keyIsDown(SHIFT)==false;
  CAs = keyIsDown(CONTROL)==true && keyIsDown(ALT)==true && keyIsDown(SHIFT)==false;  

  stroke(drawColor);
  strokeWeight(penThickness);

  if (cAs){
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
