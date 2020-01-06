class Level {
  private _levelProgress: number;
  private _levelObjects: GameObject[];
  private effectList: Effect[];
  private isLevelDone: boolean;
  private speed: number;
  private r: p5.Color
  private g: p5.Color
  private b: p5.Color


  constructor(gameObjects: GameObject[]) {
    this._levelProgress = 0;
    this._levelObjects = gameObjects;
    this.effectList = [];
    this.isLevelDone = false;
    this.speed = 3.5;
    this.r = new p5.Color
    this.g = new p5.Color
    this.b = new p5.Color
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
    for (let object of this._levelObjects) {
      object.draw();

      const r: number = map(this.levelProgress, 0, 100, 120, 60);
      const b: number = map(this.levelProgress, 0, 100, 170, 110);
      const g: number = map(this.levelProgress, 0, 100, 235, 200);
      background(r, b, g);
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

  public get levelObjects(): Block[] {
    return this._levelObjects;
  }

  public get levelProgress(): number {
    return this._levelProgress;
  }
}
