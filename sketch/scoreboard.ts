class Scoreboard {
  public draw(score: number, highscore: number, level: number): void {
    this.drawBoard();
    this.drawText();
    this.drawPoints(score, highscore, level);
  }

  private drawText(): void {
    push();
    textFont(font);
    fill(0, 10, 153);
    textSize(22);
    text("Level", 285, 35);
    text("High Score", 85, 55);
    text("Score", 430, 55);
    pop();
  }

  private drawPoints(score: number, highscore: number, level: number) {
    push();
    fill(255, 255, 255);
    textSize(18);
    text(highscore, 90, 75);
    text(score, 430, 75);
    textSize(62);
    textAlign(CENTER);
    text(level, 300, 90);
    pop();
  }

  private drawBoard(): void {
    push();
    let c: p5.Color = color(252, 208, 107);
    stroke(c);
    fill(c);
    circle(300, 60, 100);
    strokeWeight(50);
    line(75, 60, 525, 60);
    pop();
  }
}
