class Player {
  private xVelocity: number;
  private yVelocity: number;
  private speed: number;
  private position: Position;
  private width: number;
  private height: number;

  constructor(
    x: number,
    y: number,
    xVelocity: number = 0,
    yVelocity: number = 0,
    speed: number = 1,
    width: number = 80,
    height: number = 80
  ) {
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.speed = speed;
    this.position = new Position(x, y);
    this.width = width;
    this.height = height;
  }

  public autoBounce(): void {}

  public move(): void {
    if (keyIsDown(RIGHT_ARROW)) {
      this.xVelocity > 3 ? (this.xVelocity = 2.9) : (this.xVelocity += 0.5);
    } else if (keyIsDown(LEFT_ARROW)) {
      this.xVelocity > 3 ? (this.xVelocity = 2.9) : (this.xVelocity -= 0.5);
    }

    this.position.x += this.xVelocity;
    this.gravity();
    this.xVelocity *= 0.9; // friction

    const isOutsideRightEdge = this.position.x > width - this.width / 2;
    if (isOutsideRightEdge) {
      const endOfScreen = width - this.width / 2;
      this.position.x = endOfScreen;
    }
    if (this.position.x < this.width / 2) {
      this.position.x = this.width / 2;
    }

  }

  private gravity(): void {
    this.position.y += 3;
    if (this.position.y > height -
      this.width / 2) {
      this.position.y = height -
          this.width / 2;
    }

  }

  public drawPlayer(): void {
    noStroke();
    fill("pink");
    circle(this.position.x, this.position.y, this.width);
  }


  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
