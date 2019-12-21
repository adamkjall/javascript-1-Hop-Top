class Level {
  // private highScoreAnimation: animation;
  private maxBlockWidth: number;
  private minBlockWidth: number;
  private _levelProgress: number;
  private _levelObjects: GameObject[];
  private isLevelDone: boolean;

  constructor(gameObjects: GameObject[]) {
    this.maxBlockWidth = 100;
    this.minBlockWidth = 20;
    this._levelProgress = 0;
    this._levelObjects = gameObjects;
    this.isLevelDone = false;
  }

  private createCloud(y : number): void {
    const circleSize: number = 90;
    const gridOfCloud: number = width / 8;
    fill(200, 150, 255);
    noStroke();
    circle(0 * gridOfCloud, y + 20, circleSize);
    circle(1 * gridOfCloud, y, circleSize);
    circle(2 * gridOfCloud, y - 10, circleSize);
    circle(3 * gridOfCloud, y - 15, circleSize);
    circle(4 * gridOfCloud, y + 10, circleSize);
    circle(5 * gridOfCloud, y - 20, circleSize);
    circle(6 * gridOfCloud, y - 10, circleSize);
    circle(7 * gridOfCloud, y + 10, circleSize);
    circle(8 * gridOfCloud, y - 10, circleSize);

    if (width > 460) {
      circle(0.5 * gridOfCloud, y + 5, circleSize);
      circle(1.5 * gridOfCloud, y - 10, circleSize);
      circle(2.5 * gridOfCloud, y + 10, circleSize);
      circle(3.5 * gridOfCloud, y + 5, circleSize);
      circle(4.5 * gridOfCloud, y - 10, circleSize);
      circle(5.5 * gridOfCloud, y + 10, circleSize);
      circle(6.5 * gridOfCloud, y - 10, circleSize);
      circle(7.5 * gridOfCloud, y + 10, circleSize);
    }
  }

  private checkIfLevelIsDone(): boolean {
    const lastObject = this.levelObjects[this.levelObjects.length - 1];
    return lastObject.pos.y >= height - 300;
  }
  
  public updateLevel(): void {
    this.isLevelDone = this.checkIfLevelIsDone();

    if (this.isLevelDone) {
      this._levelProgress = 100;
      return;
    };
    
    const mapLength: number = this.levelObjects.length - 10;
    const progressStep: number = 100 / mapLength;
    let numberOfBlocksPassed: number = 0;

    for (let obj of this._levelObjects) {
      obj.pos.y += 1.5;
      
      if (obj.pos.y >= height){
        numberOfBlocksPassed++;
        this._levelProgress = numberOfBlocksPassed * progressStep;
      } 
      

    }
  }

  public drawLevel(): void {
    for (let object of this._levelObjects) {
      object.drawObject();
    }
    const cloudPosY = this.levelObjects[0].pos.y;
    this.createCloud(cloudPosY ); 
  }

  public get levelObjects(): Block[] {
    return this._levelObjects;
  }

  public get levelProgress(): number {
    return this._levelProgress;
  }
}
