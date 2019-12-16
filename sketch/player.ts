class player {
  private xVelocity: number;
  private yVelocity: number;
  private speed: number;
  private position: Position;
  private width: number;
  private height: number;

  constructor(
    xVelocity: number,
    yVelocity: number,
    speed: number,
    position: Position,
    width: number,
    height: number
  ) {
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.speed = speed;
    this.position = position;
    this.width = width;
    this.height = height;
  }

  public autoBounce(): void {}

  public moveLeft(): void {}

  public moveRight(): void {}

  private gravity(): void {}

  public drawPlayer(): void {}

  public update(): void {}

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
