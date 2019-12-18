class GameObject {
  private position: Position;
  private _width: number;
  private _height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.position = new Position(x,y);
    this._width = width;
    this._height = height;
  }

  public drawObject(): void {
    push()
    image(
      imgSolid,
      this.position.x,
      this.position.y,
      this._width,
      this._height
      )
    pop()
  }

  public update(): void {}

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }

  public get width(): number {
    return this._width
}
public get height() : number {
    return this._height
}

public get pos() {
  return this.position;
}
}
