let circleDiam = 1;
let circlearray = [];
let opacityDish = 300;
let customFont;
let showText = true;

let Dish;

function preload() {
  Dish = loadImage("petri3.png");
  customFont = loadFont("dogica.ttf");
}

function setup() {
  const s = min(windowWidth, windowHeight);
  createCanvas(s, s);
  document.body.style.margin = 0;
}

function windowResized() {
  const s = min(windowWidth, windowHeight);
  resizeCanvas(s, s);
}

function draw() {
  background(255, 255, 255, 20);

  mold();
  dish();

  if (showText) {
    fill(150);
    textSize(10);
    textFont(customFont);
    textAlign(CENTER, CENTER);
    text("Click anywhere", width / 2, height / 2);
  }

  for (let i = circlearray.length - 1; i >= 0; i--) {
    if (circlearray[i].increase < circlearray[i].maxincrease) {
      circlearray[i].increase += 0.3;
    }

    let elapsedTime = millis() - circlearray[i].createdAt;
    if (elapsedTime > 15000) {
      circlearray[i].opacity -= 0.5;
      if (circlearray[i].opacity <= 0) {
        circlearray.splice(i, 1);
      }
    }
  }
}

function mouseClicked() {
  if (showText) showText = false;

  let maxincrease = random(50, width * 0.4);

  circlearray.push({
    x: mouseX,
    y: mouseY,
    color: color(
      random(230, 290),
      random(200, 300),
      random(120, 250),
      opacityDish
    ),
    increase: 0,
    maxincrease: maxincrease + 10,
    createdAt: millis(),
    opacity: opacityDish,
    rotationAngle: 0,
    hasText: false
  });

  circlearray.push({
    x: mouseX,
    y: mouseY,
    color: color(
      random(200, 250),
      random(200, 300),
      random(100, 230),
      opacityDish
    ),
    increase: 0,
    maxincrease: maxincrease,
    createdAt: millis(),
    opacity: opacityDish,
    rotationAngle: 0,
    hasText: random(1) < 0.5
  });
}

function mold() {
  noStroke();

  for (let i = 0; i < circlearray.length; i++) {
    let c = circlearray[i].color.levels;
    let d = circleDiam + circlearray[i].increase;

    drawingContext.filter = "blur(10px)";
    fill(c[0], c[1], c[2], circlearray[i].opacity);
    circle(circlearray[i].x, circlearray[i].y, d);
    drawingContext.filter = "none";

    if (circlearray[i].hasText) {
      let wordRot = "rot";
      let wordData = "data";

      textFont(customFont);
      fill(250, 250, 250, opacityDish);
      textSize(10);
      textAlign(CENTER, CENTER);

      let r = d / 3;
      circlearray[i].rotationAngle += 0.001;

      if (d >= 40) {
        for (let j = 0; j < wordRot.length; j++) {
          let a =
            map(j, 0, wordRot.length - 1, (3 * PI) / 4, PI / 4) +
            circlearray[i].rotationAngle;
          text(
            wordRot[j],
            circlearray[i].x + r * cos(a),
            circlearray[i].y + r * sin(a)
          );
        }
      }

      if (d >= 90) {
        for (let j = 0; j < wordData.length; j++) {
          let a =
            map(j, 0, wordData.length - 1, (5 * PI) / 4, (7 * PI) / 4) +
            circlearray[i].rotationAngle;
          text(
            wordData[j],
            circlearray[i].x + r * cos(a),
            circlearray[i].y + r * sin(a)
          );
        }
      }
    }
  }
}

function dish() {
  imageMode(CENTER);

  // cover behavior (like background-size: cover)
  const scale = max(width / Dish.width, height / Dish.height);
  const w = Dish.width * scale;
  const h = Dish.height * scale;

  image(Dish, width / 2, height / 2, w, h);
}
