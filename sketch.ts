/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  // Tyvärr har jag inte fått till den globala typningen för
  // inladdningen av ljud men fungerar bra enligt nedan..
  hopTopImage = loadImage("./assets/images/hop_top.png");
  //Sounds
  jumpSound = (window as any).loadSound("./assets/sounds/bubbles.wav");
  gameOverSound = (window as any).loadSound("./assets/sounds/game-over.wav");
  newLevelSound = (window as any).loadSound("./assets/sounds/happy-clapps.wav");
  pointsSound = (window as any).loadSound("./assets/sounds/points.wav");
  gameOverMusic = (window as any).loadSound("./assets/sounds/game-over-music.mp3");
  buttonSound = (window as any).loadSound("./assets/sounds/button.wav");
  //Solid blocks
  imgSolid = loadImage("./assets/images/10.png");
  //Fragile blocks
  imgFragile = loadImage("./assets/images/1.png");
  //Bonus items 
  imgItemDanger = loadImage("./assets/images/itemDanger.svg");
  imgItemWatermelon = loadImage("./assets/images/itemWatermelon.svg");
  imgAnimated = loadImage("./assets/images/coin.gif");
  //SpeedBoost items
  imgSpeedBoost = loadImage("./assets/images/star.svg");
  //Game over text
  gameOver = loadImage("./assets/images/game_over.png");
  //Font in game
  font = loadFont("./assets/font/AmaticSC-Bold.ttf");
}

let font: p5.Font;
let gameOver: p5.Image;
let hopTopImage: p5.Image;
let imgSpeedBoost: p5.Image;
let imgSolid: p5.Image;
let imgFragile: p5.Image;
let imgItemPresent: p5.Image;
let imgItemCandy: p5.Image;
let imgItemCar: p5.Image;
let imgItemDanger: p5.Image;
let imgItemStonefall: p5.Image;
let imgItemWatermelon: p5.Image;
let imgAnimated: p5.Image;
let collectItemSound: p5.SoundFile;
let gameController: GameController;
let jumpSound: p5.SoundFile;
let gameOverSound: p5.SoundFile;
let newLevelSound: p5.SoundFile;
let pointsSound: p5.SoundFile;
let gameOverMusic: p5.SoundFile;
let buttonSound: p5.SoundFile;



/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */

function setup() {
  createCanvas(600, windowHeight);
  frameRate(60);

  gameController = new GameController();
}

/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */

function draw() {
  gameController.update();
  gameController.draw();
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(600, windowHeight);
}
