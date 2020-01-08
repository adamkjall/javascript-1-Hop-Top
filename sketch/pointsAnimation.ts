class PointsAnimation {
  private _pos: Position;
  private points: number;
  private gravity: number;
  private velocity: p5.Vector;

  constructor(pos: Position, points: number) {
    this._pos = pos;
    this.points = points;
    this.gravity = 0.2;
    this.velocity = createVector(random(-1, 1), -2);
  }

  public draw(): void {
    const str = this.points > 0 ? `+${this.points}` : this.points;
    const color = this.points < 0 ? "red" : "yellow";
    push();
    fill(color);
    stroke("black");
    strokeWeight(5);
    textSize(24);
    const offset = 20; // center the text relative to the item
    text(str, this._pos.x + offset, this._pos.y + offset);
    pop();
  }

  public move() {
    this._pos.y += this.velocity.y;
    this._pos.x += this.velocity.x;
    this.velocity.y += this.gravity;
  }

  public get pos() {
    return this._pos;
  }

  public set pos(newPos :Position) {
    this._pos = newPos;
  }
}
