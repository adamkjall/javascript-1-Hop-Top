class Level {
  // private highScoreAnimation: animation;
  private maxBlockWidth: number;
  private minBlockWidth: number;
  private levelProgress: number;
  private levelMap: LevelMap;
  private levelObjects: GameObject[];

  constructor(levelMap: LevelMap) {
    this.maxBlockWidth = 100;
    this.minBlockWidth = 20;
    this.levelProgress = 0;
    this.levelMap = levelMap;
    this.levelObjects = this.createLevelObject();
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
    // this.createCloude();
    this.drawMap();
  }
  
  private drawMap(): void {
    for (let object of this.levelObjects) {
      object.drawObject();
    }
    this.createCloud();
  }

  private createLevelObject(): GameObject[] {
    const levelObjects: GameObject[] = [];
    const xStepSize: number = width / this.levelMap[0].length;

    const yStepSize: number = height / this.levelMap.length;

    loop1: for (let y = 0; y < this.levelMap.length; y++) {
      loop2: for (let x = 0; x < this.levelMap[0].length; x++) {
        const cell = this.levelMap[y][x];
        switch (cell) {
          case 1:     
          // clouds       
            break loop2;
          case 2:
            const block = new GameObject(
              x * xStepSize,
              y * yStepSize,
              xStepSize,
              20
            );
            levelObjects.push(block);
            break;
        }
      }
    }
    return levelObjects;
  }
}
// public removeItem(item:ite)
