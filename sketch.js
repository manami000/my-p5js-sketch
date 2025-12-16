function handlePress(x, y) {
  if (showText) showText = false;

  if (x >= 50 && x <= 600 && y >= 50 && y <= 600) {
    circleposX = x;
    circleposY = y;
    increase = 0;

    circlecolor = color(
      random(230, 290),
      random(200, 300),
      random(120, 250),
      opacityDish
    );

    let maxincrease = random(50, 250);

    circlearray.push({
      x: circleposX,
      y: circleposY,
      color: circlecolor,
      increase: increase,
      maxincrease: maxincrease + 10,
      createdAt: millis(),
      opacity: opacityDish,
      rotationAngle: 0,
    });

    circlearray.push({
      x: circleposX,
      y: circleposY,
      color: color(
        random(200, 250),
        random(200, 300),
        random(100, 230),
        opacityDish
      ),
      increase: increase,
      maxincrease: maxincrease,
      createdAt: millis(),
      opacity: opacityDish,
      hasText: random(1) < 0.5,
      rotationAngle: 0,
    });
  }
}

function mousePressed() {
  handlePress(mouseX, mouseY);
}

function touchStarted() {
  if (touches && touches.length) {
    handlePress(touches[0].x, touches[0].y);
  } else {
    handlePress(mouseX, mouseY);
  }
  return false; // prevents page scroll on iOS
}
