class GameObject {
  private position: Position;
  private width: number;
  private height: number;

  constructor(
    position: Position,
    width: number,
    height: number,
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  public drawObject(): void {}

  public update(): void {}

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
