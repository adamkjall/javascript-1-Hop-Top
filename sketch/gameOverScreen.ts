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
      this.playButton.position(windowWidth/ 2 - width/2 + width * 0.25 , height * 0.82);
      this.playButton.style("background-color", "rgb(252, 208, 107)");
      this.playButton.style('font-family', 'AmaticSC-Bold')
      this.playButton.style("font-size", "1.7rem");
      this.playButton.style("color", "rgb(38,48,86)");
      this.playButton.style("border-radius", "2rem");
      this.playButton.style("padding", "1rem");
      this.playButton.style("border", "none");
      this.playButton.style("outline", "none");
      //You can solve it like this also but then the buttons can end up outside the screen in other screensizes and resolutions 
      //this.playButton.style("transform", "translateX(-50%)")
      // this.playButton.style("left", "35%")
      this.playButton.mousePressed(this.restartGame);
      
      //if clicked go to startScreen?
      this.quitButton = createButton("QUIT GAME");
      this.quitButton.position(windowWidth/ 2 + width / 2 - width * 0.25, height * 0.82);
      this.quitButton.style("background-color", "rgb(38,48,86)");
      this.quitButton.style('font-family', 'AmaticSC-Bold')
      this.quitButton.style("font-size", "1.7rem");
      this.quitButton.style("color", "rgb(252, 208, 107)");
      this.quitButton.style("border-radius", "2rem");
      this.quitButton.style("padding", "1rem");
      this.quitButton.style("border", "none");
      this.quitButton.style("outline", "none");
      this.quitButton.style("transform", "translateX(-100%)")
      //You can solve it like this also but then the buttons can end up outside the screen in other screensizes and resolutions 
      //this.quitButton.style("left", "65%")
      this.quitButton.mousePressed(this.quitGame);
      pop();
    }
    push();
    background(172, 184, 229, 245);
    textAlign(CENTER);
    fill("rgb(255, 171, 194)");
    stroke("rgb(38,48,86)");
    strokeWeight(12);
    noCursor();
    ellipse(mouseX, mouseY, 30, 30);
    image(gameOver, 175, 35);
    gameOver.resize(240, 180);
    pop();

    this.displayHighscoreList();
  }

  private displayHighscoreList() {
    push();
    textFont(font);
    fill(255);
    textAlign(CENTER);
    textSize(52);
    fill(252, 208, 107)
    text("Your score: " + this.playerScore, width / 2, height * 0.40);
    fill(245, 88, 131)
    text("Highscore", width / 2, height * 0.49);
    fill(255, 255, 255)
    textSize(42);
    text("Name", width / 2 - 100, height * 0.57);
    text("Score", width / 2 + 100, height * 0.57);

    textSize(30);
    textAlign(CENTER);
    this.highscoreList.forEach((highscore, i) => {
      const offset = 30;
      fill(38,48,86)
      text(highscore.name, width / 2 - 100, height * 0.62 + offset * i);
      text(highscore.score, width / 2 + 100, height * 0.62 + offset * i);
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
