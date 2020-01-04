abstract class GameObject {
  protected position: Position;
  protected _width: number;
  protected _height: number;
  protected image: p5.Image;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: p5.Image
  ) {
    this.position = new Position(x, y);
    this._width = width;
    this._height = height;
    this.image = image;
  }

  public draw (): void {
    push();
    image(
      this.image,
      this.position.x,
      this.position.y,
      this._width,
      this._height
    );
    pop();
  }

  // public abstract update(): void

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public set pos(newPosition: Position) {
    this.position = newPosition;
  }

  public get pos() {
    return this.position;
  }
}
