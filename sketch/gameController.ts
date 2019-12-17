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
}
