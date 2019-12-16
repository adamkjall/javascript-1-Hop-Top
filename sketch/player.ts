class Player {
  private xVelocity: number;
  private yVelocity: number;
  private speed: number;
  private position: Position;
  private width: number;
  private height: number;

  constructor(
    x: number,
    y: number,
    xVelocity: number = 0,
    yVelocity: number = 0,
    speed: number = 1,
    width: number = 50,
    height: number = 50
  ) {
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.speed = speed;
    this.position = new Position(x, y);
    this.width = width;
    this.height = height;
  }

  public autoBounce(): void {}

  public move(): void {
    if (keyCode === RIGHT_ARROW) {
     
      this.position.x += 6
        if (this.position.x > width-this.width/2) {
          this.position.x = width-this.width/2; 
        }
      } else if (keyCode === LEFT_ARROW) {
       
        this.position.x -= 6
        if (this.position.x < this.width/2) {
          this.position.x = this.width/2;
        }
      }
    } 
  

  private gravity(): void {}

  public drawPlayer(): void {
    noStroke()
    fill('pink')
    circle(this.position.x, this.position.y, this.width)
    
  }

  public update(): void {}

  public setPosition(newPosition: Position): void {
    this.position = newPosition;
  }
}
