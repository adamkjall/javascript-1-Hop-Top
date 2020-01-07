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
    const newColor = color(59, 69, 107);
    const newBorderColor = color(248, 122, 156);
    const [oldColor, oldBorderColor] = player.changeColor(
      newColor,
      newBorderColor,
    );

    player.speed = this.speed;
    player.maxSpeed = this.maxSpeed;

    const interval1 = setInterval(() => {
      player.changeColor(oldColor, oldBorderColor);
    }, 200);

    const interval2 = setInterval(() => {
      player.changeColor(newColor, newBorderColor);
    }, 400);

    setTimeout(() => {
      player.speed = oldSpeed;
      player.maxSpeed = oldMaxSpeed;
      clearInterval(interval1);
      clearInterval(interval2);
      player.changeColor(oldColor, oldBorderColor);
    }, this.duration);
  }
}
