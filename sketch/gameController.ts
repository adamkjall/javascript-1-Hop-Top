class GameController {
  private level: Level;
  private player: Player;
  private nrOfPlayers: number;
  private score: number;
  private highScore: number;
  private levelNumber: number;

  constructor(
    level: Level,
    player: Player,
    nrOfPlayers: number,
    score: number,
    highScore: number,
    levelNumber: number
  ) {
    this.level = level;
    this.player = player;
    this.nrOfPlayers = nrOfPlayers;
    this.score = score;
    this.highScore = highScore;
    this.levelNumber = levelNumber;
  }

  private loadLevel(level: Level): void {}

  private createPlayer(): void {}

  public gameLoop(): void {}

  private playerCollision(): boolean {
    return false;
  }

  private collectItem(): void {
    score++
  }

  private gameOver(): void {}

  public displayScoreBoard(): void {
    
    function scoreText() : void {
      push();
      fill(0, 10, 153);
      textSize(18);
      text("Level", 275, 35);
      text("High Score", 90, 55);
      text("Score", 430, 55);
      pop();
    }
    
    const scorePoints = () : void => {
      push();
      fill(255, 255, 255);
      textSize(18);
      text(this.highScore, 90, 75);
      text(this.score, 430, 75);
      textSize(62);
      text(this.levelNumber, 280, 90);
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

    scoreBoard();
    scoreText();
    scorePoints();
  }
}
