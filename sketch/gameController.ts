class GameController {
  private level: Level;
  private player: Player;
  private nrOfPlayers: number;
  private score: number;
  private highScore: number;

  constructor(
    level: Level,
    player: Player,
    nrOfPlayers: number,
    score: number,
    highScore: number
  ) {
    this.level = level;
    this.player = player;
    this.nrOfPlayers = nrOfPlayers;
    this.score = score;
    this.highScore = highScore;
  }

  private loadLevel(level: Level): void {}

  private createPlayer(): void {}

  public gameLoop(): void {}

  private playerCollision(): boolean {
    return false;
  }

  private collectItem(): void {}

  private gameOver(): void {}

  public displayScoreBoard(): void {
    scoreBoard();
    scoreText();
    scorePoints();

    
    function scoreText() : void {
      push();
      fill(0, 10, 153);
      textSize(18);
      text("Level", 275, 35);
      text("High Score", 90, 55);
      text("Score", 430, 55);
      pop();
    }

    function scorePoints() : void {
      push();
      let score : number = 0;
      fill(255, 255, 255);
      textSize(18);
      text(score, 90, 75);
      text(score, 430, 75);
      textSize(62);
      text(score, 280, 90);
      pop();
    }

    function scoreBoard():void {
      push();
      let c : p5.Color= color(252,208,107);
      stroke(c);
      fill(c);
      circle(300, 60, 100);
      strokeWeight(50);
      line(75, 60, 525, 60);
      pop();
    }
  }
}
