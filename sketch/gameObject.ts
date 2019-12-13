class gameObject {
  private position: Position;
  private width: number;
  private height: number;
  private sprite: string;

  constructor(
    position: Position,
    width: number,
    height: number,
    sprite: string
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  }

  public drawObject(): void {}

  public update(): void {}

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
