class FragileBlock extends GameObject {
  private _isDestroyed: boolean = false;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: p5.Image = imgFragile
  ) {
    super(x, y, width, height, image);
  }

  public destroy() {
    this._isDestroyed = true;
  }

  get isDestroyed() {
    return this._isDestroyed;
  }
}
