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
<<<<<<< HEAD
<<<<<<< HEAD
  imgItemStar = loadImage('../assets/images/item1.png');
<<<<<<< HEAD
<<<<<<< HEAD
  
=======
=======
  imgItemStar = loadImage('../assets/images/item1.svg');
>>>>>>> Item score moving effect during collision
  //SpeedBoost items
  imgSpeedBoost = loadImage('../assets/images/star.svg')
>>>>>>> Stars appears and goes away
=======
  imgItemStar = loadImage('../assets/images/item1.svg');
=======
  imgItemStar = loadImage('../assets/images/item1.png');
<<<<<<< HEAD
>>>>>>> added a start screen
  //SpeedBoost items
  imgSpeedBoost = loadImage('../assets/images/star.svg')
=======
  
>>>>>>> added a start screen
>>>>>>> added a start screen
=======
  //speedBoost
  imgSpeedBoost = loadImage('../assets/images/star.svg');
>>>>>>> SuperBoost
}

let imgSpeedBoost: p5.Image
let imgSolid: p5.Image;
let imgFragile: p5.Image;
let imgItemStar: p5.Image;
let collectItemSound: p5.SoundFile;
let gameController: GameController;

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
  gameController.gameLoop();
=======
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

>>>>>>> Stashed changes
=======
  gameController.drawGame();
>>>>>>> the level starts when player has reached a certain height, the clouds disappear
=======
  gameController.drawGame();
=======
<<<<<<< Updated upstream
  gameController.gameLoop();
=======
  background("cornflowerblue");
  level.drawLevel();
  player.move();
  player.drawPlayer();
  gameController.displayScoreBoard();

<<<<<<< HEAD
 
  
=======
  level.levelObjects.forEach(block => {
    if(collisionDetection.playerCollidedWithBlock(player, block)) {
      if (block instanceof SpeedBoost) {
        const item = block as SpeedBoost;
        item.explode()
        gameController.collectItem()
      } else {
        player.bounceOnBlock(block.pos);
      }
    }
  })

  level.updateLevel(player.pos);

>>>>>>> SuperBoost
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

<<<<<<< HEAD
>>>>>>> Stashed changes
>>>>>>> added a start screen
>>>>>>> added a start screen
=======
  

>>>>>>> SuperBoost
}


/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(600, windowHeight);
  
}

