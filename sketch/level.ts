class Level {
 
  // private highScoreAnimation: animation;
  private maxBlockWidth: number;
  private minBlockWidth: number;
  private levelProgress: number;

  constructor(
    // highScoreAnimation: animation;
    maxBlockwidth: number = 100,
    minBlockWidth: number = 20
  ) {
    this.maxBlockWidth = maxBlockwidth;
    this.minBlockWidth = minBlockWidth;
    this.levelProgress = 0;
  }

  public isLevelDone(): Boolean {
    return true;
  }

  private createCloude(): void {
    fill(200, 150, 255);
    noStroke();
    circle(25, height +20, 90);
    circle(90, height, 90);
    circle(140, height -10, 90);
    circle(200, height -15, 90);
    circle(255, height +10, 90);
    circle(330, height -20, 90);
    circle(395, height -10, 90);
  }

  public updateLevel(): void {}

  public drawLevel(): void {
      this.createCloude()
  }
}
  // public removeItem(item:ite)