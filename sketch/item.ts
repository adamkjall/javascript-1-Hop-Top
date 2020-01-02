class Item extends GameObject {
  private _points: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: p5.Image,
    points: number
  ) {
    super(x, y, width, height, image);
    this._points = points;
  }

  public get points(): number {
    return this._points;
  }
}
