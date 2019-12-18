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

    
    function scoreText() {
      push();
      fill(0, 10, 153);
      textSize(18);
      text("Level", 240, 35);
      text("High Score", 90, 55);
      text("Score", 410, 55);
      pop();
    }

    function scorePoints() {
      push();
      let score = 0;
      fill(255, 255, 255);
      textSize(18);
      text(score, 90, 75);
      text(score, 430, 75);
      textSize(62);
      text(score, 245, 90);
      pop();
    }

    function scoreBoard() {
      push();
      let c = color(900, 150, 255);
      stroke(c);
      fill(c);
      circle(265, 60, 100);
      strokeWeight(50);
      line(100, 60, 450, 60);
      pop();
    }
  }
}
