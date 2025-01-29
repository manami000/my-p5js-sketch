let circleDiam = 1
let circleposX = 0
let circleposY = 0
let increase = 1
let circlecolor = (255)
let circlearray = []
let maskGraphics;
let opacityDish = 300;
let rotationAngle = 0;
let customFont;


function preload()
{
  Dish = loadImage("petri3.png");
  customFont = loadFont('dogica.ttf');
  
}


function setup() {
  createCanvas(650, 650);
 
}

function draw() {
 
  // Apply the mask to the background
  background(255, 255, 255, 20);
 
  mold();

  for (let i = circlearray.length - 1; i >= 0; i--) 
  { 
    if (circlearray[i].increase < circlearray[i].maxincrease) {
      circlearray[i].increase = circlearray[i].increase + 0.3;
    }
    
    let currenttime = millis();
    let elapsedTime = currenttime - circlearray[i].createdAt;
    if (elapsedTime > 20000) { 
      circlearray[i].opacity -= 0.5; // Gradually reduce opacity
      if (circlearray[i].opacity <= 0) {
        circlearray.splice(i, 1); // Remove the circle once fully transparent
      }
    }
  }
   dish();
  // print("Mouse X:", mouseX, "Mouse Y:", mouseY);
}


function mouseClicked() {
  if (mouseX >= 50 && mouseX <= 600 && mouseY >= 50 && mouseY <= 600) {
    circleposX = mouseX;
    circleposY = mouseY;
    increase = 0;
    circlecolor = color(random(230, 290), random(200, 300), random(120, 250), opacityDish);
    
    let maxincrease = random(50, 250);
    
    
    // Add the first circle
    circlearray.push({
      x: circleposX,
      y: circleposY,
      color: circlecolor,
      increase: increase,
      maxincrease: maxincrease+10,
      createdAt: millis(),
      opacity: opacityDish,
      rotationAngle: 0,
     
      
    });

    // Add the second circle 
    circlearray.push({
      x: circleposX, 
      y: circleposY,
      color: color(random(200, 250), random(200, 300), random(100, 230), opacityDish), // Different color
      increase: increase,
      maxincrease: maxincrease,
      createdAt: millis(),
      opacity: opacityDish,
      hasText: random(1) < 0.5, // _% chace of text appearning
      rotationAngle: 0,
    });
     
  }
  // If the click is outside the boundaries, do nothing
}


function mold() 
{
  noStroke();
  fill(circlecolor);

  for (let i = 0; i < circlearray.length; i++) 
  {
    let c = circlearray[i].color.levels; // Extract RGB values of the color
    let CurrentDiam = circleDiam + circlearray[i].increase;

    drawingContext.filter = 'blur(10px)';
    
    fill(c[0], c[1], c[2], circlearray[i].opacity); 
    circle(circlearray[i].x, circlearray[i].y, CurrentDiam);
    
    drawingContext.filter = 'none';

    if (circlearray[i].hasText === true) 
    {
      let wordRot = "rot";
      let wordData = "data";

      textFont(customFont);
      fill((250,240,240), opacityDish);
      textSize(10);
     // textStyle(BOLD);
      textAlign(CENTER, CENTER);
      blendMode(OVERLAY);
      

      let textRadius = CurrentDiam / 3; 
      let rotationSpeed = 0.001; 
      
      circlearray[i].rotationAngle += rotationSpeed; // Increment rotation over time for each circle

      // Show "rot"
      if (CurrentDiam >= 40) 
      {
        for (let j = 0; j < wordRot.length; j++) 
        {
          let angle = map(j, 0, wordRot.length - 1, (3 * PI) / 4, PI / 4) + circlearray[i].rotationAngle;
          let x = circlearray[i].x + textRadius * cos(angle);
          let y = circlearray[i].y + textRadius * sin(angle);
          text(wordRot[j], x, y);
        }
      }

      // Show "data" 
      if (CurrentDiam >= 90) 
      {
        for (let j = 0; j < wordData.length; j++) 
        {
          let angle = map(j, 0, wordData.length - 1, (5 * PI) / 4, (7 * PI) / 4) + circlearray[i].rotationAngle;
          let x = circlearray[i].x + textRadius * cos(angle);
          let y = circlearray[i].y + textRadius * sin(angle);
          text(wordData[j], x, y);
        }
        
      }
    blendMode(BLEND);
    } 
  }
}



function dish()
{
  image (Dish,0,0);
  Dish.resize(650,650);
}

