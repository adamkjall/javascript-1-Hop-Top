class GameController {
  private levelFactory: LevelFactory;
  private level: Level;
  private player: Player;
  private collisionDetection: CollisionDetection;
  private score: number;
  private highScore: number;
  private levelNumber: number;
  private isStartingNextLevel: boolean;
  private countDown: number;
  private isStartGame: boolean;
  private isGameOver: boolean;
  private playButton: p5.Element | undefined;
  private quitButton: p5.Element | undefined;
  private startScreen: StartScreen | undefined;
  private scoreboard: Scoreboard;

  constructor(showStartScreen: boolean = true) {
    this.score = 0;
    const localStorageHighscore = localStorage.getItem("highscore");
    const highscoreObj = localStorageHighscore
      ? JSON.parse(localStorageHighscore)
      : {};
    const highscoreArray = Object.keys(highscoreObj).map(
      key => highscoreObj[key]
    );
    this.highScore = highscoreArray.length ? Math.max(...highscoreArray) : 0;
    this.levelNumber = 1;
    this.levelFactory = new LevelFactory();
    this.level = this.levelFactory.createLevel(this.levelNumber);
    this.player = new Player(width / 2, height - 100);
    this.collisionDetection = new CollisionDetection();
    this.isStartingNextLevel = false;
    this.countDown = 5;
    this.isStartGame = showStartScreen;
    this.isGameOver = false;
    this.startScreen = showStartScreen ? new StartScreen() : undefined;
    this.scoreboard = new Scoreboard();
  }

  public drawStartScreen() {
    push();
    textFont(font);
    background("#acb8e5");
    imageMode(CENTER);
    image(hopTopImage, width / 2, height * 0.45, width * 0.75);
    fill("white");
    textAlign(CENTER);
    textSize(30);
    text("click on screen to", width / 2, height * 0.91);
    text("start the game", width / 2, height * 0.95);
    pop();
  }

  public drawGame(): void {
    if (this.isStartGame && keyIsPressed && keyCode === 13) {
      removeElements();
      this.isStartGame = false;
    }
    if (this.isStartGame && this.startScreen) {
      this.startScreen.draw();
      return;
    }

    //If player is under game area display Game Over on screen
    if (this.isPlayerDead()) {
      if (!this.isGameOver) {
        console.log("saved");

        this.saveHighscore();
      }
      this.isGameOver = true;
      this.displayGameOver();
      return;
    }

    // if level is done and we're not starting a new level
    if (this.level.levelProgress >= 100 && !this.isStartingNextLevel) {
      this.startNextLevel();
    }

    this.player.move();

    const heightBeforeGameStarts = height / 2;
    if (
      this.player.pos.y < heightBeforeGameStarts ||
      this.level.levelProgress > 0
    ) {
      this.level.updateLevel();
    }

    this.level.updateEffects();

    // moves all level objects down
    this.level.levelObjects.forEach(levelObject => {
      const isblockCollision = this.collisionDetection.playerCollidedWithBlock(
        this.player,
        levelObject
      );
      const isItemCollision = this.collisionDetection.playerCollidedWithItem(
        this.player,
        levelObject
      );

      if (isblockCollision) {
        if (levelObject instanceof Block) {
          this.player.bounceOnBlock(levelObject.pos);
        } else if (levelObject instanceof FragileBlock) {
          if (!levelObject.isDestroyed) {
            const didBounce = this.player.bounceOnBlock(levelObject.pos);
            if (didBounce) levelObject.destroy();
          }
        }
      } else if (isItemCollision) {
        if (levelObject instanceof SpeedBoost) {
          levelObject.applySpeedBoost(this.player);
          this.level.pickUpItem(levelObject);
          this.updateScore(levelObject.points);
        } else if (levelObject instanceof Item) {
          this.level.pickUpItem(levelObject);
          this.updateScore(levelObject.points);
        }
      }
    });

    const r: number = map(this.level.levelProgress, 0, 100, 120, 60);
    const b: number = map(this.level.levelProgress, 0, 100, 170, 110);
    const g: number = map(this.level.levelProgress, 0, 100, 235, 200);

    // background("cornflowerblue");
    background(r, b, g);

    this.level.drawLevel();
    this.scoreboard.draw(this.score, this.highScore, this.levelNumber);
    this.player.drawPlayer();

    if (this.isStartingNextLevel) this.displayCountDown();
  }

  private saveHighscore() {
    const localStorageName = localStorage.getItem("name");
    const playerName = localStorageName ? JSON.parse(localStorageName) : "";

    if (playerName) {
      const localStorageHighscore = localStorage.getItem("highscore");
      const highscore = localStorageHighscore
        ? JSON.parse(localStorageHighscore)
        : {};
      if (highscore[playerName] && highscore[playerName] > this.score) {
        highscore[playerName] = this.score;
      } else {
        highscore[playerName] = this.score;
      }
      localStorage.setItem("highscore", JSON.stringify(highscore));
    }
  }

  private isPlayerDead = (): boolean =>
    this.player.pos.y > height + this.player.radius * 2;

  private startNextLevel() {
    this.isStartingNextLevel = true;
    // wait before starting new level
    setTimeout(() => {
      this.levelNumber += 1;
      this.player.pos = new Position(width / 2, height - 100);
      this.level = this.levelFactory.createLevel(this.levelNumber);
      this.isStartingNextLevel = false;
    }, 5000);

    // update the count down until
    const nextLevelTimer: number = setInterval(() => {
      // if countdown is 0, reset the countdown value and clear the interval
      if (this.countDown < 1) {
        this.countDown = 5;
        clearInterval(nextLevelTimer);
      } else this.countDown -= 1;
    }, 1000);
  }

  // view the countdown message
  private displayCountDown() {
    push();
    textAlign(CENTER);
    stroke("rgb(255,171,194)");
    strokeWeight(7);
    textStyle(BOLD);
    textSize(42);
    fill(32);
    text("Next level in " + this.countDown, width / 2, height / 4);
    pop();
  }
  displayGameOver() {
    if (!this.playButton && !this.quitButton) {
      push();
      //if clicked go to level_1

      this.playButton = createButton("PLAY AGAIN?");
      this.playButton.position(windowWidth / 2, height * 0.82);
      this.playButton.center("horizontal");
      this.playButton.style("background-color", "rgb(252, 208, 107)");
      this.playButton.style("font-family", "Amatic SC");
      //textFont(font);
      this.playButton.style("font-size", "2rem");
      this.playButton.style("color", "rgb(38,48,86)");
      this.playButton.style("border-radius", "2rem");
      this.playButton.style("padding", "1rem");
      this.playButton.style("border", "none");
      this.playButton.style("outline", "none");

      this.playButton.mousePressed(this.restartGame);

      //if clicked go to startScreen?
      this.quitButton = createButton("QUIT");
      this.quitButton.position(windowWidth / 2, height * 0.94);
      this.quitButton.center("horizontal");
      this.quitButton.style("background-color", "rgb(38,48,86)");
      this.quitButton.style("font-family", "Amatic SC");
      //textFont(font);
      this.quitButton.style("font-size", "1.7rem");
      this.quitButton.style("color", "rgb(252, 208, 107)");
      this.quitButton.style("border-radius", "1rem");
      this.quitButton.style("border", "none");
      this.quitButton.style("outline", "none");
      this.quitButton.style("display", "grid");
      this.quitButton.style("justify-items", "center");
      this.quitButton.mousePressed(this.quitGame);
      pop();
    }
    push();
    textFont(font);
    textAlign(CENTER);
    fill("rgb(242,37,174)");
    stroke("rgb(5,42,147)");
    strokeWeight(12);
    noCursor();
    ellipse(mouseX, mouseY, 30, 30);
    background(172, 184, 229, 10);
    image(gameOver, 15, 125);
    pop();
  }

  private restartGame(): void {
    removeElements();
    gameController = new GameController(false);
  }

  private quitGame(): void {
    removeElements();
    gameController = new GameController();
  }

  private updateScore(itemScore: number): void {
    this.score += itemScore; //20;

    if (this.score >= this.highScore) {
      this.highScore = this.score;
    }
  }
}
