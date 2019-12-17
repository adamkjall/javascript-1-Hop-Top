/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  // Tyvärr har jag inte fått till den globala typningen för
  // inladdningen av ljud men fungerar bra enligt nedan..
  // sound = (window as any).loadSound('../assets/mySound.wav');
}
let player: Player;
let gameObject : GameObject;
let level : Level;
/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas((windowWidth / 100) * 50, windowHeight);
  frameRate(60);
  player = new Player(width/2, height/2)
  gameObject = new GameObject(20,400, 100,10)
  level = new Level()

}

/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */
function draw() {
  background("cornflowerblue");
  player.move();
  player.drawPlayer();
  gameObject.drawObject();
  level.drawLevel();
  player.drawPlayer();
  gameObject.drawObject();
  //add .update for move down
  player.update();
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas((windowWidth / 100) * 50, windowHeight);
}
