var c = document.getElementById("rain");

c.width = window.innerWidth;
c.height = window.innerHeight;

var ctx = c.getContext("2d");

let pluginName = "raindrop",
  defaults = {
    length : 30,
    speed : 15,
    // Gradient from top to Bottom
    startColor : "#00a8ff",
    middleColor : "#00a8ff",
    endColor : "white",
  };

let rainDrops = [];
let elements = document.getElementsByClassName("raindrop");
// let length = defaults.length;
// let speed = defaults.speed;

let angle = 90 * Math.PI / 180;
let angleSin = Math.sin(angle);
let angleCos = Math.cos(angle);

let spawnInterval = setInterval(newDrop, 50);

window.addEventListener("resize", onResize);

document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    clearInterval(spawnInterval);
  } else {
    spawnInterval = setInterval(newDrop, 50);
  }
});

function RainDrop(x, y, angle) {
  this.x = x;
  this.y = y;
  rainDrops.push(this);
}

function newDrop() {
  for (let x = 0; x < 50; x++) {
    new RainDrop(Math.random() * c.width, -40 - 100 * Math.random(), angle);
  }
}

update();

function update() {
  for (let x = 0; x < rainDrops.length; x++) {
    let drop = rainDrops[x];
    drop.x += defaults.speed * angleCos;
    drop.y += defaults.speed * angleSin;

    drop.endX = drop.x + defaults.length * angleCos;
    drop.endY = drop.y + defaults.length * angleSin;

    if (drop.y > c.height) {
      rainDrops.splice(x, 1);
      x--;
    }
  }

  //checkCollisions();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#0984e3";

  let gradient = ctx.createLinearGradient(0, 0, 0, c.height);

  gradient.addColorStop(0, defaults.startColor);
  gradient.addColorStop(0.6, defaults.middleColor);
  gradient.addColorStop(1, defaults.endColor);

  ctx.strokeStyle = gradient;

  ctx.beginPath();
  for (let i = 0; i < rainDrops.length; i++) {
    ctx.moveTo(Math.floor(rainDrops[i].x), Math.floor(rainDrops[i].y));
    ctx.lineTo(Math.floor(rainDrops[i].endX), Math.floor(rainDrops[i].endY));
  }
  ctx.stroke();

  clearRegions();
  window.requestAnimationFrame(update);
}

function onResize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function clearRegions() {
  ctx.globalCompositeOperation = "destination-out";

  for (let i = 0; i < elements.length; i++) {
    let boundingBox = elements[i].getBoundingClientRect();
    let yDistanceBottom = c.height - boundingBox.bottom;
    let yDistanceTop = c.height - boundingBox.top;

    let bottomLeftX =
      boundingBox.left + yDistanceBottom * Math.tan(Math.PI / 2 - angle);
    let bottomRightX =
      boundingBox.right + yDistanceBottom * Math.tan(Math.PI / 2 - angle);

    let bottomLeftX2 =
      boundingBox.left + yDistanceTop * Math.tan(Math.PI / 2 - angle);
    let bottomRightX2 =
      boundingBox.right + yDistanceTop * Math.tan(Math.PI / 2 - angle);

    //From bottom of element to edge of page
    ctx.beginPath();
    ctx.moveTo(boundingBox.left, boundingBox.bottom);
    ctx.lineTo(bottomLeftX, c.height);
    ctx.lineTo(bottomRightX, c.height);
    ctx.lineTo(boundingBox.right, boundingBox.bottom);
    ctx.closePath();
    ctx.fill();

    //From top of element to edge of page
    ctx.beginPath();
    ctx.moveTo(boundingBox.left, boundingBox.top);
    ctx.lineTo(bottomLeftX2, c.height);
    ctx.lineTo(bottomRightX2, c.height);
    ctx.lineTo(boundingBox.right, boundingBox.top);
    ctx.closePath();
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";
}
