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

  private createCloude(): void {
    fill(200, 150, 255);
    noStroke();
    circle(25, height + 20, 90);
    circle(90, height, 90);
    circle(140, height - 10, 90);
    circle(200, height - 15, 90);
    circle(255, height + 10, 90);
    circle(330, height - 20, 90);
    circle(395, height - 10, 90);
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
            this.createCloude();
            break loop2;
          case 2:
            const block = new GameObject(
              x * xStepSize,
              y * yStepSize,
              xStepSize,
              10
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
