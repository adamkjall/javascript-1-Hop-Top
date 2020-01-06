class SpeedBoost extends Item {
  private speed: number;
  private maxSpeed: number;
  private duration: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    points: number = 50,
    image: p5.Image = imgSpeedBoost
  ) {
    super(x, y, width, height, image, points);
    this.speed = 1.2;
    this.maxSpeed = 10;
    this.duration = 5000;
  }

  applySpeedBoost(player: Player) {
    const oldSpeed = player.speed;
    const oldMaxSpeed = player.maxSpeed;
    player.speed = this.speed;
    player.maxSpeed = this.maxSpeed;
    setTimeout(() => {
      player.speed = oldSpeed;
      player.maxSpeed = oldMaxSpeed;
    }, this.duration);
  }
}
