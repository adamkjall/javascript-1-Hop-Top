class SpeedBoost extends Item {
  private speedBoost: number;
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
    this.speedBoost = 1.5;
    this.duration = 4000;
  }

  applySpeedBoost(player: Player) {
    const oldSpeed = player.speed;
    player.speed = this.speedBoost;
    setTimeout(() => {
      player.speed = oldSpeed;
    }, this.duration);
  }
}
