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

  private createCloud(): void {
    const circleSize : number = 90;
    const gridOfCloud : number = width / 8; 
    fill(200, 150, 255);
    noStroke();
    circle(0 * gridOfCloud, height +20, circleSize);
    circle(1 * gridOfCloud, height, circleSize);
    circle(2 * gridOfCloud, height -10, circleSize);
    circle(3 * gridOfCloud, height -15, circleSize);
    circle(4 * gridOfCloud, height +10, circleSize);
    circle(5 * gridOfCloud, height -20, circleSize);
    circle(6 * gridOfCloud, height -10, circleSize);
    circle(7 * gridOfCloud, height +10, circleSize);
    circle(8 * gridOfCloud, height -10, circleSize);
    
    if(width > 460){
        circle(0.5 * gridOfCloud, height +5, circleSize);
        circle(1.5 * gridOfCloud, height -10, circleSize);
        circle(2.5 * gridOfCloud, height +10, circleSize);
        circle(3.5 * gridOfCloud, height +5, circleSize);
        circle(4.5 * gridOfCloud, height -10, circleSize);
        circle(5.5 * gridOfCloud, height +10, circleSize);
        circle(6.5 * gridOfCloud, height -10, circleSize);
        circle(7.5 * gridOfCloud, height +10, circleSize);
    }
  }

  public updateLevel(): void {}

  public drawLevel(): void {
      this.createCloud()
  }
}
  // public removeItem(item:ite)