class Player {
  private position: Position;
  private xVelocity: number;
  private yVelocity: number;
  private speed: number;
  private diameter: number;
  private bouncePower: number;
  private maxSpeed: number;

  constructor(
    x: number,
    y: number,
    xVelocity: number = 0,
    yVelocity: number = 0,
    speed: number = 1,
    diameter: number = 80
  ) {
    this.position = new Position(x, y);
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.speed = speed;
    this.diameter = diameter;
    this.bouncePower = 20;
    this.maxSpeed = 10;
  }

  public autoBounce(): void {}

  public move(): void {
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.xVelocity >= this.maxSpeed) this.xVelocity = this.maxSpeed;
      else this.xVelocity += this.speed;
    } else if (keyIsDown(LEFT_ARROW)) {
      if (abs(this.xVelocity) >= this.maxSpeed) this.xVelocity = -this.maxSpeed;
      else this.xVelocity -= this.speed;
    }
    

    if (this.position.y + this.diameter / 2 >= height) {
      this.yVelocity -= this.bouncePower;
    }

    
    this.position.x += this.xVelocity;
    this.position.y += this.yVelocity;
    this.gravity();
    this.xVelocity *= 0.95; // friction

    if (this.position.y + this.diameter / 2 >= height) {
      this.position.y = height - this.diameter / 2;
      this.yVelocity = 0;
    }

    const isOutsideRightEdge = this.position.x > width - this.diameter / 2;
    if (isOutsideRightEdge) {
      const endOfScreen = width - this.diameter / 2;
      this.position.x = endOfScreen;
    }
    if (this.position.x < this.diameter / 2) {
      this.position.x = this.diameter / 2;
    }
  }

  private gravity(): void {
    this.yVelocity += 0.7;
  }

  public drawPlayer(): void {
    noStroke();
    fill("pink");
    circle(this.position.x, this.position.y, this.diameter);
  }

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
