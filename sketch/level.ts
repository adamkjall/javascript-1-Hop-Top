class Level {
  private _levelProgress: number;
  private _levelObjects: GameObject[];
  private effectList: Effect[];
  private isLevelDone: boolean;
  private speed: number;
  private startColor: p5.Color;
  private endColor: p5.Color;


  constructor(gameObjects: GameObject[], startColor: p5.Color, endColor: p5.Color ) {
    this._levelProgress = 0;
    this._levelObjects = gameObjects;
    this.effectList = [];
    this.isLevelDone = false;
    this.speed = 3.5;
    this.startColor = startColor;
    this.endColor = endColor;
  }

  public updateLevel(): void {
    this.isLevelDone = this.checkIfLevelIsDone();
    if (this.isLevelDone) {
      this._levelProgress = 100;
      return;
    }

    const mapLength: number = this.levelObjects.length - 10;
    const progressStep: number = 100 / mapLength;
    let numberOfBlocksPassed: number = 0;

    for (let obj of this._levelObjects) {
      obj.pos.y += this.speed;

      if (obj instanceof Block && obj.pos.y >= height) {
        numberOfBlocksPassed++;
        this._levelProgress = numberOfBlocksPassed * progressStep;
      }
    }
  }

  public updateEffects(): void {
    for (const effect of this.effectList) {
      effect.move();
    }
  }

  public drawLevel(): void {
    const startColorStr = this.startColor.toString();
    const endColorStr = this.endColor.toString();

    const startColorArr = startColorStr.slice(5, str.length - 3).split(",")
    const endColorArr = endColorStr.slice(5, str.length - 3).split(",")
    
    const startR = Number(startColorArr[0]);
    const startG = Number(startColorArr[1]);
    const startB = Number(startColorArr[2]);
    const endR = Number(endColorArr[0]);
    const endG = Number(endColorArr[1]);
    const endB = Number(endColorArr[2]);

    const r: number = map(this.levelProgress, 0, 100, startR, endR);
    const g: number = map(this.levelProgress, 0, 100, startG, endG);
    const b: number = map(this.levelProgress, 0, 100, startB, endB);

    background(r, g, b);

    for (let object of this._levelObjects) {
      if (object instanceof FragileBlock) {
        if (!object.isDestroyed) object.draw();
      } else {
        object.draw();
      }
    }

    this.effectList.forEach((effect, i) => {
      effect.draw();
      if (effect.pos.y >= height) this.effectList.splice(i, 1);
    });

    const cloudPosY = this.levelObjects[0].pos.y;
    this.createCloud(cloudPosY);
  }

  private createCloud(y: number): void {
    const circleSize: number = 90;
    const gridOfCloud: number = width / 8;
    push();
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
    pop();
  }

  private checkIfLevelIsDone(): boolean {
    const lastObject = this.levelObjects[this.levelObjects.length - 1];
    return lastObject.pos.y >= height - 300;
  }

  public pickUpItem(objectToRemove: Item) {
    this._levelObjects = this.levelObjects.filter(
      object => object !== objectToRemove
    );
    const pickUpEffect = new Effect(objectToRemove.pos, objectToRemove.points);
    this.effectList.push(pickUpEffect);
  }
  
  public get levelObjects(): GameObject[] {
    return this._levelObjects;
  }

  public get levelProgress(): number {
    return this._levelProgress;
  }
}
