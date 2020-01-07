class GameOver {
  private playButton: p5.Element | undefined;
  private quitButton: p5.Element | undefined;

  draw() {
    if (!this.playButton && !this.quitButton) {
      push();
      //if clicked go to level1
      this.playButton = createButton("PLAY AGAIN?");
      this.playButton.position(windowWidth/ 2, height * 0.82);
      this.playButton.center("horizontal");
      this.playButton.style("background-color", "rgb(252, 208, 107)");
      this.playButton.style('font-family', 'AmaticSC-Bold')
      this.playButton.style("font-size", "1.7rem");
      this.playButton.style("color", "rgb(38,48,86)");
      this.playButton.style("border-radius", "2rem");
      this.playButton.style("padding", "1rem");
      this.playButton.style("border", "none");
      this.playButton.style("outline", "none");
      this.playButton.style("transform", "translateX(-50%)")
      this.playButton.style("left", "35%")
      this.playButton.mousePressed(this.restartGame);

      //if clicked go to startScreen?
      this.quitButton = createButton("QUIT GAME");
      this.quitButton.position(windowWidth/ 2, height * 0.82);
      this.quitButton.center("horizontal");
      this.quitButton.style("background-color", "rgb(38,48,86)");
      this.quitButton.style('font-family', 'AmaticSC-Bold')
      this.quitButton.style("font-size", "1.7rem");
      this.quitButton.style("color", "rgb(252, 208, 107)");
      this.quitButton.style("border-radius", "2rem");
      this.quitButton.style("padding", "1rem");
      this.quitButton.style("border", "none");
      this.quitButton.style("outline", "none");
      this.quitButton.style("transform", "translateX(-50%)")
      this.quitButton.style("left", "65%")
      this.quitButton.mousePressed(this.quitGame);
      pop();
    }
    push();
    background(172, 184, 229, 245);
    textAlign(CENTER);
    fill("rgb(242,37,174)");
    stroke("rgb(5,42,147)");
    strokeWeight(12);
    noCursor();
    ellipse(mouseX, mouseY, 30, 30);
    image(gameOver, 175, 35);
    gameOver.resize(240, 180);
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
