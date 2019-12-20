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
    speed: number = .5,
    diameter: number = 55
  ) {
    this.position = new Position(x, y);
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.speed = speed;
    this.diameter = diameter;
    this.bouncePower = 16.5;
    this.maxSpeed = 8;
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
    
    // bounce on ground
    if (this.position.y + this.diameter / 2 >= height) {
      this.position.y = height - this.diameter / 2;
      this.yVelocity = 0;
      this.yVelocity -= this.bouncePower;
    }

    
    this.position.x += this.xVelocity;
    this.position.y += this.yVelocity;
    this.gravity();
    this.xVelocity *= 0.95; // friction

    const isOutsideRightEdge = this.position.x > width - this.diameter / 2;
    if (isOutsideRightEdge) {
      const endOfScreen = width - this.diameter / 2;
      this.position.x = endOfScreen;
    }
    if (this.position.x < this.diameter / 2) {
      this.position.x = this.diameter / 2;
    }
  }

  public bounceOnBlock(pos : Position) : void {
    if (this.yVelocity > 0) {
      this.pos.y = pos.y - this.radius;
      this.yVelocity = 0;
      this.yVelocity -= this.bouncePower;
    }
  }

  private gravity(): void {
    this.yVelocity += 0.7;
  }

  public drawPlayer(): void {
    stroke("rgb(255,171,194)");
    strokeWeight(20);
    fill("rgb(38,48,86)");
    circle(this.position.x, this.position.y, this.diameter);
  }

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }

  public get pos() {
    return this.position;
  }

  public get radius() {
    return this.diameter / 2;
  }
}
