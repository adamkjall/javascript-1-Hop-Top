type LevelMap = number[][];

class LevelFactory {
  createLevel(level: number): Level {
    switch (level) {
      case 1:
        return this.levelOne();
      case 2:
        return this.levelTwo();
      case 3:
        return this.levelThree();
      default:
        return this.levelOne();
    }
  }

  createLevelObject(levelMap: LevelMap): GameObject[] {
    const levelObjects: GameObject[] = [];
    const xStepSize: number = width / levelMap[0].length;

    for (let y = 0; y < levelMap.length; y++) {
      for (let x = 0; x < levelMap[0].length; x++) {
        const cell = levelMap[levelMap.length - 1 - y][x];
        switch (cell) {
          case 1:
            // clouds
            break;
          case 2:
            const block = new Block(
              x * xStepSize,
              y * -100 + height,
              xStepSize,
              20
            );
            levelObjects.push(block);
            break;
          case 5:
            // bonus item
            const itemPresent = new Item(
              x * xStepSize,
              y * -100 + height,
              xStepSize,
              xStepSize,
              imgItemPresent,
              20
            );
            levelObjects.push(itemPresent);
            break;
          case 6:
            // bonus item
            const itemCandy = new Item(
                x * xStepSize,
                y * -100 + height,
                xStepSize,
                xStepSize,
                imgItemCandy,
                10
            );
            levelObjects.push(itemCandy);
            break;
          case 4:
            //SpeedBoost item
            const speedBoost = new SpeedBoost(
              x * xStepSize,
              y * -100 + height,
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

  levelOne(): Level {
    const levelMap: LevelMap = [
      [2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 2, 2, 0, 0, 0],
      [0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 5, 0, 0, 0, 0],
      [0, 0, 5, 0, 0, 2, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 5],
      [0, 0, 0, 0, 0, 0, 0, 5],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [0, 0, 5, 0, 0, 0, 0, 0],
      [0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 2, 0],
      [0, 0, 0, 0, 5, 0, 0, 0],
      [0, 2, 2, 0, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 0, 0, 2, 0, 0, 0],
      [5, 0, 0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [0, 0, 0, 0, 0, 5, 0, 0],
      [0, 2, 2, 0, 0, 5, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 0, 2, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 5],
      [0, 0, 0, 0, 0, 0, 2, 2],
      [0, 5, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [0, 0, 0, 0, 5, 0, 0, 0],
      [2, 2, 0, 0, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 0, 0, 0, 2, 2, 0],
      [0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 0, 2, 2, 0, 0],
      [0, 5, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 0, 0],
      [2, 2, 0, 0, 0, 5, 0, 0],
      [0, 0, 0, 0, 0, 0, 5, 0],
      [0, 0, 0, 2, 2, 0, 0, 6],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2]
    ];
    const gameObjects: GameObject[] = this.createLevelObject(levelMap);
    return new Level(gameObjects);
  }

  levelTwo(): Level {
    const levelMap: LevelMap = [
      [2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2]
    ];
    const gameObjects: GameObject[] = this.createLevelObject(levelMap);
    return new Level(gameObjects);
  }

  levelThree(): Level {
    const levelMap: LevelMap = [
      [2, 2, 2, 2, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 2, 2, 2]
    ];
    const gameObjects: GameObject[] = this.createLevelObject(levelMap);
    return new Level(gameObjects);
  }
}
