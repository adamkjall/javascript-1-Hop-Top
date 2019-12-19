class SpeedBoost extends GameObject {
  private _img: p5.Image;
  private _exploded: boolean = false;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: p5.Image
  ) {
    super(x, y, width, height);
    this._img = image;
  }

  public drawObject(): void {
    if (this._exploded) {
      return;
    }
    push();
    image(
      this._img,
      this.position.x,
      this.position.y,
      this._width,
      this._height
    );
    pop();
  }

  public explode(): void {
    if (this._exploded) {
      return;
    }
    this._exploded = true;
  }
<<<<<<< HEAD

=======
>>>>>>> SuperBoost
}
