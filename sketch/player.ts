class Player {
  private position: Position;
  private xVelocity: number;
  private yVelocity: number;
  private _speed: number;
  private diameter: number;
  private bouncePower: number;
  private maxSpeed: number;

  constructor(
    x: number,
    y: number,
    xVelocity: number = 0,
    yVelocity: number = 0,
    speed: number = .5,
    diameter: number = 65
  ) {
    this.position = new Position(x, y);
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this._speed = speed;
    this.diameter = diameter;
    this.bouncePower = 16.5;
    this.maxSpeed = 8;
  }

  public move(): void {
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.xVelocity >= this.maxSpeed) this.xVelocity = this.maxSpeed;
      else this.xVelocity += this._speed;
    } else if (keyIsDown(LEFT_ARROW)) {
      if (abs(this.xVelocity) >= this.maxSpeed) this.xVelocity = -this.maxSpeed;
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

  public bounceOnBlock(pos : Position) : void {
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
    stroke("rgb(255,171,194)");
    const outerCircleSize = this.diameter / 3.5;
    
    strokeWeight(outerCircleSize);
    // inner circle
    fill("rgb(38,48,86)");
    circle(this.position.x, this.position.y, this.diameter - outerCircleSize);
    pop();
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
}
