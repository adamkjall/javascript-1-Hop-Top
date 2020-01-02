class Effect extends GameObject {
  private text: string;
  private gravity: number;
  private velocity: p5.Vector;

  constructor(pos: Position, points: number) {
    super(pos.x, pos.y, 0, 0);
    this.text = points > 0 ? "+" : "";
    this.text += points.toString();
    this.gravity = .15;
    this.velocity = createVector(random(-2, 2), -4);
  }

  public drawObject(): void {
    push();
    fill("yellow");
    stroke("black");
    strokeWeight(5);
    textSize(24);
    const offset = 20;
    text(
      this.text,
      this.position.x + offset,
      this.position.y + offset
    );  

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.velocity.y += this.gravity;
    pop();
  }
}
