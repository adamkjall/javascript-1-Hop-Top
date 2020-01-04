// class DrawGameOver extends GameController{
//     private playButton: p5.Element | undefined;
//     private quitButton: p5.Element | undefined;




// private displayGameOver() {
//     if (!this.playButton && !this.quitButton) {
//       push();
//       //if clicked go to level1
//       this.playButton = createButton("PLAY AGAIN?");
//       this.playButton.position(windowWidth / 2, height * 0.82);
//       this.playButton.center("horizontal");
//       this.playButton.style("background-color", "rgb(252, 208, 107)");

//       this.playButton.style("font-size", "1.7rem");
//       this.playButton.style("color", "rgb(38,48,86)");
//       this.playButton.style("border-radius", "2rem");
//       this.playButton.style("padding", "1rem");
//       this.playButton.style("border", "none");
//       this.playButton.style("outline", "none");

//       this.playButton.mousePressed(this.restartGame);

//       //if clicked go to startScreen?
//       this.quitButton = createButton("QUIT");
//       this.quitButton.position(windowWidth / 2, height * 0.94);
//       this.quitButton.center("horizontal");
//       this.quitButton.style("background-color", "rgb(38,48,86)");
//       this.quitButton.style("font-size", "1.3rem");
//       this.quitButton.style("color", "rgb(252, 208, 107)");
//       this.quitButton.style("border-radius", "1rem");
//       this.quitButton.style("border", "none");
//       this.quitButton.style("outline", "none");
//       this.quitButton.style("display", "grid");
//       this.quitButton.style("justify-items", "center");
//       this.quitButton.mousePressed(this.quitGame);
//       pop();
      
//     }
//     push();
//     textAlign(CENTER);
//     fill("rgb(242,37,174)");
//     stroke("rgb(5,42,147)");
//     strokeWeight(12);
//     noCursor();
//     ellipse(mouseX, mouseY, 30, 30);
//     background(172, 184, 229, 10);
//     image(gameOver, 15, 125);
//     pop();
//   }

//   private restartGame(): void {
//     removeElements();
//     gameController = new GameController();
//   }

//   private quitGame(): void {
//     location.reload();
//   }

// //     //If player is under game area display Game Over on screen
// //     if (this.isPlayerDead()) {
// //         this.displayGameOver();
// //         localStorage.setItem("highscore", JSON.stringify(this.highScore));
// //         return;
// //       }

// //   private isPlayerDead = (): boolean =>
// //  new GameController.player.pos.y > height + this.player.radius * 2;

// }

