class StartScreen {
  
  draw() {
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
}