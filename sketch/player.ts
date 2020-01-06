class Player {
  private position: Position;
  private xVelocity: number;
  private yVelocity: number;
  private _speed: number;
  private diameter: number;
  private bouncePower: number = 16.5;
  private _maxSpeed: number = 8;
  private color: p5.Color = color(38, 48, 86);
  private borderColor: p5.Color = color(255, 171, 194);

  constructor(
    x: number,
    y: number,
    xVelocity: number = 0,
    yVelocity: number = 0,
    speed: number = 0.6,
    diameter: number = 65
  ) {
    this.position = new Position(x, y);
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this._speed = speed;
    this.diameter = diameter;
  }

  public move(): void {
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.xVelocity >= this._maxSpeed) this.xVelocity = this._maxSpeed;
      else this.xVelocity += this._speed;
    } else if (keyIsDown(LEFT_ARROW)) {
      if (abs(this.xVelocity) >= this._maxSpeed)
        this.xVelocity = -this._maxSpeed;
      else this.xVelocity -= this._speed;
    }

    this.position.x += this.xVelocity;
    this.position.y += this.yVelocity;
    this.gravity();
    this.xVelocity *= 0.95; // friction

    const collisionWithRightWall = this.position.x > width - this.diameter / 2;
    const collisionWithLeftWall = this.position.x < this.diameter / 2;
    if (collisionWithRightWall) {
      this.position.x = width - this.diameter / 2;
      this.xVelocity = -this.xVelocity * 0.8;
    } else if (collisionWithLeftWall) {
      this.position.x = this.diameter / 2;
      this.xVelocity = -this.xVelocity * 0.8;
    }
  }

  public bounceOnBlock(pos: Position): void {
    if (this.yVelocity > 0) {
      this.pos.y = pos.y - this.radius - 1;
      this.yVelocity = 0;
      this.yVelocity -= this.bouncePower;
    }
  }

  private gravity(): void {
    this.yVelocity += 0.7;
  }

  public drawPlayer(): void {
    push();
    // outer circle
    stroke(this.borderColor);
    const outerCircleSize = this.diameter / 3.5;

    strokeWeight(outerCircleSize);
    // inner circle
    fill(this.color);
    circle(this.position.x, this.position.y, this.diameter - outerCircleSize);
    pop();
  } 

  /**
   * Change color of the player and returns the old colors
   * @param color new main color
   * @param borderColor new border color
   */
  public changeColor(color: p5.Color, borderColor: p5.Color) : [p5.Color, p5.Color] {
    const oldColor = this.color;
    const oldBorderColor = this.borderColor;
    this.color = color;
    this.borderColor = borderColor;
    return [oldColor, oldBorderColor];
  }

  public get pos() {
    return this.position;
  }

  public set pos(pos: Position) {
    this.position = pos;
  }

  public get radius() {
    return this.diameter / 2;
  }

  public get speed() {
    return this._speed;
  }

  public set speed(newSpeed: number) {
    this._speed = newSpeed;
  }

  public get maxSpeed() {
    return this._maxSpeed;
  }

  public set maxSpeed(newMaxSpeed: number) {
    this._maxSpeed = newMaxSpeed;
  }

 
}
