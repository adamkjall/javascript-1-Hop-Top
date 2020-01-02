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
  private effectList: GameObject[];
  private isStartGame: boolean;
  private playButton: p5.Element | undefined;
  private quitButton: p5.Element | undefined;

  constructor() {
    this.score = 0;
    const localStorageHighscore = localStorage.getItem("highscore");
    this.highScore = localStorageHighscore
      ? JSON.parse(localStorageHighscore)
      : 0;
    this.levelNumber = 1;
    this.levelFactory = new LevelFactory();
    this.level = this.levelFactory.createLevel(this.levelNumber);
    this.player = new Player(width / 2, height - 100);
    this.collisionDetection = new CollisionDetection();
    this.isStartingNextLevel = false;
    this.countDown = 5;
    this.effectList = [];
    this.isStartGame = true;
  }
 
  public drawStartScreen() {
    push();
    background('#acb8e5');
    imageMode(CENTER);
    image(hopTopImage, width / 2, height * 0.45, width * 0.75);
    fill("white");
    textAlign(CENTER);
    textSize(20);
    text("click on screen to", width / 2, height * 0.91);
    text("start the game", width / 2, height * 0.95);
    pop();
  }
 
  public drawGame(): void {
    if (keyIsPressed && keyCode === 32 || mouseIsPressed === true) {
      this.isStartGame = false;
    }
    if (this.isStartGame) {
      this.drawStartScreen();
      return;
    }

    //If player is under game area display Game Over on screen
    if (this.isPlayerDead()) {
      this.displayGameOver();
      localStorage.setItem("highscore", JSON.stringify(this.highScore));
      return;
    }

    // if level is done and we're not starting a new level
    if (this.level.levelProgress >= 100 && !this.isStartingNextLevel) {
      this.startNextLevel();
      localStorage.setItem("highscore", JSON.stringify(this.highScore));
    }

    this.player.move();

    const heightBeforeGameStarts = height / 2;
    if (
      this.player.pos.y < heightBeforeGameStarts ||
      this.level.levelProgress > 0
    ) {
      this.level.updateLevel();
      this.updateEffects();
    }

    // moves all level objects down
    this.level.levelObjects.forEach((levelObject, index) => {
      if (
        levelObject instanceof Block &&
        this.collisionDetection.playerCollidedWithBlock(
          this.player,
          levelObject
        )
      ) {
        this.player.bounceOnBlock(levelObject.pos);
      } else if (
        this.collisionDetection.playerCollidedWithItem(this.player, levelObject)
      ) {
        if (levelObject instanceof Item) {
          this.level.levelObjects.splice(index, 1);
          const itemScore = levelObject.getScore();
          this.collectItem(itemScore);
          const effect = new Effect(levelObject);
          this.effectList.push(effect);
        } else if (levelObject instanceof SpeedBoost) {
          this.level.levelObjects.splice(index, 1);
          this.player.speedBoost();
        }
      }
    });

    const r: number = map(this.level.levelProgress, 0, 100, 120, 60);
    const b: number = map(this.level.levelProgress, 0, 100, 170, 110);
    const g: number = map(this.level.levelProgress, 0, 100, 235, 200);

    // background("cornflowerblue");
    background(r, b, g);

    this.level.drawLevel();
    this.drawScoreBoard();
    this.effectList.forEach((effect, i) => {
      effect.drawObject();
      if (effect.pos.y >= height) this.effectList.splice(i, 1);
    });
    this.player.drawPlayer();

    if (this.isStartingNextLevel) this.displayCountDown();
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

  private displayGameOver() {
    if (!this.playButton && !this.quitButton) {
      push();
      //if clicked go to level1
      this.playButton = createButton("PLAY AGAIN?");
      this.playButton.position(windowWidth / 2, height * 0.82);
      this.playButton.center("horizontal");
      this.playButton.style("background-color", "rgb(252, 208, 107)");

      this.playButton.style("font-size", "1.7rem");
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
      this.quitButton.style("font-size", "1.3rem");
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
    textAlign(CENTER);
    fill("rgb(242,37,174)");
    stroke("rgb(5,42,147)");
    strokeWeight(12);
    noCursor();
    ellipse(mouseX, mouseY, 30, 30);
    background(172,184,229, 10);
    image(gameOver, 15, 125);
    pop();
  }

  private restartGame(): void {
    removeElements();
    gameController = new GameController();
  }

  private quitGame(): void {
    location.reload();
  }

  private collectItem(itemScore: number): void {
    this.score += itemScore; //20;

    if (this.score >= this.highScore) {
      this.highScore = this.score;
    }
  }

  private drawScoreBoard(): void {
    function scoreText(): void {
      push();
      fill(0, 10, 153);
      textSize(18);
      text("Level", 275, 35);
      text("High Score", 85, 55);
      text("Score", 430, 55);
      pop();
    }

    const scorePoints = (): void => {
      push();
      fill(255, 255, 255);
      textSize(18);
      text(this.highScore, 90, 75);
      text(this.score, 430, 75);
      textSize(62);
      textAlign(CENTER);
      text(this.levelNumber, 300, 90);
      pop();
    };

    function scoreBoard(): void {
      push();
      let c: p5.Color = color(252, 208, 107);
      stroke(c);
      fill(c);
      circle(300, 60, 100);
      strokeWeight(50);
      line(75, 60, 525, 60);
      pop();
    }

    scoreBoard();
    scoreText();
    scorePoints();
  }

  private updateEffects(): void {
    for (const effect of this.effectList) {
      effect.pos.y += 3.5;
    }
  }
}
