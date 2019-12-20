class Level {
  // private highScoreAnimation: animation;
  private maxBlockWidth: number;
  private minBlockWidth: number;
  private _levelProgress: number;
  private levelMap: LevelMap;
  private _levelObjects: GameObject[];

  constructor(levelMap: LevelMap) {
    this.maxBlockWidth = 100;
    this.minBlockWidth = 20;
    this._levelProgress = 0;
    this.levelMap = levelMap;
    this._levelObjects = this.createLevelObject();
  }

  public isLevelDone(): Boolean {
    return true;
  }

  private createCloud(): void {
    const circleSize: number = 90;
    const gridOfCloud: number = width / 8;
    fill(200, 150, 255);
    noStroke();
    circle(0 * gridOfCloud, height + 20, circleSize);
    circle(1 * gridOfCloud, height, circleSize);
    circle(2 * gridOfCloud, height - 10, circleSize);
    circle(3 * gridOfCloud, height - 15, circleSize);
    circle(4 * gridOfCloud, height + 10, circleSize);
    circle(5 * gridOfCloud, height - 20, circleSize);
    circle(6 * gridOfCloud, height - 10, circleSize);
    circle(7 * gridOfCloud, height + 10, circleSize);
    circle(8 * gridOfCloud, height - 10, circleSize);

    if (width > 460) {
      circle(0.5 * gridOfCloud, height + 5, circleSize);
      circle(1.5 * gridOfCloud, height - 10, circleSize);
      circle(2.5 * gridOfCloud, height + 10, circleSize);
      circle(3.5 * gridOfCloud, height + 5, circleSize);
      circle(4.5 * gridOfCloud, height - 10, circleSize);
      circle(5.5 * gridOfCloud, height + 10, circleSize);
      circle(6.5 * gridOfCloud, height - 10, circleSize);
      circle(7.5 * gridOfCloud, height + 10, circleSize);
    }
  }

  public updateLevel(playerPos: Position): void {
    const length: number = this.levelObjects.length;
    const progressSize: number = length / 100;
    let numberOfBlocksPassed: number = 0;

    this.levelObjects.forEach(obj => {
      // if(playerPos.y < 500) {
      obj.pos.y += 1.5;
      // }
      if (obj.pos.y > height) numberOfBlocksPassed++;
    });

    this._levelProgress = numberOfBlocksPassed * progressSize;
  }

  public drawLevel(): void {
    this.drawMap();
  }

  private drawMap(): void {
    for (let object of this._levelObjects) {
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
        const cell = this.levelMap[this.levelMap.length - 1 - y][x];
        switch (cell) {
          case 1:
            // clouds
            break loop2;
          case 2:
            const block = new GameObject(
              x * xStepSize,
              y * -100 + height - 100,
              xStepSize,
              20
            );
            levelObjects.push(block);
            break;
          case 5:
            // bonus item
            const item = new Item(
              x * xStepSize,
              y * -100 + height - 100,
              xStepSize,
              xStepSize,
              imgItemStar
            );
            levelObjects.push(item);
            break;
            case 4:
            //SpeedBoost item
            const speedBoost = new SpeedBoost(
              x * xStepSize,
              y * -100 + height - 100,
              xStepSize,
                xStepSize,
              imgSpeedBoost
            );
            levelObjects.push(speedBoost);
            break;
        }
      }
    }
    return levelObjects;
  }

  public get levelObjects(): Block[] {
    return this._levelObjects;
  }

  public get levelProgress(): number {
    return this._levelProgress;
  }
}
