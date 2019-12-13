class Position {
  private _x : number;
  private _y : number;

  constructor(x : number, y : number) {
    this._x = x;
    this._y = y;
  }

  public get x() : number {
    return this._x;
  }

  public get y() : number {
    return this._y;
  }

  public set x(newX) {
    this._x = newX;
  }

  public set y(newY) {
    this._y = newY;
  }
}