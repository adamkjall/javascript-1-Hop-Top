/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  // Tyvärr har jag inte fått till den globala typningen för
  // inladdningen av ljud men fungerar bra enligt nedan..

  //Sound for when the ball collects items. Not currently being used. 
  //Use with   collectItemSound.play()
  collectItemSound = (window as any).loadSound('../assets/sounds/bubbles.wav');
  //Solid blocks
  imgSolid = loadImage('../assets/images/10.png');
  //Fragile blocks
  imgFragile = loadImage('../assets/images/1.png');
  //Bonus items blocks
  imgItemStar = loadImage('../assets/images/item1.png');
}

let imgSolid: p5.Image;
let imgFragile: p5.Image;
let imgItemStar: p5.Image;
let collectItemSound: p5.SoundFile;
let player: Player;
let level : Level;
let levelFactory: LevelFactory;
let gameController: GameController;
let collisionDetection: CollisionDetection;
let score : number = 0;

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(600, windowHeight);
  frameRate(60);
  player = new Player(width/2, height/2)
  levelFactory = new LevelFactory();
  level = levelFactory.createLevel(1);

  gameController = new GameController(level, player,1, 0, 0 ,0);

  collisionDetection = new CollisionDetection();


}
/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */

function draw() {
  background("cornflowerblue");
  level.drawLevel();
  player.move();
  player.drawPlayer();

  gameController.displayScoreBoard();

  // TODO: rename block to game object name,
  //   because bonus items could be also in collision with player
  level.levelObjects.forEach(block => {
    if(collisionDetection.playerCollidedWithBlock(player, block)) {
      if (block instanceof Item) {
        const item = block as Item;
        item.explode()
        gameController.collectItem()
      } else {
        player.bounceOnBlock(block.pos);
      }
    }
  })

  level.updateLevel(player.pos);

}
/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(600, windowHeight);
}
