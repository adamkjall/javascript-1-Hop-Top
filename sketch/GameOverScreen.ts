type Highscore = {
  name: string;
  score: number;
};

class GameOverScreen {
  private playButton: p5.Element | undefined;
  private quitButton: p5.Element | undefined;
  private playerScore: number;
  private highscoreList: Highscore[];

  constructor(playerScore: number) {
    this.playerScore = playerScore;
    this.highscoreList = this.getTop5Scores();
  }

  private getTop5Scores(): Highscore[] {
    const localStorageHighscore = localStorage.getItem("highscore");
    const highscoreObj = localStorageHighscore
      ? JSON.parse(localStorageHighscore)
      : {};
    const highscoreArray = Object.keys(highscoreObj).map(key => ({
      name: key,
      score: Number(highscoreObj[key])
    }));

    const sortedArray = highscoreArray.sort((a, b) => b.score - a.score);
    const top5 = sortedArray.slice(0, 5);

    return top5;
  }

  public draw() {
    if (!this.playButton && !this.quitButton) {
      push();
      //if clicked go to level1
      this.playButton = createButton("PLAY AGAIN?");
      this.playButton.position(innerWidth / 2 - width / 2 + width * 0.1, height * 0.90);
      // this.playButton.center("horizontal");
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
      this.quitButton.position(innerWidth / 2 - width / 2 + width * 0.75, height * 0.92);
      // this.quitButton.center("horizontal");
      this.quitButton.style("background-color", "rgb(38,48,86)");
      this.quitButton.style("font-size", "1.7rem");
      this.quitButton.style("color", "rgb(252, 208, 107)");
      this.quitButton.style("border-radius", "2rem");
      this.playButton.style("padding", "1rem");
      this.quitButton.style("border", "none");
      this.playButton.style("outline", "none");

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
    background(172, 184, 229, 10);
    imageMode(CENTER);
    image(gameOver, width / 2, height * 0.2, width * 0.7);
    pop();

    this.displayHighscoreList();
  }

  private displayHighscoreList() {
    push();
    textFont(font);
    fill(255);
    textAlign(CENTER);
    textSize(52);
    text("Your score: " + this.playerScore, width / 2, height * 0.46);
    text("Highscore", width / 2, height * 0.56);
    textSize(42);
    text("Name", width / 2 - 100, height * 0.61);
    text("Score", width / 2 + 100, height * 0.61);

    textSize(30);
    textAlign(CENTER);
    this.highscoreList.forEach((highscore, i) => {
      const offset = 30;
      text(highscore.name, width / 2 - 100, height * 0.66 + offset * i);
      text(highscore.score, width / 2 + 100, height * 0.66 + offset * i);
    });
    pop();
  }

  private restartGame(): void {
    buttonSound.play();
    removeElements();
    gameController = new GameController(false);
  }

  private quitGame(): void {
    buttonSound.play();
    removeElements();
    gameController = new GameController();
  }
}
