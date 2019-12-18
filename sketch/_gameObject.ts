class GameObject {
  private position: Position;
  private width: number;
  private height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.position = new Position(x,y);
    this.width = width;
    this.height = height;
  }

  public drawObject(): void {
    push()
    image(
      imgSolid,
      this.position.x,
      this.position.y,
      this.width,
      this.height
      )
    pop()
  }

  public update(): void {}

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
