let webs = [];
let circle = [];
const webNum = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //angleMode(DEGREES);
  for (let i = 0; i < webNum; i++) {
    webs[i] = new Web(random(0, width * 2), random(0, height * 2));
  }
  circle[0] = new Circle(width / 2, height / 2, 400);
}

function draw() {
  // circle[0].display();
  // circle[0].move();
  for (w of webs) {
    w.display();
    w.move();
  }
  //ellipse(width / 2, height / 2, 100, 100);
}

class Web {
  constructor(x, y) {
    this.position = new createVector(x, y);
    this.w = 20;
    this.h = 20;
    this.r = 1;
    this.xoff = random(0.0, 100.0);
    this.n;
    this.angle = [0.0, 0.0];
    this.inc = [0.0001, 0.0005];
    this.sN = [];
    this.grey = [255, 0];
  }
  display() {
    stroke(this.grey[0]);
    strokeWeight(0.5);
    line(
      this.position.x - this.n,
      this.position.y - this.n,
      width * sin(this.angle[0]),
      height
    );
    stroke(this.grey[1]);
    strokeWeight(0.5);
    line(
      this.position.x + this.n,
      this.position.y + this.n,
      width * sin(this.angle[1]),
      0
    );
  }
  move() {
    this.xoff += 0.001;
    this.n = map(noise(this.xoff), 0.0, 1.0, 0.0, 1000.0);
    this.sN[0] = noise(this.xoff);
    this.angle[0] += this.inc[0];
    this.angle[1] += this.inc[1];
    this.grey[0] = map(this.angle[0], 0.0, 1.0, 0, 255);
    //this.grey[1] = map(this.angle[1], 0.0, 1.0, 255, 0);

    //this.position.rotate(this.inc[0]);
  }
}

class Circle {
  constructor(x, y, size) {
    this.position = new createVector(x, y);
    this.r = 400;
    this.size = size;
    this.grey = [0, 0];
    this.angle = [0.0, 0.0];
    this.inc = [0.001, 0.003];
  }
  display() {
    stroke(this.grey[0]);
    //fill(this.grey[1]);
    fill(0);
    ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
  }
  move() {
    this.grey[0] = map(sin(this.angle[0]), 0.0, 1.0, 150, 255);
    this.angle[0] += this.inc[0];
    this.grey[1] = map(sin(this.angle[1]), 0.0, 1.0, 0, 100);
    this.angle[1] += this.inc[1];
    this.r =
      map(sin(this.angle[0]), 0.0, 1.0, 300, this.size) +
      map(sin(this.angle[1]), 0.0, 1.0, 10, 0);
  }
}
